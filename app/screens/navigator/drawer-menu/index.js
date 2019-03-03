import React, { Component } from 'react';
import {
  View, TouchableOpacity, Text, ImageBackground, Image
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/FontAwesome5';
import FoundationIcon from 'react-native-vector-icons/Foundation';
import { getCurrentUser } from '../../../actions';
import styles from './style';
import coverBackground from '../../../../assets/icons/bg.jpg';

class DrawerMenu extends Component {
  componentDidMount() {
    this.props.getCurrentUser();
  }

  render() {
    const { user, avatars } = this.props;
    let userImage = 'https://cdn3.iconfinder.com/data/icons/social-messaging-productivity-6/128/profile-male-circle2-512.png';
    if (user && avatars && avatars.length > 0) {
      let imageId = user && user.id ? user.id : 0;
      if (imageId > 100) { imageId -= 100; }
      userImage = avatars[imageId].photo;
    }

    return (
      <View style={{ flex: 1 }}>
        <View style={{ backgroundColor: '#ec4563', height: 180 }}>
          <Image
            style={{
              width: '100%',
              height: '100%',
              position: 'absolute',
            }}
            source={coverBackground}
          />
          <TouchableOpacity
            style={{
              borderWidth: 1,
              borderColor: 'rgba(0,0,0,0.2)',
              width: 80,
              height: 80,
              backgroundColor: '#fff',
              borderRadius: 100,
              marginLeft: 20,
              marginTop: 20
            }}
            onPress={() => this.props.onPress()}
          >
            <ImageBackground
              style={{
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                alignItem: 'center'
              }}
              imageStyle={{ borderRadius: 50 }}
              source={{ uri: userImage }}
            />
          </TouchableOpacity>
          <View style={styles.nameContainer}>
            <Text style={styles.name}>{ user && user.name ? user.name : '' }</Text>
            <Text style={styles.email}>{ user && user.email ? user.email : '' }</Text>
          </View>
        </View>
        <View style={{ marginTop: 20 }}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => this.props.navigation.navigate('Users')}
          >
            <Icon name="user" size={22} color="#777" style={styles.icon}/>
            <Text style={styles.menuItemText}>Users</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => this.props.navigation.navigate('Posts')}
          >
            <Icon name="book" size={22} color="#777" style={styles.icon}/>
            <Text style={styles.menuItemText}>Posts</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => this.props.navigation.navigate('Todos')}
          >
            <Icon name="edit" size={22} color="#777" style={styles.icon}/>
            <Text style={styles.menuItemText}>Todos</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => this.props.navigation.navigate('Photos')}
          >
            <FoundationIcon name="photo" size={22} color="#777" style={styles.icon}/>
            <Text style={styles.menuItemText}>Photos</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return Object.assign(
    { dispatch },
    bindActionCreators({
      getCurrentUser
    }, dispatch)
  );
}

const mapStateToProps = (state) => {
  const data = state.userReducer;

  return {
    error: data.error,
    user: data.user,
    avatars: data.avatars,
    selectedUsers: data.selectedUsers
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DrawerMenu);
