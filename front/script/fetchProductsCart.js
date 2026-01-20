import { moedaTransformar } from "./currencyLocal.js"

export async function getProductsCart(){

    const dataProductCart = document.querySelector('[data-product-cart]')
    const dataTotalProdutos = document.querySelector('[data-total-produtos]')
    const dataTotal = document.querySelector('[data-total]')

    const response = await fetch(`http://localhost:3001/produtos/cart`,{
        method:"GET",
        
    })
    const dados = await response.json()
    function somarTotalDeTodasAsCompras(){
        const total = dados.reduce((acc,acm) => {
            return acc += (acm.preco * acm.quanty)
        },0)
        dataTotal.innerText = `${moedaTransformar(total)}`
    }
    somarTotalDeTodasAsCompras()

    dataTotalProdutos.innerText = `(${dados.length})`
    dados.map((item) =>{
        dataProductCart.innerHTML += /*html */ `
        
         <p class="titulo-produto">${item.nome}</p>
                <div class="container-conteudo">
                    <div class="conteudo-cart">
                        <p data-quantidade class="quantidade">${item.quanty}x</p>
                        <p class="valor">@${item.preco}</p>
                        <p class="total-cada">$${item.preco * item.quanty}</p>
                    </div>
                    <div data-remover class="remover-produto">

                        <img src="./produtos/icon-remove-item.svg" alt="">
                    </div>
                </div>

        `
    })
}