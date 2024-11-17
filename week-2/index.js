// const fs = require("fs");

// // function sum(a) {
// //     return a * (a + 1) / 2;
// // }

// // let ans = sum(10);
// // console.log(ans);

// // function print (err, data) {
// //     if(err) {
// //         console.log(err.message);
// //     } else {
// //         console.log(data);
// //     }
// // }

// // fs.readFile("aa.txt", "utf-8", print);

// // console.log("Start");

// // function dump() {
// //     console.log("timed");
// // }

// // setTimeout(dump, 100);

// // let i = 0;
// // for(; i < 10000000; i++) {}

// // console.log(i);

// // console.log("Done");

// // function setTimeoutPromisified(ms) {
// //     return new Promise(resolve => setTimeout(resolve, ms));
// //   }

// //   function callback() {
// //       console.log("3 seconds have passed");
// //   }

// //   setTimeoutPromisified(3000).then(callback)

// class MyProm {
//   constructor(fn) {
//     this.cbFnLs = [];
//     fn(() => {
//       this.cbFnLs.forEach((fn) => fn());
//     });
//   }
//   then(fn) {
//     this.cbFnLs.push(fn);
//   }
// }

// function readFilePro(fileP) {
//   return new Promise((resolve) => {
//     fs.readFile(fileP, "utf-8", (err, data) => {
//       if (err) resolve(err);
//       resolve(data);
//     });
//   });
// }

// console.log("start");

// const p = readFilePro("./data/a.txt");

// p.then((res) => {
//   console.log(res);
// });

// console.log("end");

console.log(process.argv);