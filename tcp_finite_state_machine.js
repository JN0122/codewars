"use strict";

// https://www.codewars.com/kata/54acc128329e634e9a000362

const TCPStates = [
  "CLOSED",
  "LISTEN",
  "SYN_SENT",
  "SYN_RCVD",
  "ESTABLISHED",
  "CLOSE_WAIT",
  "LAST_ACK",
  "FIN_WAIT_1",
  "FIN_WAIT_2",
  "CLOSING",
  "TIME_WAIT",
];

const TCPEventMap = [
  ["CLOSED", "APP_ACTIVE_OPEN", "SYN_SENT"],
  ["CLOSED", "APP_PASSIVE_OPEN", "LISTEN"],
  ["LISTEN", "RCV_SYN", "SYN_RCVD"],
  ["LISTEN", "APP_SEND", "SYN_SENT"],
  ["LISTEN", "APP_CLOSE", "CLOSED"],
  ["SYN_RCVD", "APP_CLOSE", "FIN_WAIT_1"],
  ["SYN_RCVD", "RCV_ACK", "ESTABLISHED"],
  ["SYN_SENT", "RCV_SYN", "SYN_RCVD"],
  ["SYN_SENT", "RCV_SYN_ACK", "ESTABLISHED"],
  ["SYN_SENT", "APP_CLOSE", "CLOSED"],
  ["ESTABLISHED", "APP_CLOSE", "FIN_WAIT_1"],
  ["ESTABLISHED", "RCV_FIN", "CLOSE_WAIT"],
  ["FIN_WAIT_1", "RCV_FIN", "CLOSING"],
  ["FIN_WAIT_1", "RCV_FIN_ACK", "TIME_WAIT"],
  ["FIN_WAIT_1", "RCV_ACK", "FIN_WAIT_2"],
  ["CLOSING", "RCV_ACK", "TIME_WAIT"],
  ["FIN_WAIT_2", "RCV_FIN", "TIME_WAIT"],
  ["TIME_WAIT", "APP_TIMEOUT", "CLOSED"],
  ["CLOSE_WAIT", "APP_CLOSE", "LAST_ACK"],
  ["LAST_ACK", "RCV_ACK", "CLOSED"],
];

class FSM {
  constructor() {
    this.verticies = new Map();
    this.currentVertex = undefined;
  }

  addVertex(vertex) {
    this.verticies.set(vertex, new Map());
  }

  addVerticies(verticies) {
    verticies.map((vertex) => this.addVertex(vertex));
  }

  addElement(startVertex, edge, destVertex) {
    this.verticies.get(startVertex).set(edge, destVertex);
  }

  addElements(elements) {
    elements.map((event) => this.addElement(event[0], event[1], event[2]));
  }

  setInitialVertex(newVertex) {
    if (this.verticies.has(newVertex)) this.currentVertex = newVertex;
    else throw new TypeError("Vertex isn't in the added verticies!");
  }

  nextVertex(edge) {
    this.currentVertex = this.verticies.get(this.currentVertex).get(edge);
    if (this.currentVertex) return this.currentVertex;
    throw new Error("Edge does not not point to vertex!");
  }
}

function traverseTCPStates(eventList) {
  const fsm = new FSM();
  fsm.addVerticies(TCPStates);
  fsm.addElements(TCPEventMap);
  fsm.setInitialVertex("CLOSED");

  try {
    eventList.map((event) => {
      fsm.nextVertex(event);
    });
    return fsm.currentVertex;
  } catch {
    return "ERROR";
  }
}

console.log(traverseTCPStates(["APP_ACTIVE_OPEN", "RCV_SYN_ACK", "RCV_FIN"])); // "CLOSE_WAIT"
console.log(traverseTCPStates(["APP_PASSIVE_OPEN", "RCV_SYN", "RCV_ACK"])); // "ESTABLISHED"
console.log(
  traverseTCPStates(["APP_ACTIVE_OPEN", "RCV_SYN_ACK", "RCV_FIN", "APP_CLOSE"])
); // "LAST_ACK"
console.log(traverseTCPStates(["APP_ACTIVE_OPEN"])); // "SYN_SENT"
console.log(
  traverseTCPStates([
    "APP_PASSIVE_OPEN",
    "RCV_SYN",
    "RCV_ACK",
    "APP_CLOSE",
    "APP_SEND",
  ])
); // "ERROR";
console.log(traverseTCPStates([])); // "CLOSED";
