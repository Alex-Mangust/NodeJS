function calculateDiscriminant(a, b, c) {
    return Math.pow(b, 2) - 4 * a * c;
}

const a = 1;
const b = -3;
const c = 2;

const dicriminant = calculateDiscriminant(a, b, c);
console.log(`Дискриминант: ${dicriminant}`);