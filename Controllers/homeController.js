const Users = require('../Models/users')
class HomeController {
    async displayHome(ctx) {
        return ctx.render('index')
    }
}
module.exports = new HomeController