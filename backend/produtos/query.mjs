
import { db } from "../db/database.mjs";

export  function getProdutos(req,res){
   const getProdutos = db.prepare(`SELECT * FROM "produtos"`).all()
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

  if(getProduct && getProduct.quanty === 0){
    db.prepare(`DELETE  FROM "cart" WHERE "slug" = ?`).run(slug)
    return
  }

  if(!getProduct){
    console.log('get product')
    try{
      const insertCart = db.prepare(`INSERT  INTO "cart" ("slug","product_id","quanty") 
      VALUES(?,?,?)
    ` ).run(slug,product_id,1)
    res.status(201).json({message:'Produto adicionado'})
    }catch{
    console.log('erro')
    }
  }else{
    let total
    if(metodo === 'add'){

       total = getProduct.quanty + 1
    }

    if(metodo === 'rmv'){
      total = getProduct.quanty - 1
    }
    try{
      const insertCart = db.prepare(`INSERT  INTO "cart" ("slug","product_id","quanty") 
      VALUES(?,?,?)
      ON CONFLICT ("slug","product_id")
      DO UPDATE SET 
      "quanty" = excluded.quanty
    ` ).run(slug,product_id,total)
    console.log(insertCart)
    res.status(201).json({message:"Produto adicionado no carrinho"})
    }catch{
    console.log('erro ao atualizar')
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