const fs = require("fs");

// function sum(a) {
//     return a * (a + 1) / 2;
// }

// let ans = sum(10);
// console.log(ans);

// function print (err, data) {
//     if(err) {
//         console.log(err.message);
//     } else {
//         console.log(data);
//     }
// }

// fs.readFile("aa.txt", "utf-8", print);

console.log("Start");

function dump() {
    console.log("timed");
}

setTimeout(dump, 100);

let i = 0;
for(; i < 10000000; i++) {}

console.log(i);

console.log("Done");