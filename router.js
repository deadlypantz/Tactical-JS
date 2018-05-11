module.exports = (app) => { 
    const homeController = require('./Controllers/homeController')(app);
    app.get('/', homeController.displayHome);
};