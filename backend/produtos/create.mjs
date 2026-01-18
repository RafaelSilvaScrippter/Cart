import { db } from "../db/database.mjs";

const createProducts = db.exec(`CREATE TABLE IF NOT EXISTS "produtos" (
    "id"INTEGER PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "nome"TEXT NOT NULL,
    "src" TEXT NOT NULL,
    "preco"INTEGER NOT NULL
    )`)

const createProdutosCart = db.exec(`CREATE TABLE IF NOT EXISTS "cart" 
    (
    "id"INTEGER PRIMARY KEY,
    "slug"TEXT NOT NULL,
    "product_id"INTEGER NOT NULL,
    "quanty"INTEGER NOT NULL,
    UNIQUE("slug","product_id"),
    FOREIGN KEY("product_id") REFERENCES "produtos"("id")
    )`) 