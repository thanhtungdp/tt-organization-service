const { Schema } = require('mongoose')
const createModel = require('@bit/tungtung.micro.components.mongo/createModel')
const { slug } = require('@bit/tungtung.micro.components.mongo-slug')
const config = require('config')

const OrganizationSchema = new Schema({
  name: String,
  slug: String,
  description: String,
  searchField: String,
  domain: String,
  email: String,
  createdAt: {
    type: Date,
    default: Date.now()
  },
  updatedAt: {
    type: Date,
    default: Date.now()
  }
})

OrganizationSchema.methods.withDbInfo = function () {
  return {
    ...this.toObject(),
    dbInfo: config.mongodbCustomer + '/' + config.prefixDb + this.slug
  }
}

OrganizationSchema.virtual('id').get(function () {
  return this._id
})

OrganizationSchema.set('toJSON', { virtuals: true })

module.exports = createModel(
  {
    name: 'organization',
    schema: OrganizationSchema
  },
  {
    checkExists: function (query) {
      return this.findOne(query)
    },

    getOne: function (query) {
      return this.findOne(query)
    },

    create: function (data) {
      const organization = new this(data)
      if (!data.slug) {
        organization.slug = slug(data.name, false)
      }
      organization.searchField = slug(data.name, false, ' ')
      return organization.save()
    },

    updateOne: function (query = {}, data) {
      return this.findOneAndUpdate(
        query,
        {
          $set: {
            ...data,
            searchField: slug(data.name, false, ' '),
            updateAt: Date.now()
          }
        },
        { new: true }
      )
    }
  }
)
