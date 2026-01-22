import { moedaTransformar } from "./currencyLocal.js"
import { deleteProduto } from "./deleteProduto.js"

export async function getProductsCart(){
    const dataProductCart = document.querySelector('[data-product-cart]')
    const dataTotalProdutos = document.querySelector('[data-total-produtos]')
    const dataTotal = document.querySelector('[data-total]')
    const dataCartEmptyImg = document.querySelector('[data-cart-empty-img]')
    const dataNoneCartEmpty = document.querySelectorAll('[data-none]')
    const response = await fetch(`http://localhost:3001/produtos/cart`)
    const dados = await response.json()
    console.log(dados)
    if(dados.length === 0){
       dataNoneCartEmpty.forEach((item) =>{
        item.style.display = 'none'
       })
       dataCartEmptyImg.style.display = 'block'
    }else{
        dataNoneCartEmpty.forEach((item) =>{
        item.style.display =  item.dataset.none
       })
        dataCartEmptyImg.style.display = 'none'
    }
    function somarTotalDeTodasAsCompras(){
        const total = dados.reduce((acc,acm) => {
            return acc += (acm.preco * acm.quanty)
        },0)
        dataTotal.innerText = `${moedaTransformar(total)}`
    }
    somarTotalDeTodasAsCompras()
    dataTotalProdutos.innerText = `(${dados.length})`
    dataProductCart.innerHTML = ''
    dados.map((item) =>{
        dataProductCart.innerHTML += /*html */ `
         <p class="titulo-produto">${item.nome}</p>
                <div data-container-conteudo class="container-conteudo">
                    <div class="conteudo-cart">
                        <p data-quantidade class="quantidade">${item.quanty}x</p>
                        <p class="valor">@${item.preco}</p>
                        <p class="total-cada">$${item.preco * item.quanty}</p>
                    </div>
                    <div data-remover='${item.id}' class="remover-produto">

                        <img src="./produtos/icon-remove-item.svg" alt="">
                    </div>
                </div>

        `
    })
    const remover = dataProductCart.querySelectorAll('[data-remover]')
    deleteProduto(remover)
}