"use strict";

//  https://www.codewars.com/kata/52bb6539a4cf1b12d90005b7
/* There must be:
- 1 battleship (size of 4 cells), 
- 2 cruisers (size 3), 
- 3 destroyers (size 2) 
- 4 submarines (size 1). 
Any additional ships are not allowed, as well as missing ships.
Each ship must be a straight line, except for submarines, which are just single cell.
The ship cannot overlap or be in contact with any other ship, neither by edge nor by corner. 
  N
W + E
  S
*/

/*
// Easier way of completing this kata. 
function validateBattlefield(field) {
  var hit = (row, col) => (row < 0 || col < 0 || row > 9 || col > 9) ? 0 : field[row][col];
  for (var ships = [10,0,0,0,0], row = 0; row < 10; row++) {
    for (var col = 0; col < 10; col++) {
      if ( hit(row,col) ) {
        if ( hit(row-1, col-1) || hit(row-1, col+1) ) return false; // Corner is touching
        if ( hit(row-1, col  ) && hit(row  , col-1) ) return false; // Side is touching
        if ( ( field[row][col] += hit(row-1, col) + hit(row, col-1) ) > 4 ) return false; // Ship is too long
        ships[field[row][col]]++; ships[field[row][col] - 1]--;
  } } }
  return [0,4,3,2,1].every((s,i) => s == ships[i]);
}
*/

function isOkayNumberOfShips(detectedShips) {
  return (
    detectedShips[0] == 4 &&
    detectedShips[1] == 3 &&
    detectedShips[2] == 2 &&
    detectedShips[3] == 1
  );
}

function addShip(detectedShips, shipPosition) {
  const shipLength = getShipLength(shipPosition);
  if (detectedShips[shipLength]) {
    detectedShips[shipLength]++;
  } else {
    detectedShips[shipLength] = 1;
  }
}

function getShipLength(shipPosition) {
  return (
    shipPosition.endX - shipPosition.startX ||
    shipPosition.endY - shipPosition.startY
  );
}

function getShipEndPosition(battlefield, row, col, horizontal) {
  if (horizontal) {
    if (
      row + 1 < 0 ||
      row + 1 >= battlefield.length ||
      !battlefield[col][row + 1]
    )
      return row;
    row = row + 1;
  } else {
    if (
      col + 1 < 0 ||
      col + 1 >= battlefield.length ||
      !battlefield[col + 1][row]
    )
      return col;
    col = col + 1;
  }

  return getShipEndPosition(battlefield, row, col, horizontal);
}

function isShip(battlefield, row, col) {
  if (
    row < 0 ||
    col < 0 ||
    row >= battlefield.length ||
    col >= battlefield.length
  )
    return;
  return Boolean(battlefield[col][row]);
}

function isBattlefieldValid(battlefield, shipPosition) {
  let iterationsX = shipPosition.endX - shipPosition.startX;
  let iterationsY = shipPosition.endY - shipPosition.startY;
  for (let i = -1; i <= iterationsX + iterationsY + 1; i++) {
    if (iterationsX) {
      if (
        isShip(battlefield, shipPosition.startX + i, shipPosition.startY - 1) ||
        isShip(battlefield, shipPosition.startX + i, shipPosition.startY + 1)
      )
        return false;
    } else {
      if (
        isShip(battlefield, shipPosition.startX - 1, shipPosition.startY + i) ||
        isShip(battlefield, shipPosition.startX + 1, shipPosition.startY + i)
      )
        return false;
    }
  }
  return true;
}

function updateShipBattlefield(battlefield, shipPosition) {
  let iterationsX = shipPosition.endX - shipPosition.startX;
  let iterationsY = shipPosition.endY - shipPosition.startY;
  for (let i = 0; i <= iterationsX + iterationsY; i++) {
    if (iterationsX) {
      battlefield[shipPosition.startY][shipPosition.startX + i] = 0;
    } else {
      battlefield[shipPosition.startY + i][shipPosition.startX] = 0;
    }
  }
  return battlefield;
}

function getShipPosition(battlefield, row, col) {
  let shipPosition = {
    startX: null,
    startY: null,
    endX: null,
    endY: null,
  };
  const horizontal =
    isShip(battlefield, row + 1, col) || isShip(battlefield, row - 1, col);
  const vertical =
    isShip(battlefield, row, col + 1) || isShip(battlefield, row, col - 1);

  if (!horizontal && !vertical) {
    shipPosition.startX = shipPosition.endX = row;
    shipPosition.startY = shipPosition.endY = col;
    return shipPosition;
  }

  const endPosition = getShipEndPosition(battlefield, row, col, horizontal);
  shipPosition.startY = col;
  shipPosition.startX = row;
  shipPosition.endY = horizontal ? col : endPosition;
  shipPosition.endX = horizontal ? endPosition : row;

  return shipPosition;
}

function validateBattlefield(shipBattlefield) {
  const battlefield = JSON.parse(JSON.stringify(shipBattlefield));
  let validBattlefield = true;
  let shipPosition;
  const detectedShips = [];
  for (let row = 0; validBattlefield && row < battlefield.length; row++) {
    for (
      let col = 0;
      validBattlefield && col < battlefield[row].length;
      col++
    ) {
      if (battlefield[col][row]) {
        shipPosition = getShipPosition(battlefield, row, col);
        validBattlefield = isBattlefieldValid(battlefield, shipPosition);
        updateShipBattlefield(battlefield, shipPosition);
        addShip(detectedShips, shipPosition);
      }
    }
  }
  if (validBattlefield) {
    return isOkayNumberOfShips(detectedShips);
  }
  return validBattlefield;
}

const fields = [
  [
    [1, 0, 0, 0, 0, 1, 1, 0, 0, 0],
    [1, 0, 1, 0, 0, 0, 0, 0, 1, 0],
    [1, 0, 1, 0, 1, 1, 1, 0, 1, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ],
  //Without battleship
  [
    [1, 0, 0, 0, 0, 1, 1, 0, 0, 0],
    [1, 0, 1, 0, 0, 0, 0, 0, 1, 0],
    [1, 0, 1, 0, 1, 1, 1, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ],
  // Only one cruiser
  [
    [1, 0, 0, 0, 0, 1, 1, 0, 0, 0],
    [1, 0, 1, 0, 0, 0, 0, 0, 1, 0],
    [1, 0, 1, 0, 1, 1, 0, 0, 1, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ],
  // Two destroyers
  [
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [1, 0, 1, 0, 0, 0, 0, 0, 1, 0],
    [1, 0, 1, 0, 1, 1, 0, 0, 1, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ],
];

for (let i = 0; i < fields.length; i++) {
  console.log(validateBattlefield(fields[i]));
}
