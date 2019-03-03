import { combineReducers } from 'redux';
import * as navigation from './navigation';
import * as users from './users';
import * as posts from './posts';
import * as photos from './photos';
import * as todos from './todos';


export default combineReducers(Object.assign(
  navigation,
  users,
  posts,
  photos,
  todos
));
