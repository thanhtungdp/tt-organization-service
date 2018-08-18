const axios = require('axios')

const customAxios = func => (url, ...args) => {
  return new Promise((resolve, reject) => {
    func(url, ...args)
      .then(({ data, status }) => {
        resolve({ data, status, success: true })
      })
      .catch(e => {
        if (e.response) {
          const { data, status } = e.response
          resolve({ data, status, error: true })
        } else {
          reject(e)
        }
      })
  })
}

module.exports = {
  get: (url, ...args) => customAxios(axios.get)(url, ...args),
  post: (url, data, ...args) => customAxios(axios.post)(url, data, ...args),
  put: (url, data, ...args) => customAxios(axios.put)(url, data, ...args),
  delete: (url, ...args) => customAxios(axios.delete)(url, ...args)
}
