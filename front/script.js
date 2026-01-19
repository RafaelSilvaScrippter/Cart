import {fetchProdutos} from "./script/fetchProdutos.js";

await fetchProdutos()

const response = await fetch(`http://localhost:3001/produtos`,{
        method:"POST",
        body:JSON.stringify({slug:"waffle",product_id:1,metodo:"rmv"})
    })
    console.log(response)
