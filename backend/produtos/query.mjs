
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