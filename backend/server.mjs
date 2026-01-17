import { createServer } from "node:http";
import { Router } from "./router.mjs";

const router = new Router()
function getProdutos(){
    console.log('hello world')
}
router.get('/produtos',getProdutos)

const server = createServer((request,response) =>{
    const url = new URL(request.url,'http://localhost')
    const handler = router.routes[request.method][url.pathname]

    if(handler){
        handler(request,response)
    }else{
        console.log('nenhuma rota encontrada')
    }

})

server.listen(3001,() =>{
    console.log('servidor rodando na porta 3000')
})