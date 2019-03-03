/**
 * User Detail Page
 */

import React, { Component } from 'react';
import {
  Text, View, VirtualizedList, TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Accordion } from '@ant-design/react-native';
import Header from '../../components/Header';
import {
  getUserPostsAction,
  getUserAlbumsAction,
  getUserTodosAction,
  getCurrentUser
} from '../../actions';
import styles from './style';

class UserDetailScreen extends Component {
  constructor(props) {
    super(props);

    const user = this.props.navigation.getParam('user');

    this.state = {
      activeSections: [],
      userId: user && user.id ? user.id : null,
      user
    };
  }

  componentWillMount() {
    if (this.state.userId) {
      this.props.getUserPostsAction(this.state.userId);
      this.props.getUserAlbumsAction(this.state.userId);
      this.props.getUserTodosAction(this.state.userId);
    }
    this.props.getCurrentUser();
  }

  onChange = (activeSections) => {
    this.setState({ activeSections });
  };

  goToDetail = (item, path = 'post') => {
    if (item.data && item.data.id) {
      switch (path) {
      case 'album':
        this.props.navigation.navigate('AlbumDetail', {
          user: this.state.user,
          album: item.data
        });
        return;
      case 'todo':
        this.props.navigation.navigate('TodoDetail', {
          user: this.state.user,
          todo: item.data
        });
        return;
      default: this.props.navigation.navigate('PostDetail', {
        user: this.state.user,
        post: item.data
      });
      }
    }
  }

  goToAddUserPage = () => {
    
  }

  getPostsItemCount = () => {
    return this.props.posts && this.props.posts.length > 0 ? this.props.posts.length : 0;
  }

  getAlbumsItemCount = () => {
    return this.props.albums && this.props.albums.length > 0 ? this.props.albums.length : 0;
  }

  getTodosItemCount = () => {
    return this.props.todos && this.props.todos.length > 0 ? this.props.todos.length : 0;
  }

  onToogle = () => {
    this.props.navigation.toggleDrawer();
  }

  render() {
    return (
      <View style={styles.container}>
        <Header title="User Detail" onPress={this.goToAddUserPage} onToogle={this.onToogle} />
        <Accordion
          onChange={this.onChange}
          activeSections={this.state.activeSections}
          style={{ width: '100%' }}
        >
          {/* -------------------- POSTS BEGIN ------------------ */}
          <Accordion.Panel header="Posts" style={styles.accordionHeader}>
            {
              this.props.posts && this.props.posts.length > 0
                ? (
                  <View style={styles.subContent}>
                    <VirtualizedList
                      initialNumberToRender={5}
                      windowSize={5}
                      data={this.props.posts}
                      getItemCount={this.getPostsItemCount}
                      getItem={(data, index) => {
                        return { key: index, data: data[index] };
                      }}
                      keyExtractor={(item) => {
                        return `item${item.key}`;
                      }}
                      renderItem={({ item }) => {
                        return (
                          <TouchableOpacity onPress={() => this.goToDetail(item, 'post')}>
                            <View key={item.key.toString()} style={styles.userItem}>
                              <Text style={styles.titleText}>
                                {item.data && item.data.title ? item.data.title : ''}
                              </Text>
                            </View>
                          </TouchableOpacity>
                        );
                      }}
                    />
                  </View>

                )
                : <Text>No Posts</Text>
            }
          </Accordion.Panel>
          {/* ------------------------- ALBUMS BEGIN ------------------------------- */}
          <Accordion.Panel header="Albums"  style={styles.accordionHeader}>
            {
              this.props.albums && this.props.albums.length > 0
                ? (
                  <View style={styles.subContent}>
                    <VirtualizedList
                      initialNumberToRender={5}
                      windowSize={5}
                      data={this.props.albums}
                      getItemCount={this.getAlbumsItemCount}
                      getItem={(data, index) => {
                        return { key: index, data: data[index] };
                      }}
                      keyExtractor={(item) => {
                        return `item${item.key}`;
                      }}
                      renderItem={({ item }) => {
                        return (
                          <TouchableOpacity onPress={() => this.goToDetail(item, 'album')}>
                            <View key={item.key.toString()} style={styles.userItem}>
                              <Text style={styles.titleText}>
                                {item.data && item.data.title ? item.data.title : ''}
                              </Text>
                            </View>
                          </TouchableOpacity>
                        );
                      }}
                    />
                  </View>
                )
                : <Text>No Albums</Text>
            }
          </Accordion.Panel>
          {/* ------------------------- TODOS BEGIN ------------------------------- */}
          <Accordion.Panel header="Todos" style={styles.accordionHeader}>
            {
              this.props.todos && this.props.todos.length > 0
                ? (
                  <View style={styles.subContent}>
                    <VirtualizedList
                      style={{ height: '100%' }}
                      initialNumberToRender={5}
                      windowSize={5}
                      data={this.props.todos}
                      getItemCount={this.getTodosItemCount}
                      getItem={(data, index) => {
                        return { key: index, data: data[index] };
                      }}
                      keyExtractor={(item) => {
                        return `item${item.key}`;
                      }}
                      renderItem={({ item }) => {
                        return (
                          <TouchableOpacity onPress={() => this.goToDetail(item, 'todo')}>
                            <View key={item.key.toString()} style={styles.userItem}>
                              <Text style={styles.titleText}>
                                {item.data && item.data.title ? item.data.title : ''}
                              </Text>
                            </View>
                          </TouchableOpacity>
                        );
                      }}
                    />
                  </View>
                )
                : <Text>No Todolist</Text>
            }
          </Accordion.Panel>
        </Accordion>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return Object.assign(
    { dispatch },
    bindActionCreators({
      getUserPostsAction,
      getUserAlbumsAction,
      getUserTodosAction,
      getCurrentUser
    }, dispatch)
  );
}

const mapStateToProps = (state) => {
  const users = state.userReducer
  return {
    error: users.error,
    users: users.users,
    posts: users.posts,
    photos: users.photos,
    todos: users.todos,
    albums: users.albums
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDetailScreen);
