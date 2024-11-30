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
