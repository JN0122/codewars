"use strict";

decodeMorse = function (morseCode) {
  const morse = morseCode.trim();
  const sentense = [];

  morse.split("   ").map((word) => {
    sentense.push(
      word
        .split(" ")
        .map((char) => MORSE_CODE[char])
        .join("")
    );
  });
  return sentense.join(" ");
};

consoole.log(decodeMorse(".... . -.--   .--- ..- -.. ."));
