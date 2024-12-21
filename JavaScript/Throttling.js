function throttle(fn, limit = 1000) {
  let lastFunc;
  let lastRan;
  return function (...args) {
    if (!lastRan) {
      fn.apply(this, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(() => {
        if (Date.now() - lastRan >= limit) {
          fn.apply(this, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
}
let count = 0;
function onScroll() {
  ++count;
  console.log("onScroll triggered", count);
}

window.addEventListener("scroll", throttle(onScroll, 3000));
