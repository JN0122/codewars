"use strict";

function splitIntoRanges(acc, val, i, arr) {
  if (val !== arr[i - 1] + 1) {
    acc.push([val]);
  } else {
    acc[acc.length - 1].push(val);
  }
  return acc;
}

function convertToRange(arr) {
  if (arr.length > 2) {
    return [`${arr[0]}-${arr[arr.length - 1]}`];
  }
  return arr;
}

function solution(list) {
  return list.reduce(splitIntoRanges, []).map(convertToRange).join(",");
}

console.log(
  solution([
    -10, -9, -8, -6, -3, -2, -1, 0, 1, 3, 4, 5, 7, 8, 9, 10, 11, 14, 15, 17, 18,
    19, 20,
  ])
);
console.log(solution([1, 2, 3, 4]));
console.log(solution([1, 3, 5, 7]));
console.log(solution([1, 2, 5, 7]));
console.log(solution([1, 3, 5, 6]));
console.log(solution([1, 3, 5, 6]));
console.log(solution([1, 2, 3, 6]));
console.log(solution([0, 2, 3, 4]));
