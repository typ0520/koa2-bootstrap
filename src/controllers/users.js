const router = require('koa-router')()
const User = require('../models').User
const logger = require('../utils/logger')

router.prefix('/users')

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
  await User.destroy({
    where: {
      id: ctx.params.id
    }
  })
  ctx.body = {
    status: 1,
    msg: '操作成功'
  }
})

router.post('/', async (ctx) => {
  const form = (typeof ctx.request.body === 'object') ? ctx.request.body : JSON.parse(ctx.request.body)
  console.debug(form)
  User.create(form)
  ctx.body = {
    status: 1,
    msg: '操作成功'
  }
})

router.put('/:id', async (ctx) => {
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
    status: 1,
    msg: '操作成功'
  }
})

module.exports = router
