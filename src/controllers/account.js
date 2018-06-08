const router = require('koa-router')()
const User = require('../models').User
const logger = require('../utils/logger')
const bcrypt = require('bcrypt')
const jsonwebtoken = require('jsonwebtoken')
const config = require('../../config')

/**
 curl -X POST http://localhost:8080/login -H 'cache-control: no-cache' -H 'content-type: application/x-www-form-urlencoded' -d 'username=typ0520&password=123456'
 */
router.post('/login', async (ctx) => {
    const { body } = ctx.request;
    try {
        let user = await User.findOne({
            where: {
                username: body.username
            }
        })
        if (!user) {
            ctx.status = 401;
            ctx.body = {
                message: '用户名错误'
            }
            return;
        }
        // 匹配密码是否相等
        if (await bcrypt.compare(body.password, user.password)) {
            user.password = null;
            ctx.status = 200;
            ctx.body = {
                message: '登录成功',
                user: user,
                // 生成 token 返回给客户端
                token: jsonwebtoken.sign({
                    data: user,
                    // 设置 token 过期时间
                    exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60), // 60 seconds * 60 minutes = 1 hour * 24 = 1 天
                }, config.secret)
            }
        } else {
            ctx.status = 401;
            ctx.body = {
                message: '密码错误',
            }
        }
    } catch (error) {
        ctx.throw(500);
    }
})

/**
 curl -X POST http://localhost:8080/register -H 'cache-control: no-cache' -H 'content-type: application/x-www-form-urlencoded' -d 'username=typ0520&password=123456'
 */
router.post('/register', async (ctx) => {
    const { body } = ctx.request;
    try {
        if (!body.username || !body.password) {
            ctx.status = 400;
            ctx.body = {
                error: `expected an object with username, password but got: ${body}`,
            }
            return;
        }
        body.password = await bcrypt.hash(body.password, 5);
        let user = await User.findOne({
            where: {
                username: body.username
            }
        })
        if (!user) {
            const newUser = new User(body);
            user = await newUser.save();
            ctx.status = 200;
            ctx.body = {
                message: '注册成功',
                user,
            }
        } else {
            ctx.status = 406;
            ctx.body = {
                message: '用户名已经存在',
            }
        }
    } catch (error) {
        ctx.throw(500);
    }
})
module.exports = router