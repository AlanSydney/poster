/**
 * Posts Details Page
 */

import React, { Component } from 'react';
import {
  View, Text
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Button, TextareaItem
} from '@ant-design/react-native';
import Header from '../../components/Header';
import { addUserAction } from '../../actions';
import styles from './style';
import Loading from '../../lib/Loading';

class AddUserScreen extends Component {
  constructor(props) {
    super(props);

    const post = this.props.navigation.getParam('post');

    this.state = {
      userId: post && post.id ? post.id : '',
      id: post && post.id ? post.id : '',
      title: post && post.title ? post.title : '',
      body: post && post.body ? post.body : '',
      error: this.props.error ? this.props.error : null,
      isEditting: false,
      loading: false,
    }
  }

  onAdd = () => {
    this.setState({ loading: true });
    this.props.addUserAction({
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

  goBack = () => {
    this.props.navigation.goBack();
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          title="Add User"
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
        <View>
          <Text style={styles.label}>Title:</Text>
          <TextareaItem
            value={this.state.title}
            onChange={(value) => {
              this.setState({
                title: value,
                isEditting: true
              });
            }}
            placeholder="Description"
            title="Description"
            autoHeight
            labelNumber={5}
            style={styles.inputItem}
          />

          <Text style={styles.label}>Description:</Text>
          <TextareaItem
            multiline
            value={this.state.body}
            onChange={(value) => {
              this.setState({
                body: value,
                isEditting: true
              });
            }}
            placeholder="Description"
          />
          <Button
            type="primary"
            onPress={() => this.onAdd()}
            disabled={!this.state.isEditting}
          >
            Save
          </Button>
        </View>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return Object.assign(
    { dispatch },
    bindActionCreators({
      addUserAction
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

export default connect(mapStateToProps, mapDispatchToProps)(AddUserScreen);
