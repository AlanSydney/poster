import React from 'react';
import { StatusBar, View } from 'react-native';
import { Provider } from 'react-redux';
import { Provider as AntProvider } from '@ant-design/react-native';
import { PersistGate } from 'redux-persist/integration/react';
import MainStack from './navigators/mainstack';
import getConfig from './store';

const { store } = getConfig;
const { persistor } = getConfig;

export default class Root extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <View style={{ flex: 1 }}>
            <StatusBar
              backgroundColor="#d4405a"
              barStyle="light-content"
            />
            <AntProvider>
              <MainStack />
            </AntProvider>
          </View>
        </PersistGate>
      </Provider>
    )
  }
}
