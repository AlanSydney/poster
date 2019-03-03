import React, { Component } from 'react';
import {
  Text, View, TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/FontAwesome5';
import styles from './style';

class Header extends Component {
  render() {
    return (
      <View style={[styles.buttonContainer]}>
        {
          this.props.isBack
            ? (
              <TouchableOpacity style={{ alignSelf: 'center', marginLeft: 10 }} onPress={() => this.props.goBack()}>
                <Icon name="arrow-left" size={30} color="#fff" />
              </TouchableOpacity>
            )
            : (
              <TouchableOpacity style={{ alignSelf: 'center', marginLeft: 10 }} onPress={() => this.props.onToogle()}>
                <Icon name="bars" size={30} color="#fff" />
              </TouchableOpacity>
            )
        }
        <View style={{ alignSelf: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 18, color: '#fff', fontWeight: 'bold' }}>{this.props.title}</Text>
        </View>
        {
          !this.props.disableAddButton
            ? (
              <TouchableOpacity
                style={{
                  width: 50,
                  height: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'right'
                }}
                onPress={() => this.props.onPress()}
              >
                <Icon
                  name="plus"
                  size={30}
                  color="#fff"
                />
              </TouchableOpacity>
            )
            : <View style={{ width: 50, height: 50, textAlign: 'right' }} />
        }
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return Object.assign(
    { dispatch },
    bindActionCreators({
    }, dispatch)
  );
}

const mapStateToProps = (state) => {
  const users = state.userReducer
  return {
    error: users.error,
    users: users.users
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
