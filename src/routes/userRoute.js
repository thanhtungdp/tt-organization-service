const Organization = require('models/Organization')
const { json } = require('micro')
const Joi = require('joi')
const boom = require('boom')
const validation = require('@bit/tungtung.micro.components.micro-joi')
const authService = require('components/auth-service')

module.exports = {
  register: validation(
    Joi.object({
      name: Joi.string().required(),
      description: Joi.string(),
      slug: Joi.string().required(),
      email: Joi.string().email().required(),
      fullname: Joi.string().required(),
      username: Joi.string().required(),
      password: Joi.string().required()
    })
  )(async req => {
    const body = await json(req)
    const isExists = await Organization.findOne({
      $or: [{ name: body.name }, { slug: body.slug }]
    })
    if (isExists) {
      throw boom.notAcceptable('ORGANIZATION_IS_EXISTS')
    }
    const organization = await Organization.create(body)
    await organization.save()
    const domain = `${organization.slug}.localhost.vn`
    const userRegister = await authService.register(
      {
        Origin: domain,
        Host: domain
      },
      {
        email: body.email,
        username: body.username,
        password: body.password,
        fullname: body.fullname,
        role: 0
      }
    )
    return { organization, userRegister: { ...userRegister, password: -1 } }
  })
}
