/**
 * Promise.all
 */
Promise.myAll = function (promises) {
  let result = [];
  let completed = 0;
  return new Promise((resolve, reject) => {
    promises.forEach((promise, index) => {
      if (promises.length === 0) {
        return resolve([]);
      }
      promise
        .then((res) => {
          result[index] = res;
          completed += 1;
          if (completed === promises.length) {
            resolve(result);
          }
        })
        .catch((err) => reject(err));
    });
  });
};

let promise1 = new Promise((resolve, reject) =>
  setTimeout(() => reject("First Rejected"), 1000)
);
let promise2 = new Promise((resolve, reject) =>
  setTimeout(() => resolve("Second Resolved"), 2000)
);
let promise3 = new Promise((resolve, reject) =>
  setTimeout(() => resolve("Third Resolved"), 3000)
);
let promise4 = new Promise((resolve, reject) =>
  setTimeout(() => reject("Fourth Promise"), 4000)
);

Promise.myAll([promise1, promise2, promise3, promise4])
  .then((response) => console.log(response))
  .catch((err) => console.log(err));

/**
 * Promise.allSettled
 */

Promise.myAllSettled = function (promises) {
  let result = [];
  let completed = 0;
  return new Promise((resolve, reject) => {
    if (promises.length === 0) {
      return resolve([]);
    }
    promises.forEach((promise, index) => {
      promise
        .then((res) => {
          result.push({ status: "fulfilled", value: res });
          completed += 1;
          if (completed === promises.length) resolve(result);
        })
        .catch((err) => {
          result.push({ status: "rejected", reason: err });
          completed += 1;
          if (completed === promises.length) resolve(result);
        });
    });
  });
};

Promise.myAllSettled([promise1, promise2, promise3, promise4])
  .then((response) => console.log(response))
  .catch((err) => console.log(err));

/**
 * Promise.race
 */

Promise.myRace = function (promises) {
  return new Promise((resolve, reject) => {
    if (promises.length === 0) {
      return reject(new Error("No promises provided"));
    }
    promises.forEach((promise) => {
      promise.then((res) => resolve(res)).catch((err) => reject(err));
    });
  });
};

Promise.myRace([promise1, promise2, promise3, promise4])
  .then((response) => console.log(response))
  .catch((err) => console.log(err));

/**
 * Promise.any
 */

Promise.myAny = function (promises) {
  let result = [];
  let completed = 0;
  return new Promise((resolve, reject) => {
    if (promises.length === 0) {
      return reject(new AggregateError([], "All promises were rejected"));
    }
    promises.forEach((promise, index) => {
      promise
        .then((res) => resolve(res))
        .catch((err) => {
          result[index] = err;
          completed += 1;
          if (completed === promises.length)
            reject(new AggregateError(result, "All promises were rejected"));
        });
    });
  });
};

Promise.myAny([promise1, promise2, promise3, promise4])
  .then((response) => console.log(response))
  .catch((err) => console.log(err));
