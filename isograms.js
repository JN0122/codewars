"use strict";

// function isIsogram(str) {
//   const str_lower = str.toLowerCase();
//   const chars = new Set();
//   for (let i = 0; i < str_lower.length; i++) {
//     if (chars.has(str_lower[i])) return false;
//     chars.add(str_lower[i]);
//   }
//   return true;
// }

function isIsogram(str) {
  return new Set(str.toLowerCase()).size === str.length;
}

console.log(isIsogram("isogram"));
