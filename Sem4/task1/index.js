const express = require("express");
const Joi = require("joi");
const app = express();

const schemaUsers = Joi.object(
    {
        name: Joi.string().min(1).required(),
        surname: Joi.string().min(2).required(),
        city: Joi.string().min(2).required(),
        age: Joi.number().min(14).max(150)
    }
);

const schemaUsersId = Joi.object(
    {
        id: Joi.number().required()
    }
);

const users = [];
let userId = 0;

app.use(express.json());

app.get("/users", (req, res) => {
    res.send({ users });
    // if (users.length !== 0) {
    //     res.send(`
    //         ${users.map(user => `
    //             <p>${user.id}</p>
    //             <h1>${user.name}</h1>
    //             <h1>${user.surname}</h1>
    //         `).join('')}
    //     `);
    // } else {
    //     res.status(400).send("Пользователи не найдены!");
    // }
});

app.get("/users/:id", (req, res) => {
    const userIdValidate = schemaUsersId.validate(req.params);
    if (userIdValidate.error) {
        return res.status(400).send(userIdValidate.error.details);
    }

    const findUser = users.find((user) => user.id === Number(req.params.id));
    if (findUser) {
        res.send(findUser);
    } else {
        res.status(404).send({ user: null });
    }
});

app.post("/users", (req, res) => {
    const user = req.body;
    const userValidate = schemaUsers.validate(user);
    if (userValidate.error) {
        return res.status(400).send(userValidate.error.details);
    }

    userId++;
    users.push({
        id: userId,
        ...user
    });
    res.send({
        id: userId
    });
});

app.put("/users/:id", (req, res) => {
    const userIdValidate = schemaUsersId.validate(req.params);
    const userValidate = schemaUsers.validate(req.body);
    if(userIdValidate.error) {
        return res.status(400).send(userIdValidate.error.details);
    }
    if(userValidate.error) {
        return res.status(400).send(userValidate.error.details);
    }
    const findUser = users.find((user) => user.id === Number(req.params.id));
    if (findUser) {
        const {name, surname, city, age} = req.body;

        findUser.name = name;
        findUser.surname = surname;
        findUser.city = city;

        if (age) {
            findUser.age = age;
        }

        res.send({findUser});
    } else {
        res.status(404).send({user: null});
    }

});

app.delete("/users/:id", (req, res) => {
    const userIdValidate = schemaUsersId.validate(req.params);
    if (userIdValidate.error) {
        return res.status(400).send(userIdValidate.error.details);
    }
    const findUser = users.find((user) => user.id === Number(req.params.id));
    if (findUser) {
        const findUserId = users.indexOf(findUser);
        users.splice(findUserId, 1);

        res.send({users})
    } else {
        res.status(404).send({user: null});
    }

});

const port = 3000;

app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});