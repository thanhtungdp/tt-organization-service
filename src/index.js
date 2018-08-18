const { router, get, post, withNamespace } = require('microrouter')
const { handleErrors } = require('@bit/tungtung.micro.components.micro-boom')
const { connect } = require('@bit/tungtung.micro.components.mongo')
const config = require('./config')
const userRoute = require('./routes/userRoute')
const internalRoute = require('./routes/internalRoute')

const namespace = withNamespace(`/${config.serviceName}`)
const publicNamespace = withNamespace(`/${config.serviceName}/public`)

connect(config.mongodbUrl)

module.exports = router(
  publicNamespace(
    get('/', () => 'public'),
    post('/register', handleErrors(userRoute.register))
  ),
  namespace(get('/*', () => config.serviceName)),
  get('/health', () => 'Working...'),
  get('/:slug', handleErrors(internalRoute.getOrganization)),
  get('/*', () => config.serviceName)
)
