/**
 * Posts Details Page
 */

import React, { Component } from 'react';
import {
  View, Text, TouchableWithoutFeedback, Keyboard
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Checkbox, TextareaItem
} from '@ant-design/react-native';
import Header from '../../components/Header';
import { TextField } from 'react-native-material-textfield';
import { Button } from 'react-native-material-ui';
import { updateTodoAction, addTodoAction } from '../../actions';
import Loading from '../../lib/Loading';
import styles, { buttonActiveStyles, buttonDisableStyles } from './style';

class TodoDetailScreen extends Component {
  constructor(props) {
    super(props);

    const todo = this.props.navigation.getParam('todo');

    this.state = {
      userId: todo && todo.userId ? todo.userId : '',
      id: todo && todo.id ? todo.id : '',
      title: todo && todo.title ? todo.title : '',
      completed: todo && todo.completed ? todo.completed : false,
      error: this.props.error ? this.props.error : null,
      isEditting: false,
      loading: false,
    }
  }

  componentWillReceiveProps(nextProps) {
    const post = nextProps.navigation.getParam('todo');

    const state = {
      userId: post && post.userId ? post.userId : this.state.userId,
      id: post && post.id ? post.id : '',
      title: post && post.title ? post.title : '',
      completed: post && post.body ? post.body : '',
      error: this.props.error ? this.props.error : null,
      isEditting: false
    }

    this.setState(state);
  }

  onUpdate = () => {
    this.setState({ loading: true });
    if (this.state.id === '') {
      this.props.addTodoAction({
        userId: this.state.userId,
        title: this.state.title,
        completed: this.state.completed
      }).then((res) => {
        this.setState({ loading: false });
        if (res && res.data) {
          /* eslint-disable-next-line */
          alert(res.data.msg);
          if (res.success) {
            this.setState({ error: {} });
          } else {
            this.setState({ error: res.data })
          }
        }
      });
    } else {
      this.props.updateTodoAction({
        id: this.state.id,
        userId: this.state.userId,
        title: this.state.title,
        completed: this.state.completed
      }).then((res) => {
        this.setState({ loading: false });
        if (res && res.data) {
          /* eslint-disable-next-line */
          alert(res.data.msg);
          if (res.success) {
            this.setState({ error: {} });
          } else {
            this.setState({ error: res.data })
          }
        }
      });
    }
  }

  goBack = () => {
    this.props.navigation.goBack()
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          
        <View style={styles.container}>
        
          <Header
            title={this.state.id && this.state.id !== '' ? 'Todo Detail' : 'Create a task'}
            disableAddButton
            isBack
            goBack={this.goBack}
          />
         
          <Loading loading={this.state.loading}/>
           
          {
            this.state.error
              ? (<View><Text>{this.state.error.msg}</Text></View>)
              : null
          }
          <View style={styles.innerContainer}>
            <TextField
              multiline
              label='Title'
              value={this.state.title}
              onChangeText={(value) => {
                this.setState({
                  title: value,
                  isEditting: true
                });
              }}
              labelFontSize={16}
              tintColor="#ec4563"
              labelPadding={10}
            />

            <View  style={styles.checkboxContainer}>
              <Checkbox
                checked={this.state.completed}
                style={{ color: '#f00' }}
                onChange={(event) => {
                  this.setState({
                    completed: event.target.checked,
                    isEditting: true
                  });
                }}
              >
                Completed
              </Checkbox>
            </View>

            <Button
              primary
              title=""
              text="SAVE"
              onPress={this.onUpdate}
              style={this.state.isEditting ? buttonActiveStyles : buttonDisableStyles}
              disabled={!this.state.isEditting}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return Object.assign(
    { dispatch },
    bindActionCreators({
      updateTodoAction,
      addTodoAction
    }, dispatch)
  );
}

const mapStateToProps = (state) => {
  const postState = state.postReducer;
  return {
    error: postState.error,
    posts: postState.posts
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoDetailScreen);
