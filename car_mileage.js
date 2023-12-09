"use strict";
/*  MY SOLUTION - BEFORE REFACTOR
function isPalindrome(number) {
  const number_str = number.toString();
  let firstHalf = Math.floor(number_str.length / 2);

  for (let i = 0; i < firstHalf; i++) {
    if (number_str[i] !== number_str[number_str.length - 1 - i]) {
      return false;
    }
  }
  return true;
}

function numberIsInteresting(number, awesomePhrases) {
  if (number <= 99 || number >= 1_000_000_000) return false;
  const number_string = String(number);

  if (
    number_string.search(/^\d{1}0+$/) != -1 ||
    "1234567890".search(number_string) != -1 ||
    "9876543210".search(number_string) != -1 ||
    number_string === number_string[0].repeat(number_string.length) ||
    isPalindrome(number_string)
  )
    return true;

  for (let i = 0; i < awesomePhrases.length; i++) {
    if (number_string.search(String(awesomePhrases[i])) != -1) return true;
  }
  return false;
}

function isInteresting(number, awesomePhrases) {
  if (numberIsInteresting(number, awesomePhrases)) return 2;
  else if (
    numberIsInteresting(number + 1, awesomePhrases) ||
    numberIsInteresting(number + 2, awesomePhrases)
  )
    return 1;
  return 0;
} */

function isFollowedByZero(number) {
  return number.toString().search(/^\d{1}0+$/) != -1;
}

function isSequentialAsc(number) {
  return "1234567890".search(number.toString()) != -1;
}

function isSequentiaDesc(number) {
  return "9876543210".search(number.toString()) != -1;
}

function isSameDigit(number) {
  return (
    number.toString() === number.toString()[0].repeat(number.toString().length)
  );
}

function isPalindrome(number) {
  const number_str = number.toString();

  for (let i = 0; i < Math.floor(number_str.length / 2); i++) {
    if (number_str[i] !== number_str[number_str.length - 1 - i]) {
      return false;
    }
  }
  return true;
}

function numberIsInteresting(number, awesomePhrases) {
  if (number <= 99 || number >= 1_000_000_000) return false;

  if (
    isFollowedByZero(number) ||
    isSequentialAsc(number) ||
    isSequentiaDesc(number) ||
    isSameDigit(number) ||
    isPalindrome(number)
  )
    return true;

  for (let i = 0; i < awesomePhrases.length; i++) {
    if (number.toString().search(awesomePhrases[i].toString()) != -1)
      return true;
  }
  return false;
}

function isInteresting(number, awesomePhrases) {
  if (numberIsInteresting(number, awesomePhrases)) return 2;
  else if (
    numberIsInteresting(number + 1, awesomePhrases) ||
    numberIsInteresting(number + 2, awesomePhrases)
  )
    return 1;
  return 0;
}

// "boring" numbers
console.log(isInteresting(3, [1337, 256])); // 0
console.log(isInteresting(3236, [1337, 256])); // 0
console.log(isInteresting(97, [1337, 256])); // 0

// progress as we near an "interesting" number
console.log(isInteresting(11207, [])); // 0
console.log(isInteresting(11208, [])); // 0
console.log(isInteresting(11209, [])); // 1
console.log(isInteresting(11210, [])); // 1
console.log(isInteresting(11211, [])); // 2

// nearing a provided "awesome phrase"
console.log(isInteresting(1335, [1337, 256])); // 1
console.log(isInteresting(1336, [1337, 256])); // 1
console.log(isInteresting(1337, [1337, 256])); // 2
