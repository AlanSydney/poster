/**
 * Todos Page
 */

import React, { Component } from 'react';
import {
  Text, View, VirtualizedList, TouchableOpacity
} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Header from '../../components/Header';
import { getTodosAction } from '../../actions';
import styles from './style';

class TodoScreen extends Component {
  static navigationOptions = () => ({
    tabBarLabel: 'Todos',
    tabBarIcon: ({ tintColor }) => <Icon name="edit" size={25} color={tintColor} />,
  });

  componentWillMount() {
    this.props.getTodosAction();
  }

  goToDetail = (item) => {
    let params = {
      todo: {
        userId: this.props.user && this.props.user.id ? this.props.user.id : ''
      }
    };

    if (item && item.data && item.data.id) {
      params = { todo: item.data };
    }

    this.props.navigation.navigate('TodoDetail', params);
  }

  onToogle = () => {
    this.props.navigation.toggleDrawer();
  }

  getItemCount = () => {
    return this.props.todos && this.props.todos.length > 0 ? this.props.todos.length : 0
  }

  render() {
    return (
      <View style={styles.container}>
        <Header title="Todo" onPress={this.goToDetail} onToogle={this.onToogle} />
        {
          this.props.todos && this.props.todos.length > 0
            ? (
              <View style={styles.listContent}>
                <VirtualizedList
                  initialNumberToRender={5}
                  windowSize={5}
                  data={this.props.todos}
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
            )
            : null
        }
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return Object.assign(
    { dispatch },
    bindActionCreators({
      getTodosAction
    }, dispatch)
  );
}

const mapStateToProps = (state) => {
  const todos = state.todoReducer;
  const users = state.userReducer;
  return {
    error: todos.error,
    todos: todos.todos,
    user: users.user
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoScreen);
