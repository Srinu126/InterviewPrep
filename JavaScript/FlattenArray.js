function flattenArr(arr) {
  return arr.reduce((acc, curr) => {
    return acc.concat(Array.isArray(curr) ? flattenArr(curr) : curr);
  }, []);
}
