const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.static("static"));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "static", "index.html"), err => {
        res.status(err.status).send("Страница не найдена!");
    });
});

app.post("/update-views", (req, res) => {
    const pathDataFile = path.join(__dirname, "static", "data", "views.json");
    const { main } = req.body;
    fs.readFile(pathDataFile, "utf-8", (err, data) => {
        if (err) {
            const views = {
                about: 0,
                main: 0,
            }
            if (main) {
                views.main++;
            } else {
                views.about++;
            }
            fs.writeFile(pathDataFile, JSON.stringify(views), err => {
                if (err) {
                    console.error(err.message);
                } else {
                    console.log("The file was saved!");
                }
            })
        } else {
            const views = JSON.parse(data);
            if (main) {
                views.main++;
            } else {
                views.about++;
            }
            fs.writeFile(pathDataFile, JSON.stringify(views), err => {
                if (err) {
                    console.error(err.message);
                } else {
                    console.log("The file was saved!");
                    res.json(views);
                }
            })
        }
    });
});

app.get("/:page", (req, res) => {
    const page = (req.params.page).replace(".html", "");
    res.sendFile(path.join(__dirname, "static", `${page}.html`), err => {
        res.status(err.status).send("Страница не найдена!");
    });
});


const port = 3000;

app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});