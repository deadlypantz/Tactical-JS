
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', (t) => {
      t.increments()
      t.string('username', 50).notNull()
      t.string('password', 100).notNull()
      t.string('email').notNull()
      t.unique('email')
      t.unique('username')
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users')
}
