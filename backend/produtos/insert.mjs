import { db } from "../db/database.mjs";

const inserirProdutos = db.exec(`INSERT OR IGNORE INTO "produtos"
    ("slug","nome","src","preco")
    VALUES
    (
    'waffle','Waffle with berries','waffle.jpg',650
    ),
    ('Crême Brúlée','Vanilla Bean','cremeBrulle.jpg',700),
    ('macaron','Macaron Mix of Five','macaron.jpg',800),
    ('tiramissu','Classic Tiramissu','tiramissu.jpg',550),
    ('baklava','Pistachio Baklava','baklava.jpg',400),
    ('pie','Lemon Meringue Pie','meringue.jpg',500)
    `)