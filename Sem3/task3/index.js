const fs = require("fs");
const path = require("path");

const thisFilePath = path.join(__dirname).split("\\");
const thisFolderPath = (thisFilePath.filter((_, index) => index != thisFilePath.length - 1)).join("\\");

const findFile = (folderPath, nameFile) => {
    const insideInForlder = fs.readdirSync(folderPath);
    for(inside of insideInForlder) {
        const insidePath = path.join(folderPath, inside);

        if (inside === nameFile) {
            return insidePath;
        }

        if (fs.statSync(insidePath).isDirectory()) {
            const result = findFile(insidePath, nameFile);
            if (result) {
                return result;
            }
        }
    };
    return null;
}

const filePath = findFile(thisFolderPath, "personData.json");
if (filePath) {
    try {
        const fileContent = JSON.parse(fs.readFileSync(filePath, "utf-8"));
        fileContent.age-= 15;
        fileContent.city = "Irkutsk";
        fileContent.name = "Alex";
        fileContent.surname = "Stogny";
        fs.writeFileSync(filePath, JSON.stringify(fileContent, null, 2));
        console.log("Файл успешно перезаписан");
    } catch (error) {
        console.error(err);
    }

}