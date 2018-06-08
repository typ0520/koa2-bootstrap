const router = require('koa-router')()
const User = require('../models').User
const logger = require('../utils/logger')

router.prefix('/users')

/**
curl -X GET http://localhost:8080/users -H 'authorization: Bearer token' -H 'cache-control: no-cache'
 */
router.get('/', async (ctx) => {
  ctx.body = await User.findAll()
})

router.get('/:id', async (ctx) => {
  ctx.body = await User.findOne({
    where: {
      id: ctx.params.id
    }
  })
})

router.delete('/:id', async (ctx) => {  
  if (ctx.params.id !== ctx.state.user.id) {
    ctx.status = 403;
    ctx.body = {
        message: '没有权限'
    }
    return;
  }
  await User.destroy({
    where: {
      id: ctx.params.id
    }
  })
  ctx.body = {
    code: 1,
    massage: '操作成功'
  }
})

router.post('/', async (ctx) => {
  if (ctx.params.id !== ctx.state.user.id) {
    ctx.status = 403;
    ctx.body = {
        message: '没有权限'
    }
    return;
  }
  const form = (typeof ctx.request.body === 'object') ? ctx.request.body : JSON.parse(ctx.request.body)
  console.debug(form)
  User.create(form)
  ctx.body = {
    code: 1,
    massage: '操作成功'
  }
})

router.put('/:id', async (ctx) => {
  if (ctx.params.id !== ctx.state.user.id) {
    ctx.status = 403;
    ctx.body = {
        message: '没有权限'
    }
    return;
  }
  const form = (typeof ctx.request.body === 'object') ? ctx.request.body : JSON.parse(ctx.request.body)
  const user = await User.findOne({
    where: {
      id: ctx.params.id
    }
  })
  if (user) {
    await user.update(form)
  }
  ctx.body = {
    code: 1,
    massage: '操作成功'
  }
})

module.exports = router
