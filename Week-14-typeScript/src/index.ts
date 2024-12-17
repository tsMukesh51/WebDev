type sumInp = string | number;

const sum = (a: sumInp, b: sumInp): sumInp => {
    if (typeof a === 'number' && typeof b === 'number')
        return a + b;
    return String(a) + String(b);
}

let x = 1
let b = '4'

console.log(sum(x, b));