/* eslint-disable import/prefer-default-export */
import _ from 'lodash';
import createReducer from '../lib/createReducer'
import * as types from '../lib/constants'

const initialstate = {
  users: [],
  posts: [],
  photos: [],
  todos: [],
  albums: [],
  user: null,
  error: {},
  selectedUsers: 0,
  avatars: []
}

export const userReducer = createReducer(initialstate, {
  [types.USERS.GET](state, action) {
    return Object.assign({}, state, {
      users: action.payload
    })
  },
  [types.USERS.ADD](state, action) {
    const { users } = state;
    users.push(action.payload);

    return Object.assign({}, state, {
      users, error: {}
    })
  },
  [types.USERS.REMOVE](state, action) {
    const { users } = state;
    const idx = _.findIndex(users, (o) => {
      return o.id === action.payload.id;
    });

    if (idx !== -1) {
      users.splice(idx, 1);
    }

    return Object.assign({}, state, {
      users, error: {}
    });
  },
  [types.USERS.GET_POSTS](state, action) {
    return Object.assign({}, state, {
      posts: action.payload
    })
  },
  [types.USERS.GET_PHOTOS](state, action) {
    return Object.assign({}, state, {
      photos: action.payload
    })
  },
  [types.USERS.GET_ALBUMS](state, action) {
    return Object.assign({}, state, {
      albums: action.payload
    })
  },
  [types.USERS.GET_TODOS](state, action) {
    return Object.assign({}, state, {
      todos: action.payload
    })
  },
  [types.USERS.CHANGE_CURRENT_USER](state, action) {
    let selectedUsers = state.selectedUsers ? state.selectedUsers : 0;
    if (state.avatars && state.avatars.length > 0) {
      selectedUsers += 1;
    }

    return Object.assign({}, state, {
      user: action.payload,
      selectedUsers
    })
  },
  [types.USERS.GET_CURRENT_USER](state, action) {
    return Object.assign({}, state, {
      user: action.payload
    })
  },
  [types.USERS.GET_AVATARS](state, action) {
    return Object.assign({}, state, {
      avatars: action.payload,
      selectedUsers: 0
    })
  },
  [types.USERS.ERROR](state, action) {
    return Object.assign({}, state, {
      error: action.msg
    })
  }
})
