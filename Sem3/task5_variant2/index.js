const express = require("express");

const app = express();

app.use(express.static("static"));

const port = 3000;

app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});