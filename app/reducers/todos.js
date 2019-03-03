/* eslint-disable import/prefer-default-export */
import _ from 'lodash';
import createReducer from '../lib/createReducer'
import * as types from '../lib/constants'

const initialstate = {
  todos: [],
  error: {}
}

export const todoReducer = createReducer(initialstate, {
  [types.TODOS.GET](state, action) {
    return Object.assign({}, state, {
      todos: action.payload
    })
  },
  [types.TODOS.ADD](state, action) {
    const { todos } = state;
    todos.push(action.payload);

    return Object.assign({}, state, {
      todos, error: {}
    })
  },
  [types.TODOS.REMOVE](state, action) {
    const { todos } = state;
    const idx = _.findIndex(todos, (o) => {
      return o.id === action.payload.id;
    });

    if (idx !== -1) {
      todos.splice(idx, 1);
    }

    return Object.assign({}, state, {
      todos, error: {}
    });
  },
  [types.TODOS.UPDATE](state, action) {
    const { todos } = state;
    const idx = _.findIndex(todos, (o) => {
      return o.id === action.payload.id;
    });

    if (idx !== -1) {
      todos[idx] = action.payload;
    }

    return Object.assign({}, state, {
      todos, error: {}
    })
  },
  [types.TODOS.ERROR](state, action) {
    return Object.assign({}, state, {
      error: action.msg
    })
  }
})
