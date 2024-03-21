const sqliteConnection = require('../../sqlite')
const createUsers = require('./createUsers')

async function migrationsRun(){
    //schema sao tabelas que banco ira ter
    const schemas =[
        createUsers
    ].join('');
    //executa as migrations
    sqliteConnection().then(db =>db.exec(schemas)).catch(error => console.error(error));

}

module.exports = migrationsRun;
