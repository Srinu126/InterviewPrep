/**
JS Program to flatten the Nested JS Object
**/


const response = {
  name: 'Dan',
  age: 25,
  program: {
    title: 'MSD',
    duration: '16',
  },
  techStack: {
    language: 'Javascript',
    framework: {
      name: 'Nextjs',
      version: '14',
    },
  },
};

const flattenArr = (arr) => {
  return arr.reduce((flat, item) => {
    return flat.concat(Array.isArray(item) ? flattenArr(item) : item);
  }, []);
};

const flattenObj = (obj, prefix = '') => {
  let res = {};
  for (let [key, value] of Object.entries(obj)) {
    let newKey = prefix ? `${prefix}.${key}` : key;
    if (typeof value === 'object' && value !== null) {
      if (Array.isArray(value)) {
        res[newKey] = flattenArr(value);
      } else {
        let flattened = flattenObj(value, newKey);
        res = { ...res, ...flattened };
      }
    } else {
      res[newKey] = value;
    }
  }
  return res;
};

console.log(flattenObj(response));
