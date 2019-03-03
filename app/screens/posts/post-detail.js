/**
 * Posts Details Page
 */

import React, { Component } from 'react';
import {
  View, Text, TouchableWithoutFeedback, Keyboard
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from 'react-native-material-ui';
import { TextField } from 'react-native-material-textfield';
import Header from '../../components/Header';
import { updatePostAction, addPostAction } from '../../actions';
import Loading from '../../lib/Loading';
import styles, { buttonActiveStyles, buttonDisableStyles } from './style';

class PostDetailScreen extends Component {
  constructor(props) {
    super(props);

    const post = this.props.navigation.getParam('post');

    this.state = {
      userId: post && post.userId ? post.userId : '',
      id: post && post.id ? post.id : '',
      title: post && post.title ? post.title : '',
      body: post && post.body ? post.body : '',
      error: this.props.error ? this.props.error : null,
      isEditting: false,
      loading: false,
    }
  }

  onUpdate = () => {
    this.setState({ loading: true });
    if (this.state.id === '') {
      this.props.addPostAction({
        userId: this.state.userId,
        title: this.state.title,
        body: this.state.body
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
      this.props.updatePostAction({
        id: this.state.id,
        userId: this.state.userId,
        title: this.state.title,
        body: this.state.body
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

  componentWillReceiveProps(nextProps) {
    const post = nextProps.navigation.getParam('post');

    const state = {
      userId: post && post.userId ? post.userId : this.state.userId,
      id: post && post.id ? post.id : '',
      title: post && post.title ? post.title : '',
      body: post && post.body ? post.body : '',
      error: this.props.error ? this.props.error : null,
      isEditting: false
    }

    this.setState(state);
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Header
            title={this.state.id && this.state.id !== '' ? 'Post Detail' : 'Add a post'}
            disableAddButton
            isBack
            goBack={this.goBack}
          />
          {
            this.state.error
              ? (<View><Text>{this.state.error.msg}</Text></View>)
              : null
          }

          <Loading loading={this.state.loading}/>
          <View style={styles.detailContent}>
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

            <TextField
              multiline
              label='Description'
              value={this.state.body}
              onChangeText={(value) => {
                this.setState({
                  body: value,
                  isEditting: true
                });
              }}
              labelFontSize={16}
              tintColor="#ec4563"
              labelPadding={10}
              containerStyle={{ marginTop: 15 }}
            />

            <Button
              primary
              title=""
              text="SAVE"
              onPress={() => this.onUpdate()}
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
      updatePostAction,
      addPostAction
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

export default connect(mapStateToProps, mapDispatchToProps)(PostDetailScreen);
