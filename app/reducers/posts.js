/* eslint-disable import/prefer-default-export */
import _ from 'lodash';
import createReducer from '../lib/createReducer'
import * as types from '../lib/constants'

const initialstate = {
  posts: [],
  error: {}
}

export const postReducer = createReducer(initialstate, {
  [types.POSTS.GET](state, action) {
    return Object.assign({}, state, {
      posts: action.payload, error: {}
    })
  },
  [types.POSTS.ADD](state, action) {
    const { posts } = state;
    posts.push(action.payload);

    return Object.assign({}, state, {
      posts, error: {}
    })
  },
  [types.POSTS.REMOVE](state, action) {
    const { posts } = state;
    const idx = _.findIndex(posts, (o) => {
      return o.id === action.payload.id;
    });

    if (idx !== -1) {
      posts.splice(idx, 1);
    }

    return Object.assign({}, state, {
      posts, error: {}
    });
  },
  [types.POSTS.UPDATE](state, action) {
    const { posts } = state;
    const idx = _.findIndex(posts, (o) => {
      return o.id === action.payload.id;
    });

    if (idx !== -1) {
      posts[idx] = action.payload;
    }

    return Object.assign({}, state, {
      posts, error: {}
    });
  },
  [types.POSTS.ERROR](state, action) {
    return Object.assign({}, state, {
      error: action.msg
    })
  }
})
