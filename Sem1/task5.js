const http = require("http");
const server = http.createServer((req, res) => {
    if (req.url === "/") {
        res.writeHead(200, {
            "Content-Type": "text/html; charset=UTF-8",
        });
        res.end("<h1>Мой сервер работает!</h1>")
    }
});

const port = 300;

server.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});