import { getProductsCart } from "./fetchProductsCart.js"
import { fetchProdutos } from "./fetchProdutos.js"

export async function addProdutosCart(btnAdd){

    btnAdd.forEach((btn) =>{
        btn.addEventListener('click',() =>{
            const {slug,id,metodo} = btn.dataset
            postarProdutoCart(slug,id,metodo)
       
        })
    })
   async function postarProdutoCart(slug,id,metodo){
       try{

           const response = await fetch('http://localhost:3001/produtos',{
               method:'POST',
               body:JSON.stringify({slug:slug,product_id:Number(id),metodo:metodo})
            })
            const dados = await response.json()
        }catch{
            console.log('erro ao adicionar produto no carrinho de compras')
        }finally{
            await getProductsCart()
            await fetchProdutos()
        }
    }
}