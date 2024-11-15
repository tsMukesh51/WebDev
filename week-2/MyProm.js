class MyProm {
  constructor(fn) {
    this.cbFnLs = [];
    fn(() => {
      this.cbFnLs.forEach((fn) => fn());
    });
  }
  then(fn) {
    this.cbFnLs.push(fn);
  }
}
