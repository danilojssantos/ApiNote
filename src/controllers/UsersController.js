/*
controle pode ter ate 5 função
1 index - get para listar varios registro
2 show  - GET para exibir um registro especifico
3 create - POST para criar um registro
4 UPDATE - PUT para atualizar um registro
5 DELETE - DELETE para remover  um registro
*/
class UsersController {
    create(request, response){
        const {name, email, password} = request.body
        response.json({name, email, password});
    }
}


module.exports = UsersController;