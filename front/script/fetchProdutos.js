import { moedaTransformar } from "./currencyLocal.js"

const dataConteudoProdutos = document.querySelector('[data-conteudo-produtos]')

const response = await fetch('http://localhost:3001/produtos')
const dados = await response.json()

dados.forEach((produto) =>{
    dataConteudoProdutos.innerHTML += /*HTML */ `
    <div class='data-card-produto'>
        <div class='card-img'>
            <img src='./produtos/${produto.src}' alt='foto do produto ${produto.nome}' />
            <button class='btn-cart' data-btn-add-cart>Add to cart</button>
        </div>
        <span class='produto-categoria'>${produto.slug}</span>
        <h2 class='produto-nome'>${produto.nome}</h2>
        <p class='produto-preco'>${moedaTransformar( produto.preco)}</p>
    </div>
    `
})

export default fetchDados = {}