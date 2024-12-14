const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");

server = http
  .createServer((req, res) => {
    const baseUrl = `http://${req.headers.host}`;
    const currentUrl = new URL(req.url, baseUrl);
    // res.writeHead(200, { "Content-Type": "text/html" });
    // res.write(`<p>Full URL: ${currentUrl.toString()}</p>`);
    // return res.end();

    const file = path.join(__dirname, currentUrl.pathname.toString());
    console.log(file);
    fs.readFile(file, function (err, data) {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/html" });
        return res.end(`404 Error. File ovaj ${file} not found.`);
      }
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      return res.end();
    });
  })
  .listen(8080);

// res.writeHead(200, { 'Content-Type': 'application/json' });
// res.end(JSON.stringify({
//   data: 'Hello World!',
// }));
// });

// server.listen(8000);
//   const safePath = path.join(
//     __dirname,
//     currentUrl === "/" ? "/index.html" : req.url
//   );
// const file = path.join(
//   __dirname,
//   currentUrl === "/" ? "/index.html" : req.url
// );
