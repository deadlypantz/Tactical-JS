module.exports = (app) => {
  const bookshelf = app.get('bookshelf');
  const Users = bookshelf.Model.extend({
        tableName: 'users'
  }) ;
  return Users;
};