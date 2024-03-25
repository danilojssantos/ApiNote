const path = require("path")
//path resolve o problema do caminho dos sistema operacionais
module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: path(__dirname,"src", "database", "database.db")
    },
    useNullasDefault: true
 
  }

};
