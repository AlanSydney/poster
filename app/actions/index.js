import * as Constants from '../lib/constants';
import api from '../lib/coreApi';
import { getUserData } from '../lib/saveStore';

/* USERS ACTION SECTION */
export const getUsersAction = () => {
  return (dispatch) => {
    api.GET_WITHOUT_AUTH(Constants.GET_USERS_URL)
      .then((res, error) => {
        if (error) {
          dispatch({ type: Constants.USERS.ERROR, msg: error });
        } else if (res.status === 200) {
          dispatch({ type: Constants.USERS.GET, payload: res.data });
        } else {
          dispatch({ type: Constants.USERS.ERROR, msg: { msg: "Can't get users from api" } });
        }
      }).catch((error) => {
        const msg = { msg: "Can't get users from api" };
        dispatch({ type: Constants.USERS.ERROR, msg });
      })
  }
}

export const addUserAction = (data) => {
  return (dispatch) => {
    return api.POST_WITHOUT_AUTH(`${Constants.GET_USERS_URL}`, data)
      .then((res, error) => {
        if (error) {
          dispatch({ type: Constants.USERS.ERROR, msg: error });
          return { success: false, data: error };
        }
        if (res.status >= 200 && res.status < 300) {
          dispatch({ type: Constants.USERS.ADD, payload: res.data });
          return { success: true, data: { msg: 'Successfully saved!' } };
        }
        const msg = { msg: "Can't update users from api" };
        dispatch({ type: Constants.USERS.ERROR, msg });
        return { success: false, data: msg };
      }).catch((error) => {
        const msg = { msg: "Can't update users from api" };
        dispatch({ type: Constants.USERS.ERROR, msg });
      })
  }
}

const getAvatarsFromUIFace = (dispatch) => {
  api.GET_WITH_API_KEY(Constants.UIFACE_API_URL, Constants.UIFACE_API_KEY)
    .then((res, error) => {
      if (!error) {
        if (res.status === 200) {
          dispatch({ type: Constants.USERS.GET_AVATARS, payload: res.data });
        }
      }
    }).catch((error) => {
      const msg = { msg: "Can't get user's Avatar" };
      dispatch({ type: Constants.USERS.ERROR, msg });
    })
}

export const changeCurrentUser = (data) => {
  return (dispatch, getState) => {
    const state = getState();
    dispatch({ type: Constants.USERS.CHANGE_CURRENT_USER, payload: data });

    if (!state.userReducer.selectedUsers || state.userReducer.selectedUsers === 0) {
      getAvatarsFromUIFace(dispatch);
    }
  }
}

export const getCurrentUser = () => {
  return (dispatch, getState) => {
    getUserData()
      .then((res) => {
        const state = getState();

        dispatch({ type: Constants.USERS.GET_CURRENT_USER, payload: JSON.parse(res) });
        if (!state.userReducer.selectedUsers || state.userReducer.selectedUsers === 0) {
          getAvatarsFromUIFace(dispatch);
        }
      })
      .catch(() => {
        dispatch({ type: Constants.USERS.CHANGE_CURRENT_USER, payload: null });
      })
  }
}

// Get User's Posts
export const getUserPostsAction = (userId) => {
  return (dispatch) => {
    api.GET_WITHOUT_AUTH(`${Constants.GET_POSTS_URL}?userId=${userId}`)
      .then((res, error) => {
        if (error) {
          dispatch({ type: Constants.USERS.ERROR, msg: error });
        } else if (res.status === 200) {
          dispatch({ type: Constants.USERS.GET_POSTS, payload: res.data });
        } else {
          dispatch({ type: Constants.USERS.ERROR, msg: { msg: "Can't get user's posts from api" } });
        }
      }).catch((error) => {
        const msg = { msg: "Can't get user's posts from api" };
        dispatch({ type: Constants.USERS.ERROR, msg });
      })
  }
}

// Get User's Albums
export const getUserAlbumsAction = (userId) => {
  return (dispatch) => {
    api.GET_WITHOUT_AUTH(`${Constants.GET_ALBUMS_URL}?userId=${userId}`)
      .then((res, error) => {
        if (error) {
          dispatch({ type: Constants.USERS.ERROR, msg: error });
        } else if (res.status === 200) {
          dispatch({ type: Constants.USERS.GET_ALBUMS, payload: res.data });
        } else {
          dispatch({ type: Constants.USERS.ERROR, msg: { msg: "Can't get user's photos from api" } });
        }
      }).catch((error) => {
        const msg = { msg: "Can't get user's photos from api" };
        dispatch({ type: Constants.USERS.ERROR, msg });
      })
  }
}

// Get User's Todolist
export const getUserTodosAction = (userId) => {
  return (dispatch) => {
    api.GET_WITHOUT_AUTH(`${Constants.GET_TODOS_URL}?userId=${userId}`)
      .then((res, error) => {
        if (error) {
          dispatch({ type: Constants.USERS.ERROR, msg: error });
        } else if (res.status === 200) {
          dispatch({ type: Constants.USERS.GET_TODOS, payload: res.data });
        } else {
          dispatch({ type: Constants.USERS.ERROR, msg: { msg: "Can't get users from api" } });
        }
      }).catch((error) => {
        const msg = { msg: "Can't get users from api" };
        dispatch({ type: Constants.USERS.ERROR, msg });
      })
  }
}


/* PHOTO ACTION SECTION */
export const getPhotosAction = () => {
  return (dispatch) => {
    api.GET_WITHOUT_AUTH(Constants.GET_PHOTOS_URL)
      .then((res, error) => {
        if (error) {
          dispatch({ type: Constants.PHOTOS.ERROR, msg: error });
        } else if (res.status === 200) {
          dispatch({ type: Constants.PHOTOS.GET, payload: res.data });
        } else {
          dispatch({ type: Constants.USERS.ERROR, msg: { msg: "Can't get users from api" } });
        }
      }).catch((error) => {
        const msg = { msg: "Can't get users from api" };
        dispatch({ type: Constants.USERS.ERROR, msg });
      })
  }
}

export const getPhotosByAlbumIdAction = (albumId) => {
  return (dispatch) => {
    api.GET_WITHOUT_AUTH(`${Constants.GET_ALBUMS_URL}/${albumId}/photos`)
      .then((res, error) => {
        if (error) {
          dispatch({ type: Constants.PHOTOS.ERROR, msg: error });
        } else if (res.status === 200) {
          dispatch({ type: Constants.PHOTOS.GET, payload: res.data });
        } else {
          dispatch({ type: Constants.USERS.ERROR, msg: { msg: "Can't get users from api" } });
        }
      }).catch((error) => {
        const msg = { msg: "Can't get users from api" };
        dispatch({ type: Constants.USERS.ERROR, msg });
      })
  }
}

export const addPhotoAction = (data) => {
  return (dispatch) => {
    return api.POST_WITHOUT_AUTH(`${Constants.GET_PHOTOS_URL}`, data)
      .then((res, error) => {
        if (error) {
          dispatch({ type: Constants.PHOTOS.ERROR, msg: error });
          return { success: false, data: error };
        }
        if (res.status >= 200 && res.status < 300) {
          dispatch({ type: Constants.PHOTOS.ADD, payload: res.data });
          return { success: true, data: { msg: 'Successfully saved!' } };
        }
        const msg = { msg: "Can't add photo from api" };
        dispatch({ type: Constants.PHOTOS.ERROR, msg });
        return { success: false, data: msg };
      }).catch((error) => {
        const msg = { msg: "Can't add photo from api" };
        dispatch({ type: Constants.USERS.ERROR, msg });
      })
  }
}

export const updatePhotoAction = (data) => {
  return (dispatch) => {
    return api.UPDATE_WITHOUT_AUTH(`${Constants.GET_PHOTOS_URL}/${data.id}`, data)
      .then((res, error) => {
        if (error) {
          dispatch({ type: Constants.PHOTOS.ERROR, msg: error });
          return { success: false, data: error };
        } if (res.status === 200) {
          dispatch({ type: Constants.PHOTOS.UPDATE, payload: res.data });
          return { success: true, data: { msg: 'Successfully updated!' } };
        }
        const msg = { msg: "Can't update photos from api" };
        dispatch({ type: Constants.PHOTOS.ERROR, msg });
        return { success: false, data: msg };
      }).catch((error) => {
        const msg = { msg: "Can't update photos from api" };
        dispatch({ type: Constants.USERS.ERROR, msg });
      })
  }
}

/* POSTS ACTION SECTION */
export const getPostsAction = () => {
  return (dispatch) => {
    api.GET_WITHOUT_AUTH(Constants.GET_POSTS_URL)
      .then((res, error) => {
        if (error) {
          dispatch({ type: Constants.POSTS.ERROR, msg: error });
        } else if (res.status === 200) {
          dispatch({ type: Constants.POSTS.GET, payload: res.data });
        } else {
          dispatch({ type: Constants.POSTS.ERROR, msg: { msg: "Can't get users from api" } });
        }
      }).catch((error) => {
        const msg = { msg: "Can't get users from api" };
        dispatch({ type: Constants.USERS.ERROR, msg });
      })
  }
}

export const addPostAction = (data) => {
  return (dispatch) => {
    return api.POST_WITHOUT_AUTH(`${Constants.GET_POSTS_URL}`, data)
      .then((res, error) => {
        if (error) {
          dispatch({ type: Constants.POSTS.ERROR, msg: error });
          return { success: false, data: error };
        }
        if (res.status >= 200 && res.status < 300) {
          dispatch({ type: Constants.POSTS.ADD, payload: res.data });
          return { success: true, data: { msg: 'Successfully saved!' } };
        }
        const msg = { msg: "Can't get posts from api" };
        dispatch({ type: Constants.POSTS.ERROR, msg });
        return { success: false, data: msg };
      }).catch(() => {
        const msg = { msg: "Can't get posts from api" };
        dispatch({ type: Constants.USERS.ERROR, msg });
      })
  }
}

export const updatePostAction = (data) => {
  return (dispatch) => {
    return api.UPDATE_WITHOUT_AUTH(`${Constants.GET_POSTS_URL}/${data.id}`, data)
      .then((res, error) => {
        if (error) {
          dispatch({ type: Constants.POSTS.ERROR, msg: error });
          return { success: false, data: error };
        }
        if (res.status === 200) {
          dispatch({ type: Constants.POSTS.UPDATE, payload: res.data });
          return { success: true, data: { msg: 'Successfully updated!' } };
        }
        const msg = { msg: "Can't get posts from api" };
        dispatch({ type: Constants.POSTS.ERROR, msg });
        return { success: false, data: msg };
      }).catch(() => {
        const msg = { msg: "Can't get posts from api" };
        dispatch({ type: Constants.USERS.ERROR, msg });
      })
  }
}

/* TODOS ACTION SECTION */
export const getTodosAction = () => {
  return (dispatch) => {
    api.GET_WITHOUT_AUTH(Constants.GET_TODOS_URL)
      .then((res, error) => {
        if (error) {
          dispatch({ type: Constants.TODOS.ERROR, msg: error });
        } else if (res.status === 200) {
          dispatch({ type: Constants.TODOS.GET, payload: res.data });
        } else {
          dispatch({ type: Constants.TODOS.ERROR, msg: { msg: "Can't get users from api" } });
        }
      }).catch(() => {
        const msg = { msg: "Can't get users from api" };
        dispatch({ type: Constants.USERS.ERROR, msg });
      })
  }
}

export const addTodoAction = (data) => {
  return (dispatch) => {
    return api.POST_WITHOUT_AUTH(`${Constants.GET_TODOS_URL}`, data)
      .then((res, error) => {
        if (error) {
          dispatch({ type: Constants.TODOS.ERROR, msg: error });
          return { success: false, data: error };
        }
        if (res.status >= 200 && res.status < 300) {
          dispatch({ type: Constants.TODOS.ADD, payload: res.data });
          return { success: true, data: { msg: 'Successfully saved!' } };
        }
        const msg = { msg: "Can't add task from api" };
        dispatch({ type: Constants.TODOS.ERROR, msg });
        return { success: false, data: msg };
      }).catch(() => {
        const msg = { msg: "Can't add task from api" };
        dispatch({ type: Constants.USERS.ERROR, msg });
      })
  }
}

export const updateTodoAction = (data) => {
  return (dispatch) => {
    return api.UPDATE_WITHOUT_AUTH(`${Constants.GET_TODOS_URL}/${data.id}`, data)
      .then((res, error) => {
        if (error) {
          dispatch({ type: Constants.TODOS.ERROR, msg: error });
          return { success: false, data: error };
        } if (res.status === 200) {
          dispatch({ type: Constants.TODOS.UPDATE, payload: res.data });
          return { success: true, data: { msg: 'Successfully updated!' } };
        }
        const msg = { msg: "Can't get a todo list from api" };
        dispatch({ type: Constants.TODOS.ERROR, msg });
        return { success: false, data: msg };
      }).catch(() => {
        const msg = { msg: "Can't get a todo list from api" };
        dispatch({ type: Constants.USERS.ERROR, msg });
      })
  }
}

/* ALBUMS SECTION */
export const getAlbumsAction = () => {
  return (dispatch) => {
    api.GET_WITHOUT_AUTH(Constants.GET_ALBUMS_URL)
      .then((res, error) => {
        if (error) {
          dispatch({ type: Constants.ALBUMS.ERROR, msg: error });
        } else if (res.status === 200) {
          dispatch({ type: Constants.ALBUMS.GET, payload: res.data });
        } else {
          dispatch({ type: Constants.ALBUMS.ERROR, msg: { msg: "Can't get albums from api" } });
        }
      }).catch(() => {
        const msg = { msg: "Can't get albums from api" };
        dispatch({ type: Constants.USERS.ERROR, msg });
      })
  }
}
