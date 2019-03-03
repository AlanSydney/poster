/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */

import { AsyncStorage } from 'react-native';

const saveUserData = data => new Promise((resolve, reject) => {
  const newData = JSON.stringify(data);
  try {
    const value = AsyncStorage.setItem('last_visited_user', newData)
    console.log('Asycn save user: ', newData, value)
    resolve(value);
  } catch (e) {
    // Error retrieving data
    console.log({ from: 'error from saveUserData async store', e });
    reject(e)
  }
})

const getUserData = () => new Promise((resolve, reject) => {
  try {
    const value = AsyncStorage.getItem('last_visited_user');
    resolve(value)
  } catch (e) {
    // Error retrieving data
    console.log({ from: 'error from getUserData async store', e });
    reject(e)
  }
})

export {
  saveUserData,
  getUserData
}
