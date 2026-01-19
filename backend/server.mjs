import { createServer } from "node:http";
import { Router } from "./router.mjs";
import { customRequest } from "./custom-request.mjs";
import { customResponse } from "./customResponse.mjs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { readFile } from "node:fs/promises";
import { getProductsCart, getProdutos, postCart } from "./produtos/query.mjs";

const router = new Router();

router.get('/produtos',getProdutos)
router.post('/produtos',postCart)
router.get('/produtos/cart',getProductsCart)

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const publicDir = path.join(__dirname, "../front");

const mimeTypes = {
  ".html": "text/html",
  ".js": "application/javascript",
  ".mjs": "application/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml"
};

const server = createServer(async (request, response) => {
  const req = await customRequest(request);
  const res = customResponse(response);


  const handler = router.routes?.[req.method]?.[req.pathname];
  if (handler) {
    return handler(req, res);
  }


  const filePath =
    req.pathname === "/"
      ? path.join(publicDir, "index.html")
      : path.join(publicDir, req.pathname);

  const extArquivo = path.extname(filePath);
  const contentType = mimeTypes[extArquivo] || "text/plain";

  try {
    const content = await readFile(filePath);
    res.writeHead(200, { "Content-Type": contentType });
    res.end(content);
  } catch {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Arquivo não encontrado");
  }
});

server.listen(3001, () => {
  console.log("Servidor rodando em http://localhost:3001");
});
