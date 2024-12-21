//call, apply, bind

let myName = {
  firstName: "Chandler",
  lastName: "Bing",
};

function displayDetails(city, state) {
  console.log(
    `Hello ${this.firstName} ${this.lastName}, You are from ${city}, ${state} right.`
  );
}

//call polyfill
Function.prototype.myCall = function (context = {}, ...args) {
  if (typeof this !== "function") {
    throw new Error(this + "It's not callable");
  }
  context.fn = this;
  context.fn(...args);
};

displayDetails.call(myName, "Waterloo", "ON");
displayDetails.myCall(myName, "Waterloo", "ON");

//apply polyfill
Function.prototype.myApply = function (context = {}, args) {
  if (typeof this !== "function") {
    throw new Error(this + "It's not callable");
  }
  if (!Array.isArray(args)) {
    throw new TypeError("CreateListFromArrayLike called on non-object");
  }
  context.fn = this;
  context.fn(...args);
};

displayDetails.apply(myName, ["Waterloo", "ON"]);
displayDetails.myApply(myName, ["Waterloo", "ON"]);

//bind polyfill
Function.prototype.myBind = function (context = {}, ...args) {
  if (typeof this !== "function") {
    throw new Error(this + "cannot be bound as it's not callable");
  }
  context.fn = this;
  return function (...newArgs) {
    return context.fn(...args, ...newArgs);
  };
};

const md1 = displayDetails.bind(myName, "Waterloo", "ON");
md1();

const md2 = displayDetails.myBind(myName, "Waterloo");
md1("ON");


//map polyfill
Array.prototype.myMap = function (cb) {
  let newArr = [];
  for (let i = 0; i < this.length; i++) {
    newArr.push(cb(this[i], i, this));
  }
  return newArr;
};

//filter polyfill
Array.prototype.myFilter = function (cb) {
  let newArr = [];
  for (let i = 0; i < this.length; i++) {
    if (cb(this[i], i, this)) {
      newArr.push(this[i]);
    }
  }
  return newArr;
};

//reduce polyfill
Array.prototype.myReduce = function (cb, initialValue) {
  let accumulator = initialValue;
  for (let i = 0; i < this.length; i++) {
    accumulator = accumulator ? cb(accumulator, this[i], i, this) : this[i];
  }
  return accumulator;
};

let arr1 = [2, 3, 4, 5, 6, 7, 8];

const mapRes = arr1.map((el) => el * 2);
const myMapRes = arr1.myMap((ele) => ele * 2);
console.log(mapRes, myMapRes);
const filterRes = arr1.filter((el) => el % 2 === 0);
const myFilterRes = arr1.filter((el) => el % 2 === 0);
console.log(filterRes, myFilterRes);
const reduceRes = arr1.reduce((acc, curr) => acc + curr);
const myReduceRes = arr1.myReduce((acc, curr) => acc + curr);
console.log(reduceRes, myReduceRes);
