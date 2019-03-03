/**
 * Home page
 */

import React, { Component } from 'react';
import {
  Text, View, VirtualizedList, TouchableOpacity, Image
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { saveUserData } from '../../lib/saveStore';
import Header from '../../components/Header';
import { getUsersAction, changeCurrentUser } from '../../actions';
import styles from './style';

class UsersScreen extends Component {
  static navigationOptions = () => ({
    tabBarLabel: 'Users',
    tabBarIcon: ({ tintColor }) => <Icon name="user" size={22} color={tintColor} />,
  });

  componentWillMount() {
    this.props.getUsersAction();
  }

  goToDetail = async (item) => {
    if (item.data && item.data.id) {
      await saveUserData(item.data)
        .then((res) => {
          this.props.changeCurrentUser(res);
        })
        .catch(() => {
          this.props.changeCurrentUser(null);
        });

      this.props.navigation.navigate('UserDetail', { user: item.data });
    }
  }

  goToAddUserPage = () => {
    const { user } = this.props;
    this.props.navigation.navigate('AddUser', { user });
  }

  onToogle = () => {
    this.props.navigation.toggleDrawer();
  }

  render() {
    return (
      <View style={styles.container}>
        <Header title="Users" onPress={this.goToAddUserPage} onToogle={this.onToogle} disableAddButton />
        <View style={styles.listContent}>
          <VirtualizedList
            initialNumberToRender={5}
            windowSize={5}
            data={this.props.users}
            getItemCount={() => this.props.users.length}
            getItem={(data, index) => {
              return { key: index, data: data[index] };
            }}
            keyExtractor={(item) => {
              return `item${item.key}`;
            }}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity key={item.key.toString()} onPress={() => this.goToDetail(item)}>
                  <View style={styles.userItem}>
                    <Text style={styles.userName}>
                      {item.data && item.data.name ? item.data.name : ''}
                    </Text>
                    <MaterialIcon name="keyboard-arrow-right" size={30} color="grey" style={styles.rightArrow}/>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return Object.assign(
    { dispatch },
    bindActionCreators({
      getUsersAction,
      changeCurrentUser
    }, dispatch)
  );
}

const mapStateToProps = (state) => {
  const users = state.userReducer
  return {
    error: users.error,
    users: users.users,
    user: users.user
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersScreen);
