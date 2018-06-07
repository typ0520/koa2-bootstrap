const router = require('koa-router')()

router.prefix('/users')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

router.get('/:id', function (ctx, next) {
  console.log(ctx.params.id)
  ctx.body = 'this is a users/:id response!'
})

module.exports = router
