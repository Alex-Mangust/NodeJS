const {calculateResultSum} = require("./calc.js");
const colors = require("colors");

const total = calculateResultSum([12.1, 32.2, 43.1], 0.9);

console.log(`Общая стоимость покупок: ${total > 50 ? colors.red(total) : colors.green(total)} рублей.`);