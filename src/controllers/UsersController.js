/*
controle pode ter ate 5 função
1 index - get para listar varios registro
2 show  - GET para exibir um registro especifico
3 create - POST para criar um registro
4 UPDATE - PUT para atualizar um registro
5 DELETE - DELETE para remover  um registro
*/

const AppError = require("../utils/AppError")
const sqliteConnection = require("../database/sqlite")
class UsersController {
   async create(request, response){
        const {name, email, password} = request.body
        //conecta no banco
        const database = await sqliteConnection();
        //consulta no banco e atribuir o resultado para uma const
        const checkUserExists = await database.get("SELECT * FROM users WHERE email = (?)",[email])

        //se o email existir no banco retorna uma mensagem
        if(checkUserExists){
            throw new AppError("Este email já existe");
        }


        await database.run(
            "INSERT INTO users (name, email,password) values (?,?,?)",
            [name, email, password]
        );
        //caso nao exista o email return o staus 201 create
        return response.status(201).json()
    }
}


module.exports = UsersController;