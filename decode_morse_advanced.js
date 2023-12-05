"use strict";

import decodeMorse from "./decode_morse.js";

const getUnit = function (bits) {
  let count = 0;
  let lastBit = bits[0];
  const elementSizes = [];

  for (let i = 0; i < bits.length; i++) {
    if (bits[i] === "0") {
      if (lastBit === "0") count++;
      else {
        elementSizes.push(count);
        count = 1;
      }
    } else {
      if (lastBit === "1") count++;
      else {
        elementSizes.push(count);
        count = 1;
      }
    }
    lastBit = bits[i];
  }
  elementSizes.push(count);

  return Math.min(...elementSizes);
};

const decodeBits = function (bits) {
  const bits_trimmed = bits.replace(/^0+|0+$/g, "");
  const unit = getUnit(bits_trimmed);
  let sentense = "";

  bits_trimmed.split("0".repeat(unit * 7)).map((word) => {
    word.split("0".repeat(unit * 3)).map((char) => {
      char.split("0".repeat(unit)).map((symbol) => {
        if (symbol === "1".repeat(unit * 3)) sentense += "-";
        else sentense += ".";
      });
      sentense += " ";
    });
    sentense += "   ";
  });

  return sentense;
};

console.log(
  decodeMorse(
    decodeBits(
      "1100110011001100000011000000111111001100111111001111110000000000000011001111110011111100111111000000110011001111110000001111110011001100000011"
    )
  )
);
