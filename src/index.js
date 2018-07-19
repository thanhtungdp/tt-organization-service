const { router, get, withNamespace } = require('microrouter')
const { handleErrors } = require('@bit/tungtung.micro.components.micro-boom')
const config = require('config')
const faker = require('faker')

const namespace = withNamespace(`/${config.serviceName}`)

module.exports = router(
  namespace(
    get('/fake', () => {
      return faker.name.findName()
    }),
    get('/test', handleErrors(() => 'Welcome clean service')),
    get('/*', () => config.serviceName)
  ),
  get('/health', () => 'Working...'),
  get('/*', () => config.serviceName)
)
