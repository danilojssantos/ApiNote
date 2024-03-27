const path = require("path")
//path resolve o problema do caminho dos sistema operacionais
module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: path.resolve(__dirname,"src", "database", "database.db")
    },
    pool: {
                           // await knex.raw('PRAGMA foreign_keys = ON');
        afterCreate: (conn, cb) => conn.run("PRAGMA foreign_keys = ON", cb)
        
    },
    migrations: {
      directory: path.resolve(__dirname,"src","database","knex","migrations")
    },

    useNullAsDefault: true
 
  }

};
