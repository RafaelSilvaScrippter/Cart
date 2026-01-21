import { addProdutosCart } from "./addProdutosCart.js"
import { moedaTransformar } from "./currencyLocal.js"
export async function fetchProdutos(){

    const dataConteudoProdutos = document.querySelector('[data-conteudo-produtos]')
    
const response = await fetch('http://localhost:3001/produtos')
const dados = await response.json()

console.log(dados)
dados.forEach((produto) =>{
    dataConteudoProdutos.innerHTML += /*HTML */ `
    <div class='data-card-produto'>
        <div class='card-img'>
            <img src='./produtos/${produto.src}' alt='foto do produto ${produto.nome}' />
            <button data-adicionar-produto data-slug='${produto.slug}' data-id='${produto.id}' class='btn-cart'>Add to cart</button>
        </div>
        <span class='produto-categoria'>${produto.slug}</span>
        <h2 class='produto-nome'>${produto.nome}</h2>
        <p class='produto-preco'>${moedaTransformar( produto.preco)}</p>
    </div>
    `
})
const btnAdicionar = dataConteudoProdutos.querySelectorAll('[data-adicionar-produto]')
addProdutosCart(btnAdicionar)

}