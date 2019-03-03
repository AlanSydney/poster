import { createStore, applyMiddleware, compose } from 'redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native
import reducers from '../reducers'

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['mapReducer'],
  debug: true
}

/* eslint-disable-next-line no-undef */
const loggerMiddleware = createLogger({ predicate: () => __DEV__ })
const persistedReducer = persistReducer(persistConfig, reducers)

const enhancer = compose(
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware,
  )
)

const store = createStore(persistedReducer, enhancer)
const persistor = persistStore(store)

export default {
  store,
  persistor
}
