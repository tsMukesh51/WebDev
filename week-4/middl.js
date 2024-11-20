const express = require("express");

app = express();

function isOld(age) {
  if (age >= 14) return true;
  return false;
}

app.get("/ride1", function (req, res) {
  let age = req.query.age;
  if (isOld(age)) {
    res.json({
      msg: "Completed Ride 1",
    });
  } else {
    res.json({
      msg: "Under aged not allowed for R1",
    });
  }
});

app.get("/ride2", function (req, res) {
  let age = req.query.age;
  if (isOld(age)) {
    res.json({
      msg: "Completed Ride 2",
    });
  } else {
    res.json({
      msg: "Under aged not allowed for R2",
    });
  }
});

app.listen(3000);
