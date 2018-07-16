const { router, get } = require('microrouter')
const { handleErrors } = require('@bit/tungtung.micro.components.micro-boom')

module.exports = router(
  get('/test', handleErrors((req, res) => 'Welcome clean service')),
  get('/health', () => 'Working...')
)
