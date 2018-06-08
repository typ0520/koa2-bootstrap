const router = require('koa-router')()
const ping = require('../controllers/ping')
const user = require('../controllers/users')
const account = require('../controllers/account')

router.use(account.routes(), account.allowedMethods())
router.use(ping.routes(), ping.allowedMethods())
router.use(user.routes(), user.allowedMethods())

module.exports = function(app) {
  app.use(router.routes(), router.allowedMethods())
}

//module.exports = router
