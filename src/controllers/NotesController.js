const knex = require("../database/knex")

class NotesController{
    async create(request, response){
        //destrutura oque vem da request (requesição)
        const{ title, description, tags, links} = request.body;
        //pega o ifd que foi passado na url
        const {user_id} = request.params;
        //faz o insert no banco e pega a mesmo tempo id da nota
        const [note_id] = await knex("notes").insert({
            title,
            description,
            user_id
        });

        const linksInsert = links.map(link =>{
            return{
                note_id,
                url: link
            }
        });
      await knex("links").insert(linksInsert) 

      const tagsInsert = tags.map(name=>{
            return{
                note_id,
                name,
                user_id
            }

      });
      await knex("tags").insert(tagsInsert);

      response.json();


      
       
    }
    async show(request, response){
        //recupera o id que vem atraves da request
        const { id } = request.params;
        //selecionada a nota pengando baseado no id que vem request
        const note = await knex("notes").where({ id }).first();
        // seleciona a tags banseado no id notes ordenando por name
        const tags = await knex("tags").where({note_id: id}).orderBy("name");

        const links = await knex("links").where({note_id: id}).orderBy("created_at");


        return response.json({
            ...note,
            tags,
            links


        });



    }

    async delete(request, response){
        //pegar o valor do id por parametro
        const { id } = request.params
        //deleta do banco de acordo com id passado
        await knex("notes").where({id}).delete()
        

        return response.json();

    }

    async index(request, response){
        // recebe o valor usuario por query
        const { title, user_id } = request.query
        //busca no todas a notes de unico usuario e ordena por titulo
        const notes = await knex("notes")
        .where({user_id})
        .whereLike("title",`%${title}%`) //like busca palavra no bd , procentagem antes e depois 
        .orderBy("title");

        return response.json(notes);

    }
}

module.exports = NotesController;