const express = require("express");
const path = require("path");

const app = express();

app.get("/", (req, res) => {
    const pagePath = path.join(__dirname, "index.html");
    res.sendFile(pagePath, (err) => {
        if (err) {
            res.status(err.status).send("<h1>Страница не найдена!</h1>");
        }
    });
})

app.get("/:page", (req, res) => {
    const page = (req.params.page).replace(".html", "");
    const pagePath = path.join(__dirname, `${page}.html`);
    console.log(page);
    console.log(pagePath);
    res.sendFile(pagePath, (err) => {
        if (err) {
            res.status(err.status).send("<h1>Страница не найдена!</h1>");
        }
    });
});

const port = 3000;

app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});

