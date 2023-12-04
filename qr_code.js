"use strict";

const positions = [
  { y1: 15, x1: 19, y2: 18, x2: 20, direction: "UP" },
  { y1: 11, x1: 19, y2: 14, x2: 20, direction: "UP" },
  { y1: 9, x1: 17, y2: 10, x2: 20, direction: "LEFT" },
  { y1: 11, x1: 17, y2: 14, x2: 18, direction: "DOWN" },
  { y1: 15, x1: 17, y2: 18, x2: 18, direction: "DOWN" },
  { y1: 19, x1: 15, y2: 20, x2: 18, direction: "RIGHT" },
  { y1: 15, x1: 15, y2: 18, x2: 16, direction: "UP" },
  { y1: 11, x1: 15, y2: 14, x2: 16, direction: "UP" },
  { y1: 9, x1: 13, y2: 10, x2: 16, direction: "LEFT" },
  { y1: 11, x1: 13, y2: 14, x2: 14, direction: "DOWN" },
  { y1: 15, x1: 13, y2: 18, x2: 14, direction: "DOWN" },
  { y1: 19, x1: 11, y2: 20, x2: 14, direction: "RIGHT" },
  { y1: 15, x1: 11, y2: 18, x2: 12, direction: "UP" },
  { y1: 11, x1: 11, y2: 14, x2: 12, direction: "UP" },
  { y1: 7, x1: 11, y2: 10, x2: 12, direction: "UP" },
  { y1: 2, x1: 11, y2: 5, x2: 12, direction: "UP" },
  { y1: 0, x1: 9, y2: 1, x2: 12, direction: "LEFT" },
  { y1: 2, x1: 9, y2: 5, x2: 10, direction: "DOWN" },
];

const bitOrder = [
  {
    direction: "UP",
    order: [
      // x, y
      [1, 3],
      [0, 3],
      [1, 2],
      [0, 2],
      [1, 1],
      [0, 1],
      [1, 0],
      [0, 0],
    ],
  },
  {
    direction: "DOWN",
    order: [
      // x, y
      [1, 0],
      [0, 0],
      [1, 1],
      [0, 1],
      [1, 2],
      [0, 2],
      [1, 3],
      [0, 3],
    ],
  },
  {
    direction: "LEFT",
    order: [
      // x, y
      [3, 1],
      [2, 1],
      [3, 0],
      [2, 0],
      [1, 0],
      [0, 0],
      [1, 1],
      [0, 1],
    ],
  },
  {
    direction: "RIGHT",
    order: [
      // x, y
      [3, 0],
      [2, 0],
      [3, 1],
      [2, 1],
      [1, 1],
      [0, 1],
      [1, 0],
      [0, 0],
    ],
  },
];

function getBitsValue(bits) {
  const len = bits.length - 1;
  let value = 0;
  if (len < 0) return;
  console.log(bits);
  for (let i = len; 0 <= i; i--) {
    value += bits[i] * 2 ** (len - i);
  }
  return value;
}

function reverseBit(bit) {
  if (bit === 1) return 0;
  return 1;
}

function getBits(qrcode, x1, y1, x2, y2, direction) {
  const bits = [];
  const _bitOrder = bitOrder.find((order) => order["direction"] === direction);

  if (!_bitOrder) throw "Could not find order!";

  _bitOrder["order"].map((coords) => {
    const x = coords[0] + x1;
    const y = coords[1] + y1;

    if (x > x2 || y > y2)
      throw `Invalid bit order table ${_bitOrder["order"]} - ${coords}`;

    if ((x + y) % 2 === 0) {
      bits.push(reverseBit(qrcode[y][x]));
    } else bits.push(qrcode[y][x]);
  });

  return bits;
}

function scanner(qrcode) {
  const chars = [];
  let len = 0;
  positions.map((position, i) => {
    const bits = getBits(
      qrcode,
      position["x1"],
      position["y1"],
      position["x2"],
      position["y2"],
      position["direction"]
    );
    const value = getBitsValue(bits);
    if (i === 0) {
      len = value;
    } else if (i <= len) {
      chars.push(String.fromCharCode(value));
    }
  });
  return chars.join("");
}

console.log(
  scanner([
    [1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1, 0, 1, 1],
    [1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1],
    [1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1, 0, 0, 0, 1],
    [0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 0, 1, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1],
    [1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0],
    [1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0],
    [1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1],
  ])
);
