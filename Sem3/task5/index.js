const express = require("express");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "static")));

app.get("/", (req, res) => {
    const pathFile = path.join(__dirname, "staic", "index.html");
    res.sendFile(path.join(__dirname, "staic", "index.html"), err => {
        if (err) {
            res.status(err.status).send("Страница не найдена!");
        }
    });
});

app.get("/:page", (req, res) => {
    const page = (req.params.page).replace("html", "");
    res.sendFile(path.join(__dirname, "static", `${page}.html`), err => {
        if (err) {
            res.status(err.status).send("Страница не найдена!");
        }
    });
});

const port = 3000;

app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
})