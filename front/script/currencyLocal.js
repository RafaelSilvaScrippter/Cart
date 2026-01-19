export  function moedaTransformar(moeda){
    const moedaTransformada = new Intl.NumberFormat('en-us',
        {style:'currency',currency:'USD'}).format(moeda)
    return moedaTransformada
}