/**
Debouncing is a technique that controls how often a function is executed. Imagine you're typing in a search box—without debouncing, the search function might try to run on every single keystroke, 
which can overwhelm the system with too many requests. With debouncing, we wait until the user has stopped typing for a short moment before running the search. 
This not only reduces unnecessary API calls but also improves performance. 
Debouncing is also useful in other situations, like when resizing a window or scrolling, where we only want to take action after the user has finished their interaction.
**/
let count = 0;

function debounce(fn, delay = 1000) {
  let timerId;
  return function (...args) {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

function onScroll() {
  console.log("Scroll event triggered", count++);
}

window.addEventListener("scroll", debounce(onScroll, 2000));
