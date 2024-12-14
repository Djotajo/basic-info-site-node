const http = require("http");
const fs = require("fs");
const path = require("path");

server = http
  .createServer((req, res) => {
    const baseUrl = `http://${req.headers.host}`;
    const currentUrl = new URL(req.url, baseUrl);

    const basePath =
      currentUrl.pathname === "/"
        ? "/index"
        : path.basename(currentUrl.pathname, path.extname(currentUrl.pathname));

    const htmlFile = path.join(__dirname, basePath + ".html");
    const cssFile = path.join(__dirname, basePath + ".css");

    const mimeTypes = {
      ".html": "text/html",
      ".css": "text/css",
    };

    const serveFile = (filePath, contentType) => {
      fs.readFile(filePath, function (err, data) {
        if (err) {
          const errorFile = path.join(__dirname, "404.html");
          fs.readFile(errorFile, function (error, errorData) {
            if (error) {
              res.writeHead(500, { "Content-Type": "text/html" });
              return res.end(`Internal server error.`);
            }
            res.writeHead(404, { "Content-Type": "text/html" });
            res.write(errorData);
            return res.end();
          });
          return;
        }
        res.writeHead(200, { "Content-Type": contentType });
        res.write(data);
        return res.end();
      });
    };

    if (req.url.endsWith(".css")) {
      serveFile(cssFile, mimeTypes[".css"]);
    } else {
      serveFile(htmlFile, mimeTypes[".html"]);
    }
  })
  .listen(8080, () => {
    console.log("Server running at http://localhost:8080/");
  });
