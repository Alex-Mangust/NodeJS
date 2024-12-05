const http = require("http");

const views = {home: 0, about: 0};
const server = http.createServer((req, res) => {
    if (req.url === "/") {
        res.writeHead(200, {
            "Content-Type": "text/html; charset=UTF-8",
        });
        res.end(`<h1>Посещений: ${++views.home}</h1>
            <a href="./about">Перейти на страницу обо мне</a>`);
    } else if (req.url === "/about") {
        res.writeHead(200, {
            "Content-Type": "text/html; charset=UTF-8",
        });
        res.end(`<h1>Посещений: ${++views.about}</h1>
            <a href="./">Перейти на главную страницу</a>`);
    } else {
        res.writeHead(404, {
            "Content-Type": "text/html; charset=UTF-8",
        });
        res.end("<h1>Страница не найдена!</h1>");
    }
});

const port = 300;

server.listen(port);