const express = require("express");

const routes = require("./routes")


//iniciando o express
const app = express()

app.use(express.json())


app.use(routes)

/*app.get("/message/:id/:user", (request, response)=>{
    //destruturação 

    const { id, user }= request.params
    response.send(`
    ID da mensgem ${id}
    para o Usuario ${user}`)
}) */



const PORT = 3333
app.listen(PORT, () => console.log(`Server rodando na Porta ${PORT}`))