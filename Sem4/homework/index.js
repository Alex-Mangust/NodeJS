const express = require("express");
const fs = require("fs");
const fsPromises = require("fs/promises"); 
const path = require("path");
const { usersSchema, usersIdSchema } = require("./validation/scheme");
const { checkParams, checkBody } = require("./validation/validator");

const app = express();

async function checkAndCreateFolder() { // После того, как я внес файл с данными о пользователях в gitignore, git status перестал отслеживать папку static. Добавил эту функцию, чтобы, если папки нет, она создавалась сама.
    try {
        await fsPromises.access(path.join(__dirname, "static"));
    } catch (error) {
        await fsPromises.mkdir(path.join(__dirname, "static"), { recursive: true });
    }
}
checkAndCreateFolder();

app.use(express.static("static"));
app.use(express.json());

let userId = 0;
const pathDataFile = path.join(__dirname, "static", "dataUsers.json");


app.get("/users", (req, res) => {
    fs.readFile(pathDataFile, "utf-8", (err, data) => {
        if (err) {
            res.status(404).send({ user: null });
        } else {
            res.send(JSON.parse(data));
        }
    });
});

app.get("/users/:id", checkParams(usersIdSchema), (req, res) => {
    fs.readFile(pathDataFile, "utf-8", (err, data) => {
        if (err) {
            res.status(404).send({ user: null });
        } else {
            const users = JSON.parse(data);
            const desiredUser = users.find((user) => user.id === Number(req.params.id));
            if (desiredUser) {
                res.send({ desiredUser });
            } else {
                res.status(404).send({ user: null });
            }
        }
    });
});

app.post("/users", checkBody(usersSchema), (req, res) => {
    const users = [];
    fs.readFile(pathDataFile, (err, data) => {
        if (!err) {
            users.push(
                ...JSON.parse(data)
            );
            userId = Math.max(...users.map(user => user.id));
        }
        users.push(
            {
                id: ++userId,
                ...req.body
            }
        );
        fs.writeFile(pathDataFile, JSON.stringify(users), (err) => {
            if (err) {
                return res.status(404).send({ user: null });
            }
            res.send({ users });
        })
    });
});

app.put("/users/:id", checkParams(usersIdSchema), checkBody(usersSchema), (req, res) => {
    fs.readFile(pathDataFile, "utf-8", (err, data) => {
        if (err) {
            return res.status(404).send({ user: null });
        }
        const users = JSON.parse(data);
        const desiredUser = users.find((user) => user.id === Number(req.params.id));
        if (desiredUser) {
            const { name, surname, city, age } = req.body;
            desiredUser.name = name;
            desiredUser.surname = surname;
            desiredUser.city = city;

            if (age) {
                desiredUser.age = age;
            }

            fs.writeFile(pathDataFile, JSON.stringify(users), (err) => {
                if (err) {
                    return res.status(err.code).send(err.message);
                }
            });
            res.send({ desiredUser });
        } else {
            res.status(404).send({ user: null });
        }
    })
});

app.delete("/users/:id", checkParams(usersIdSchema), (req, res) => {
    const pathDataFile = path.join(__dirname, "static", "dataUsers.json");
    fs.readFile(pathDataFile, "utf-8", (err, data) => {
        if (err) {
            return res.status(404).send({ user: null });
        }
        const users = JSON.parse(data);
        const desiredUser = users.find((user) => user.id === Number(req.params.id));
        users.splice(users.indexOf(desiredUser), 1);

        fs.writeFile(pathDataFile, JSON.stringify(users), (err) => {
            if (err) {
                return res.status(err.code).send(err.message);
            }
        });
        res.send({ users });
    })
});

const port = 3000;

app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
})