/**
 * Photos Page
 */

import React, { Component } from 'react';
import {
  Text, View, VirtualizedList, TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Foundation';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Header from '../../components/Header';
import { getAlbumsAction, getPhotosByAlbumIdAction } from '../../actions';
import styles from './style';

class PhotoScreen extends Component {
  static navigationOptions = () => ({
    tabBarLabel: 'Photos',
    tabBarIcon: ({ tintColor }) => <Icon name="photo" size={25} color={tintColor} />,
  });

  componentWillMount() {
    this.props.getAlbumsAction();
  }

  goToDetail = (item) => {
    if (item.data && item.data.id) {
      this.props.getPhotosByAlbumIdAction(item.data.id);
      this.props.navigation.navigate('AlbumDetail', { album: item.data });
    }
  }

  onToogle = () => {
    this.props.navigation.toggleDrawer();
  }

  getItemCount = () => {
    return this.props.albums && this.props.albums.length > 0 ? this.props.albums.length : 0
  }

  render() {
    return (
      <View style={styles.container}>
        <Header title="Album" onPress={this.goToDetail} onToogle={this.onToogle} disableAddButton />
        {
          this.props.albums && this.props.albums.length > 0
            ? (
              <View style={styles.listContent}>
                <VirtualizedList
                  initialNumberToRender={5}
                  windowSize={5}
                  data={this.props.albums}
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
      getAlbumsAction,
      getPhotosByAlbumIdAction
    }, dispatch)
  );
}

const mapStateToProps = (state) => {
  const data = state.photoReducer;
  return {
    error: data.error,
    photos: data.photos,
    albums: data.albums
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PhotoScreen);
