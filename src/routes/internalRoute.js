const Organization = require('models/Organization')
const boom = require('boom')

module.exports = {
  getOrganization: async req => {
    const { slug } = req.params
    const organization = await Organization.findOne({ slug })
    if (!organization) {
      throw boom.notFound('NOT_FOUND_ORGANIZATION')
    }
    return organization.withDbInfo()
  }
}
