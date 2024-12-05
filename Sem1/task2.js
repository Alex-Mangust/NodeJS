function sumoFNumbers(n) {
    if (n === 1) {
        return 1;
    }
    return n + sumoFNumbers(n - 1);
}

const n = 4;
const sum = sumoFNumbers(n);
console.log(`Сумма ряда натуральных чисел до ${n}: ${sum}`);