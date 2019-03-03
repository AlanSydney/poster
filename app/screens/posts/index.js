/**
 * Posts Page
 */

import React, { Component } from 'react';
import {
  Text, View, VirtualizedList, TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getPostsAction } from '../../actions';
import Header from '../../components/Header';
import styles from './style';

class PostScreen extends Component {
  static navigationOptions = () => ({
    tabBarLabel: 'Posts',
    tabBarIcon: ({ tintColor }) => <Icon name="book" size={22} color={tintColor} />,
  });

  componentWillMount() {
    this.props.getPostsAction();
  }

  componentDidMount() {
    this.props.navigation.addListener('didFocus', () => {
      if (this.props.posts.length === 0) {
        this.props.getPostsAction();
      }
    });
  }

  goToDetail = (item) => {
    let params = {
      post: {
        userId: this.props.user && this.props.user.id ? this.props.user.id : ''
      }
    };

    if (item && item.data && item.data.id) {
      params = { post: item.data };
    }

    this.props.navigation.navigate('PostDetail', params);
  }

  onToogle = () => {
    this.props.navigation.toggleDrawer();
  }

  getItemCount = () => {
    return this.props.posts && this.props.posts.length > 0 ? this.props.posts.length : 0
  }

  render() {
    return (
      <View style={styles.container}>
        <Header title="Posts" onPress={this.goToDetail} onToogle={this.onToogle} />
        {/* {
          this.props.posts && this.props.posts.length > 0
            ? ( */}
        <View style={styles.listContent}>
          <VirtualizedList
            initialNumberToRender={5}
            windowSize={5}
            data={this.props.posts}
            getItemCount={this.getItemCount}
            getItem={(data, index) => {
              return { key: index, data: data[index] };
            }}
            keyExtractor={(item) => {
              return `item${item.key}`;
            }}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity onPress={() => this.goToDetail(item)}>
                  <View key={item.key.toString()} style={styles.userItem}>
                    <Text style={styles.titleText} numberOfLines={1}>
                      {item.data && item.data.title ? item.data.title : ''}
                    </Text>

                    <MaterialIcon name="keyboard-arrow-right" size={30} color="grey" style={styles.rightArrow}/>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
        {/* )
            : <Text>{this.props.posts.length}</Text>
        } */}
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return Object.assign(
    { dispatch },
    bindActionCreators({
      getPostsAction
    }, dispatch)
  );
}

const mapStateToProps = (state) => {
  const posts = state.postReducer;
  const users = state.userReducer;
  return {
    error: posts.error,
    posts: posts.posts,
    user: users.user
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostScreen);
