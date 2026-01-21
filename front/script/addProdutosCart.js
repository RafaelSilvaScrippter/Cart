import { getProductsCart } from "./fetchProductsCart.js"

export async function addProdutosCart(btnAdd){

    btnAdd.forEach((btn) =>{
        btn.addEventListener('click',() =>{
            const {slug,id} = btn.dataset
            postarProdutoCart(slug,id)
       
        })
    })
   async function postarProdutoCart(slug,id){
       try{

           const response = await fetch('http://localhost:3001/produtos',{
               method:'POST',
               body:JSON.stringify({slug:slug,product_id:Number(id),metodo:'add'})
            })
            const dados = await response.json()
        }catch{
            console.log('erro ao adicionar produto no carrinho de compras')
        }finally{
            await getProductsCart()
        }
    }
}