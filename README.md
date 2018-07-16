# Guideline

## Use rabbitMQ

1. Publish

```javascript
const publish = require('components/amqp/publish')
publish('USER_UPDATED', data)
```

2. Subscribe

```javascript
const subscribe = require('components/amqp/publish')
subscribe({
  'USER_UPDATED': (data) => {
    // handle(data)
  },
  // ... more event listen
})

```

3. Sample `amqp-test`

```javascript
require('dotenv').config()
const subscribe = require('components/amqp/subscribe')

subscribe({
  'USER_UPDATED': user => {
    console.log(user)
  }
})
```
