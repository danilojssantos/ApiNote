//esse import e resposavel pelo DRIVE
const sqlite3 = require("sqlite3");

//esse import responsavel para conectar
const sqlite = require("sqlite");

//path resolve o endereço de acorda com Sistema Operacional 
const path = require("path");
//verifica se esxiste o arquivo se nao tiver ele cria por issp async
async function sqliteConnection(){
    const database = await sqlite.open({
        //cria um arquivo na pasta database
        filename: path.resolve(__dirname,"..","database.db"),
        driver: sqlite3.Database
    });

    return database;
   
}

module.exports = sqliteConnection;