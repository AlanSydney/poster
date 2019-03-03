export const Constants = {
 BASE_URL: 'https://jsonplaceholder.typicode.com',
  // BASE_URL: 'https://58a64bdd.ngrok.io',
  // BASE_URL: 'http://localhost:3000',
  appDetail: {
    username: 'test',
    password: 'test'
  }
}


export const BASE_URL = 'https://jsonplaceholder.typicode.com';
// export const BASE_URL = 'https://58a64bdd.ngrok.io';
// export const BASE_URL =  'http://localhost:3000';

/* Actions */
export const DEMO = 'DEMO';
export const GET_POSTS_URL = '/posts';
export const GET_COMMENTS_URL = '/comments';
export const GET_ALBUMS_URL = '/albums';
export const GET_PHOTOS_URL = '/photos';
export const GET_TODOS_URL = '/todos';
export const GET_USERS_URL = '/users';


/* Constants for Reducer */
export const USERS = {
  GET: 'GET_USERS',
  ADD: 'ADD_USERS',
  REMOVE: 'REMOVE_USERS',
  DELETE: 'DELETE_USERS',
  ERROR: 'ERROR_USERS',
  GET_POSTS: 'GET_POSTS_OF_USERS',
  GET_PHOTOS: 'GET_PHOTOS_OF_USERS',
  GET_ALBUMS: 'GET_ALBUMS_OF_USRES',
  GET_TODOS: 'GET_TODOS_OF_USERS',
  CHANGE_CURRENT_USER: 'CHANGE_CURRENT_USER',
  GET_CURRENT_USER: 'GET_CURRENT_USER',
  GET_AVATARS: 'GET_AVATARS_OF_USERS'
}

export const POSTS = {
  GET: 'GET_POSTS',
  ADD: 'ADD_POSTS',
  REMOVE: 'REMOVE_POSTS',
  DELETE: 'DELETE_POSTS',
  UPDATE: 'UPDATE_POSTS',
  ERROR: 'ERROR_POSTS'
}

export const PHOTOS = {
  GET: 'GET_PHOTOS',
  ADD: 'ADD_PHOTOS',
  REMOVE: 'REMOVE_PHOTOS',
  UPDATE: 'UPDATE_PHOTOS',
  DELETE: 'DELETE_PHOTOS',
  ERROR: 'ERROR_PHOTOS'
}

export const TODOS = {
  GET: 'GET_TODOS',
  ADD: 'ADD_TODOS',
  REMOVE: 'REMOVE_TODOS',
  UPDATE: 'UPDATE_TODOS',
  DELETE: 'DELETE_TODOS',
  ERROR: 'ERROR_TODOS'
}

export const ALBUMS = {
  GET: 'GET_ALBUMS',
  ADD: 'ADD_ALBUMS',
  REMOVE: 'REMOVE_ALBUMS',
  UPDATE: 'UPDATE_ALBUMS',
  DELETE: 'DELETE_ALBUMS',
  ERROR: 'ERROR_ALBUMS'
}
