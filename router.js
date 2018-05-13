module.exports = (app) => {
    const Router = require('koa-router')
    const router = new Router
    const HomeController = require('./Controllers/homeController')
    router.get('/', HomeController.displayHome)
    app.use(router.routes()).use(router.allowedMethods())

}