module.exports =(app) => {
    //example of model inclusion is bellow commented out.
    // const bookshelf = app.get('bookshelf');
    // const users = new require('../Models/users')(app);
    this.displayHome = (req, res) => {
        res.render('index.twig', {
            'test': 'hi there friend.'
        });
    };
    return this;
}