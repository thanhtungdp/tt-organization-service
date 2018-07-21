const { router, get, withNamespace } = require('microrouter')
const { handleErrors } = require('@bit/tungtung.micro.components.micro-boom')
const config = require('config')

const namespace = withNamespace(`/${config.serviceName}`)

module.exports = router(
  namespace(
    get(
      '/:slug',
      handleErrors(req => ({
        name: req.params.slug,
        slug: req.params.slug,
        dbInfo: process.env.IS_DOCKER
          ? 'mongodb://mongo:27017/micro-user'
          : 'mongodb://localhost:27017/micro-user'
      }))
    ),
    get('/*', () => config.serviceName)
  ),
  get('/health', () => 'Working...'),
  get('/*', () => config.serviceName)
)
