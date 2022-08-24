import Agent from "./agent.js";

const agent = new Agent();

agent.compute('S');
console.log(agent.compute('0123'));
console.log(agent.compute('4567'));
console.log(agent.compute('4567'));
console.log(agent.compute('7395'));
console.log(agent.compute('9125'));
console.log(agent.compute('5473'));
console.log(agent.compute('6285'));