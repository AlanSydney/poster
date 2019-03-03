import React, { Component } from 'react';
import {
  View, Text, TouchableWithoutFeedback, Keyboard
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TextField } from 'react-native-material-textfield';
import { Button } from 'react-native-material-ui';
import Header from '../../components/Header';
import { updatePhotoAction, addPhotoAction } from '../../actions';
import styles, { buttonActiveStyles, buttonDisableStyles } from './style';
import Loading from '../../lib/Loading';

class PhotoDetailScreen extends Component {
  constructor(props) {
    super(props);

    const photo = this.props.navigation.getParam('photo');

    this.state = {
      id: photo && photo.id ? photo.id : '',
      albumId: photo && photo.id ? photo.albumId : '',
      title: photo && photo.title ? photo.title : '',
      url: photo && photo.url ? photo.url : '',
      thumbnailUrl: photo && photo.thumbnailUrl ? photo.thumbnailUrl : '',
      error: this.props.error ? this.props.error : null,
      isEditting: false,
      urlErrMsg: '',
      thumErrMsg: '',
      loading: false,
    }
  }

  onUpdate = () => {
    var isValidUrl = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.​\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[​6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1​,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00​a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u​00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/i;
    
    if(!isValidUrl.test(this.state.url)) {
      this.setState({ urlErrMsg: 'Invalid url' })
    } else if(!isValidUrl.test(this.state.thumbnailUrl)) {
      this.setState({ thumErrMsg: 'Invalid url', urlErrMsg: '' })
    } else {
      this.setState({ loading: true });
      if (this.state.id === '') {
        this.props.addPhotoAction({
          albumId: this.state.albumId,
          title: this.state.title,
          url: this.state.url,
          thumbnailUrl: this.state.thumbnailUrl
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
        this.props.updatePhotoAction({
          id: this.state.id,
          albumId: this.state.albumId,
          title: this.state.title,
          url: this.state.url,
          thumbnailUrl: this.state.thumbnailUrl
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
  }

  componentWillReceiveProps(nextProps) {
    const photo = nextProps.navigation.getParam('photo');

    const state = {
      id: photo && photo.id ? photo.id : this.state.id,
      albumId: photo && photo.id ? photo.albumId : this.state.albumId,
      title: photo && photo.title ? photo.title : this.state.title,
      url: photo && photo.url ? photo.url : this.state.url,
      thumbnailUrl: photo && photo.thumbnailUrl ? photo.thumbnailUrl : this.state.thumbnailUrl,
      error: this.props.error ? this.props.error : this.state.error,
      isEditting: this.state.isEditting
    }

    this.setState(state);
  }

  goBack = () => {
    this.props.navigation.goBack()
  }

  render() {
    var urlError = this.state.urlErrMsg;
    var thumbError = this.state.thumErrMsg;

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Header
            title={this.state.id && this.state.id !== '' ? 'Photo Detail' : 'Add a photo'}
            disableAddButton
            isBack
            goBack={this.goBack}
          />
          {
            (!this.state.error || Object.keys(this.state.error).length > 0)
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
              title={urlError}
              label='URL'
              value={this.state.url}
              onChangeText={(value) => {
                this.setState({
                  url: value,
                  isEditting: true
                });
              }}
              labelFontSize={16}
              tintColor="#ec4563"
              titleTextStyle={{ color: 'red'}}
              labelPadding={10}
            /> 

            <TextField
              multiline
              title={thumbError}
              label='Thumbnail URL'
              value={this.state.thumbnailUrl}
              onChangeText={(value) => {
                this.setState({
                  thumbnailUrl: value,
                  isEditting: true
                });
              }}
              labelFontSize={16}
              tintColor="#ec4563"
              titleTextStyle={{ color: 'red'}}
              labelPadding={10}
            /> 

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
      updatePhotoAction,
      addPhotoAction
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

export default connect(mapStateToProps, mapDispatchToProps)(PhotoDetailScreen);
