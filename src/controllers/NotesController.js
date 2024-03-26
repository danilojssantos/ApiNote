const knex = require("../database/knex")

class NotesController{
    async create(request, response){
        //destrutura oque vem da request (requesição)
        const{ title, description, tags, links} = request.body;
        //pega o ifd que foi passado na url
        const {user_id} = request.params;
        //faz o insert no banco e pega a mesmo tempo id da nota
        const note_id = await knex("notes").insert({
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

        return response.json(note);



    }
}

module.exports = NotesController;