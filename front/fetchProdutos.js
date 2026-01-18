const dataConteudoProdutos = document.querySelector('[data-conteudo-produtos]')

const response = await fetch('http://localhost:3001/produtos')
const dados = await response.json()

dados.forEach((produto) =>{
    dataConteudoProdutos.innerHTML += `
    
    <img src='./produtos/${produto.src}' alt=''
    <h1>${produto.slug}</h1>
    `
})

export default fetchDados = {}