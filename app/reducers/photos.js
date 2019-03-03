/* eslint-disable import/prefer-default-export */
import _ from 'lodash';
import createReducer from '../lib/createReducer'
import * as types from '../lib/constants'

const initialstate = {
  photos: [],
  albums: [],
  error: {}
}

export const photoReducer = createReducer(initialstate, {
  [types.PHOTOS.GET](state, action) {
    return Object.assign({}, state, {
      photos: action.payload
    })
  },
  [types.PHOTOS.ADD](state, action) {
    const { photos } = state;
    photos.push(action.payload);

    return Object.assign({}, state, {
      photos, error: {}
    })
  },
  [types.PHOTOS.REMOVE](state, action) {
    const { photos } = state;
    const idx = _.findIndex(photos, (o) => {
      return o.id === action.payload.id;
    });

    if (idx !== -1) {
      photos.splice(idx, 1);
    }

    return Object.assign({}, state, {
      photos, error: {}
    });
  },
  [types.PHOTOS.UPDATE](state, action) {
    const { photos } = state;
    const idx = _.findIndex(photos, (o) => {
      return o.id === action.payload.id;
    });

    if (idx !== -1) {
      photos[idx] = action.payload;
    }

    return Object.assign({}, state, {
      photos, error: {}
    })
  },
  [types.ALBUMS.GET](state, action) {
    return Object.assign({}, state, {
      albums: action.payload
    })
  },
  [types.ALBUMS.ADD](state, action) {
    const { albums } = state;
    albums.push(action.payload);

    return Object.assign({}, state, {
      albums, error: {}
    })
  },
  [types.ALBUMS.REMOVE](state, action) {
    const { albums } = state;
    const idx = _.findIndex(albums, (o) => {
      return o.id === action.payload.id;
    });

    if (idx !== -1) {
      albums.splice(idx, 1);
    }

    return Object.assign({}, state, {
      albums, error: {}
    });
  },
  [types.PHOTOS.ERROR](state, action) {
    return Object.assign({}, state, {
      error: action.msg
    })
  }
})
