/**
 * Posts Details Page
 */

import React, { Component } from 'react';
import {
  View, Text, VirtualizedList, TouchableOpacity, Image
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Header from '../../components/Header';
import styles from './style';

class AlbumDetailScreen extends Component {
  constructor(props) {
    super(props);

    const album = this.props.navigation.getParam('album');

    this.state = {
      id: album && album.id ? album.id : ''
    }
  }

  goToDetail = (item) => {
    let params = { photo: { albumId: this.state.id } };

    if (item && item.data && item.data.id) {
      params = { photo: item.data }
      this.props.navigation.navigate('PhotoDetail', params);
    } else {
      this.props.navigation.navigate('AddPhoto', params);
    }
  }

  onToogle = () => {
    this.props.navigation.toggleDrawer();
  }

  getItemCount = () => {
    return this.props.photos && this.props.photos.length > 0 ? this.props.photos.length : 0
  }

  render() {
    return (
      <View style={styles.container}>
        <Header title="Photo List" onPress={() => this.goToDetail()} onToogle={this.onToogle} />
        {
          this.state.error
            ? (<View><Text>{this.state.error.msg}</Text></View>)
            : null
        }
        <View style={[styles.listContent, { padding: 10 }]}>
          {
            this.props.photos && this.props.photos.length > 0
              ? (
                <VirtualizedList
                  initialNumberToRender={5}
                  windowSize={5}
                  data={this.props.photos}
                  getItemCount={this.getItemCount}
                  getItem={(data, index) => {
                    return { key: index, data: data[index] };
                  }}
                  keyExtractor={(item) => {
                    return `item${item.key}`;
                  }}
                  contentContainerStyle={styles.listView}
                  automaticallyAdjustContentInsets={false}
                  removeClippedSubviews={false}
                  enableEmptySections={true}
                  renderItem={({ item }) => {
                    return (
                      <TouchableOpacity
                        onPress={() => this.goToDetail(item)}
                        style={styles.gridItem}
                      >
                        <View key={item.key.toString()} style={styles.gridItemImage}>
                          <View
                            style={styles.containerView}
                          >
                            <Image
                              style={styles.img}
                              source={{ uri: item.data && item.data.thumbnailUrl ? item.data.thumbnailUrl : '' }}
                            />
                            
                            <Text  numberOfLines={2} style={[styles.titleText, { marginTop: 10, width: '100%' }]}>
                              {item.data && item.data.title ? item.data.title : ''}
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    );
                  }}
                />
              )
              : null
          }
        </View>
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
  const data = state.photoReducer;
  return {
    error: data.error,
    photos: data.photos,
    albums: data.albums
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AlbumDetailScreen);
