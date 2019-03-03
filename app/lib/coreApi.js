/* eslint-disable no-console */
import { Constants } from './constants';

const domainUrl = Constants.BASE_URL;

export default {
  GET: (urlPath, token) => new Promise((resolve, reject) => {
    const url = domainUrl + urlPath
    fetch(url, {
      async: true,
      crossDomain: true,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Cache-Control': 'no-cache'
      }
    }).then(response => response.json())
      .then((responseText) => {
        resolve(responseText)
      })
      .catch((error) => {
        reject(error)
      });
  }),

  POST: (urlPath, token, data) => new Promise((resolve, reject) => {
    const url = domainUrl + urlPath
    fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(response => response.json())
      .then((responseText) => {
        resolve(responseText);
      })
      .catch((error) => {
        reject(error);
      });
  }),

  GET_WITH_API_KEY: (urlPath, xApiKey) => new Promise((resolve, reject) => {
    const url = urlPath;
    fetch(url, {
      method: 'GET',
      headers: {
        'x-api-key': xApiKey
      }
    }).then((response) => {
      return response.json()
        .then((res) => {
          return { status: response.status, data: res };
        })
    })
      .then((responseText) => {
        resolve(responseText)
      })
      .catch((error) => {
        reject(error)
      });
  }),

  GET_WITHOUT_AUTH: urlPath => new Promise((resolve, reject) => {
    const url = domainUrl + urlPath
    fetch(url, {
      method: 'GET'
    }).then((response) => {
      return response.json()
        .then((res) => {
          return { status: response.status, data: res };
        })
    })
      .then((responseText) => {
        resolve(responseText)
      })
      .catch((error) => {
        reject(error)
      });
  }),

  POST_WITHOUT_AUTH: (urlPath, data) => new Promise((resolve, reject) => {
    const url = domainUrl + urlPath
    console.log('POST_WITHOUT_TOKEN', { url, data })
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then((response) => {
      return response.json()
        .then((res) => {
          return { status: response.status, data: res };
        })
    })
      .then((responseText) => {
        resolve(responseText);
      })
      .catch((error) => {
        reject(error);
      });
  }),

  UPDATE_WITHOUT_AUTH: (urlPath, data) => new Promise((resolve, reject) => {
    const url = domainUrl + urlPath

    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then((response) => {
      return response.json()
        .then((res) => {
          return { status: response.status, data: res };
        })
    })
      .then((responseText) => {
        resolve(responseText);
      })
      .catch((error) => {
        reject(error);
      });
  })

  // POST_WITH_AUTH: (urlPath,token,data) => new Promise((resolve, reject) => {
  //   const url = domainUrl + urlPath
  //   console.log('POST_WITH', {url,token})
  //   fetch(url, {
  //     method: 'POST',
  //     headers: {
  //       'Authorization': `Bearer ${token}`,
  //       'Content-type': 'application/json'
  //     },
  //     body: JSON.stringify(data)
  //   }).then((response) => {
  //     console.log('$$: ', response)
  //     response.json()
  //     .then((responseText) => {
  //       console.log('$$ response: ', responseText)
  //       resolve(responseText);
  //     });
  //   })
  //   .catch((error) => {
  //     reject(error);
  //   });
  // })
}
