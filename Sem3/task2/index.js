const fs = require("fs");
const path = require("path");

const person = {
    name: "Ivan",
    surname: "Ivanov",
    age: 30,
    city: "Moscow",
}

fs.writeFileSync(path.join(__dirname, "personData.json"), JSON.stringify(person, null, 2), (err) => {
    if (err) {
        console.error(err);
    }
});