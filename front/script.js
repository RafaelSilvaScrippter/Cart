import {fetchProdutos} from "./script/fetchProdutos.js";

await fetchProdutos()

const response = await fetch(`http://localhost:3001/produtos/cart`,{
        method:"GET",

    })
    console.log(await response.json())
