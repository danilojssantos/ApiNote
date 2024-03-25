/*
controle pode ter ate 5 função
1 index - get para listar varios registro
2 show  - GET para exibir um registro especifico
3 create - POST para criar um registro
4 UPDATE - PUT para atualizar um registro
5 DELETE - DELETE para remover  um registro
*/
const { hash, compare } = require("bcryptjs")
const AppError = require("../utils/AppError")
const sqliteConnection = require("../database/sqlite")
class UsersController {
    async create(request, response) {
        const { name, email, password } = request.body
        //conecta no banco
        const database = await sqliteConnection();
        //consulta no banco e atribuir o resultado para uma const
        const checkUserExists = await database.get("SELECT * FROM users WHERE email = (?)", [email])

        //se o email existir no banco retorna uma mensagem
        if (checkUserExists) {
            throw new AppError("Este email já existe");
        }
        //criptografando a senha -- passa 2 paramentros a senha o salt(nivel da cripto)
        // precisa usar await para poder esperar gerar cripto para depois salvar 
        const hashPassword = await hash(password, 8)

        await database.run(
            "INSERT INTO users (name, email,password) values (?,?,?)",
            [name, email, hashPassword]
        );
        //caso nao exista o email return o staus 201 create
        return response.status(201).json()
    }

    async update(request, response) {
        //destrutura 
        const { name, email, password, old_password } = request.body;
        //pega id passado na url passa como paramentro
        const { id } = request.params;
        //conecta com o banco de dados
        const database = await sqliteConnection()
        //consulta a tabela user pelo id que vem paramentro
        const user = await database.get("SELECT * FROM users WHERE id = (?)", [id]);


        //valida se id passado esta no Banco
        if (!user) {
            throw new AppError("Usuario não encontrado")
        }

        //consulta para pegar o email e ver se mesmo que ja esta no BD
        const userWithUpdateEmail = await database.get("SELECT * FROM users WHERE email = (?)", [email]);

        //valisa se email que esta sendo atulizado ja se encontra no banco
        //caso ja tenha apresenta o error
        if (userWithUpdateEmail && userWithUpdateEmail.id != id) {
            throw new AppError("Este e-mail já está em uso")
        }
        //paga user.name e recebe valor passado 
        user.name = name;
        //paga user.email e recebe valor passado 
        user.email = email;
        //verificando o password
        if (password && !old_password) {
            throw new AppError("Você precisa informar a senha antiga para definir a nova senha")
        }

        if (password && old_password) {
            const checkOldPassword = await compare(old_password, user.password)



            if (!checkOldPassword) {
                throw new AppError("A senha não confere")
            }



            user.password = await hash(password, 8)

        }


        //faz update na tabela 
        await database.run(`
            UPDATE users SET
            name = ?,
            email = ?,
            password = ?,
            update_at = ?
            WHERE id = ?`,
            [user.name, user.email, user.password, new Date(), id]
        );

        return response.json();

    }
}





module.exports = UsersController;