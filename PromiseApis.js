/**
 * Promise.all 
 * Promise.allSettled
 * Promise.race
 * Promise.any
 */

const result1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("First Resolved Promise in 2 seconds");
    }, 2000);
  })
  
  const result2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("Second Resolved Promise in 3 seconds");
    }, 3000);
  })
  
  const result3 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("Third Resolved Promise in 3 seconds");
    }, 4000);
  })
  
  const result4 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("Fourth Resolved Promise in 5 seconds");
    }, 5000);
  })
  
  
  
  /**
  * Promise.all
  * Logs an array of resolved values
  * if any promise rejects -> logs the rejected response
  **/
  Promise.all([result1, result2, result3, result4]).then(res => console.log(res));
  Promise.all([result1, result2, result3, result4]).catch(err => console.log(err));
  
  
  /**
  * Promise.allSettled
  * logs an array of objects with {status:"fulfilled"/"rejected", value:"actual value"}
  * even for errors gives array of objects
  **/
  Promise.allSettled([result1, result2, result3, result4]).then(res => console.log(res));
  
  
  /**
  * Promise.race
  * logs an first settled promise(either resolved or rejected)
  * even for errors, logs the first settled promise
  **/
  Promise.race([result1, result2, result3, result4]).then(res => console.log(res)).catch(err => console.log(err));
  
  
  /**
  * Promise.any
  * logs an first fulfilled promise(resolved promise)
  * If all of them are rejected, returns an aggregated error
  **/
  Promise.any([result1, result2, result3, result4]).then(res => console.log(res)).catch(err => console.log(err));