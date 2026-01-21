import { getProductsCart } from "./fetchProductsCart.js"

export async function deleteProduto(removerElemento){
    removerElemento.forEach((item,index) =>{
        item.addEventListener('click',() =>{

            remover(item.dataset.remover)
        })
    })
    async function remover(id){
        console.log(id)
        try{

            const response = await fetch('http://localhost:3001/produtos/cart/delete',{
                method:"DELETE",
                headers:{
                    'Content-Type':"application/json"
                },
                body:JSON.stringify({id:id})
            })
            const dados = await response.json()
        }catch{
            console.log('Erro ao deletar o produto')
        }finally{
            getProductsCart()
        }
    }
}