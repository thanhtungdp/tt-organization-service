const axios = require('../axios')
const boom = require('boom')

function getUrl (path = '/') {
  return process.env.AUTH_SERVICE + path
}

module.exports = {
  register: async (headers, data) => {
    const { error, success, data: user } = await axios.post(
      getUrl(`/auth/register`),
      data,
      { headers: headers }
    )
    if (success) return user
    if (error) {
      throw boom.notAcceptable(user.message, user)
    }
  }
}
