
/** Merge Sort
 * Time Complexity: O(nlogn)
 * 
 * */
function mergeSort(arr){
    if(arr.length<2) return arr;
    let middle = Math.floor(arr.length/2);
    let left = arr.slice(0,middle);
    let right = arr.slice(middle);
    return merge(mergeSort(left), mergeSort(right));
}
function merge(left, right){
    let sortedArr = [];
    while(left.length && right.length){
        if(left[0]<=right[0]){
            sortedArr.push(left.shift());
        } else {
            sortedArr.push(right.shift());
        }
    }
    return [...sortedArr, ...left, ...right];
}
let arr = [8,-2,6,3,-5,1];
console.log(mergeSort(arr));
