
import { db } from "../db/database.mjs";

export  function getProdutos(req,res){
   const getProdutos = db.prepare(/*sql */`SELECT "produtos".*,"cart"."quanty" FROM "produtos" LEFT JOIN "cart" ON "cart"."product_id" = "produtos"."id"`).all()
  if(!getProdutos){
    try{
        
    }catch{
         res.status(404).json({code:404,message:"Produto não encontrado"})
        console.log('erro ao fazer get dos produtos')
    }
  }

  if(getProdutos){
    res.status(200).json(getProdutos)
  }
}

export function postCart(req,res){
  const {slug,product_id,metodo} = req.body

  const getProduct = db.prepare(`SELECT * FROM "cart" WHERE "slug" = ?`).get(slug);


  if(!getProduct){
    try{
      const insertCart = db.prepare(/*sql */`INSERT  INTO "cart" ("slug","product_id","quanty") 
      VALUES(?,?,?)
    ` ).run(slug,product_id,1)
    res.status(201).json({message:'Produto adicionado'})
    }catch{
    res.status(500).json({message:'erro'})
    console.log('erro')
    }
  }

  if(getProduct && getProduct.quanty >= 1){
    let total = getProduct.quanty
    if(metodo === 'add'){
      total++
    }else{
      total--
    }
      try{
      const insertCart = db.prepare(`INSERT  INTO "cart" ("slug","product_id","quanty") 
      VALUES(?,?,?)
      ON CONFLICT ("slug","product_id")
      DO UPDATE SET 
      "quanty" = excluded.quanty
    ` ).run(slug,product_id,total)
    res.status(201).json({message:"Produto adicionado no carrinho"})
    }catch{
    console.log('erro')
    res.status(500).json({message:"erro"})
    }finally{

    if(getProduct && getProduct.quanty === 1 && metodo !== 'add'){
       db.prepare(`DELETE  FROM "cart" WHERE "slug" = ?`).run(slug)
      return
  
    }
  }
  }
  
}

export function getProductsCart(req,res){
  try{

    const getProducts = db.prepare(`SELECT *,"c"."id" FROM "cart" AS "c" JOIN "produtos" ON "product_id" = "produtos"."id"  `).all();
    
    res.status(200).json(getProducts)
  }catch{
    res.status(404).json({status:404,message:"Produto não encontrado"})
  }
}

export function deleteProductCart(req,res){
  console.log(req.body)
  const {id} = req.body
  if(!id){
  
    return  res.status(404).json({status:404,message:"Id do produto não fornecido"})
  }

  try{

    const verificarSeProdutoExiste = db.prepare(`SELECT * FROM "cart" WHERE "id" = ?`).get(id)
    if(!verificarSeProdutoExiste){
       return  res.status(404).json({status:404,message:"Produto não encontrado"})
    }
  }catch{
    res.status(500).json({message:"Erro no servidor"})
  }

  try{
    const deleteDb = db.prepare(`DELETE  FROM "cart" WHERE "id" = ?`).run(id)
    if(deleteDb.changes === 1){
       res.status(200).json({message:"Produto deletado"})
    }
  }catch{
     res.status(500).json({message:"Erro no servidor"})
  }
  
}