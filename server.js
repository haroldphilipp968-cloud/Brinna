const http = require("http");
const fs = require("fs");
const path = require("path");
const root = __dirname;
const types = { ".html":"text/html; charset=utf-8", ".jpg":"image/jpeg", ".jpeg":"image/jpeg", ".png":"image/png", ".webp":"image/webp", ".ico":"image/x-icon" };
http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split("?")[0]);
  if (p === "/") p = "/index.html";
  const ext = path.extname(p).toLowerCase();
  const file = path.normalize(path.join(root, p));
  if (!types[ext] || !file.startsWith(root)) { res.writeHead(404); return res.end("Not found"); }
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404); return res.end("Not found"); }
    res.writeHead(200, { "Content-Type": types[ext] });
    res.end(data);
  });
}).listen(process.env.PORT || 3000, "0.0.0.0");
