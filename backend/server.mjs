import { createServer } from "node:http";
import { Router } from "./router.mjs";
import { customRequest } from "./custom-request.mjs";

const router = new Router()
function getProdutos(){
    console.log('hello world')
}
function postProdutos(req,res){
    console.log('hello world post')
    console.log(req.body)
}
router.get('/produtos',getProdutos)
router.post('/produtos',postProdutos)

const server = createServer(async(request,response) =>{
    const req = await customRequest(request)
    const handler = router.routes[req.method][req.pathname]

    if(handler){
        handler(req,response)
    }else{
        console.log('nenhuma rota encontrada')
    }

})

server.listen(3001,() =>{
    console.log('servidor rodando na porta 3000')
})