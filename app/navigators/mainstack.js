
import {
  createStackNavigator,
  createAppContainer,
  createBottomTabNavigator,
  createDrawerNavigator
} from 'react-navigation';
import {
  Platform
} from 'react-native';

import UsersScreen from '../screens/users/index';
import PostScreen from '../screens/posts/index';
import PhotoScreen from '../screens/photos/index';
import AddPhotoScreen from '../screens/photos/add-photo';
import TodoScreen from '../screens/todos/index';
import DrawerMenu from '../screens/navigator/drawer-menu/index';
import UserDetailScreen from '../screens/users/user-detail';
import AddUserScreen from '../screens/users/add-user';
import PostDetailScreen from '../screens/posts/post-detail';
import TodoDetailScreen from '../screens/todos/todo-detail';
import AlbumDetailScreen from '../screens/photos/album-detail';
import PhotoDetailScreen from '../screens/photos/photo-detail';

const innerStack = createStackNavigator({
  AlbumDetail: {
    screen: AlbumDetailScreen,
    navigationOptions: {
      title: 'Album Detail',
      headerackTitle: 'Album Detail'
    }
  },
  PhotoDetail: {
    screen: PhotoDetailScreen,
    navigationOptions: {
      title: 'Photo Detail',
      headerackTitle: 'Photo Detail'
    }
  },
  AddPhoto: {
    screen: AddPhotoScreen,
    navigationOptions: {
      title: 'Add Photo',
      headerackTitle: 'Add Photo'
    }
  },
}, {
    headerMode: 'none',
});

const TabNavigator = createBottomTabNavigator({
  Users: {
    screen: UsersScreen,
    navigationOptions: {
      header: null
    }
  },
  Posts: {
    screen: PostScreen,
    navigationOptions: {
      header: null
    }
  },
  Photos: {
    screen: PhotoScreen,
    navigationOptions: {
      header: null
    }
  },
  Todos: {
    screen: TodoScreen,
    navigationOptions: {
      header: null
    }
  }
}, {
  tabBarOptions: {
    mode: 'modal',
    upperCaseLabel: false,
    pressColor: '#f9e500',
    pressOpacity: 0.6,
    activeTintColor: '#ec4563',
    inactiveTintColor: '#777',
    style: {
      padding: 0,
      backgroundColor: '#ececec',
      height: Platform.OS === 'ios' ? 50 : 70,
      borderTopWidth: 0
    },
    iconStyle: {
      marginTop: 18,
    },
    tabStyle: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    labelStyle: {
      fontSize: 14,
      marginBottom: 8
    },
  }
});

const DrawNavigator = createDrawerNavigator({
  TabNav: { screen: TabNavigator },
  UserDetail: {
    screen: UserDetailScreen,
    navigationOptions: {
      title: 'User Detail',
      headerackTitle: 'User Detail'
    }
  },
  AddUser: {
    screen: AddUserScreen,
    navigationOptions: {
      title: 'Add a user',
      headerackTitle: 'Add a user'
    }
  },
  PostDetail: {
    screen: PostDetailScreen,
    navigationOptions: {
      title: 'Post Detail',
      headerackTitle: 'Post Detail'
    }
  },
  TodoDetail: {
    screen: TodoDetailScreen,
    navigationOptions: {
      title: 'Todo Detail',
      headerackTitle: 'Todo Detail'
    }
  },
  // AlbumDetail: {
  //   screen: innerStack
  // }
  AlbumDetail: {
    screen: AlbumDetailScreen,
    navigationOptions: {
      title: 'Album Detail',
      headerackTitle: 'Album Detail'
    }
  },
  PhotoDetail: {
    screen: PhotoDetailScreen,
    navigationOptions: {
      title: 'Photo Detail',
      headerackTitle: 'Photo Detail'
    }
  },
  AddPhoto: {
    screen: AddPhotoScreen,
    navigationOptions: {
      title: 'Add Photo',
      headerackTitle: 'Add Photo'
    }
  }
}, {
  drawerWidth: 320,
  drawerPosition: 'left',
  contentComponent: DrawerMenu,
  initialRouteName: 'TabNav',
  backBehavior: 'initialRoute'
});

const Mainstack = createStackNavigator({
  Home: {
    screen: DrawNavigator,
    navigationOptions: {
      title: null
    }
  }
},
{
  initialRouteName: 'Home',
  headerMode: 'none'
});

export default createAppContainer(Mainstack);
