const Model = require('objection').Model

class Users extends Model {
  static get tableName() {
    return 'users'
  }
}
module.exports = Users