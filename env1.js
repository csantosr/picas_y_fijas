import Agent from "./agent.js";
import PromptSync from "prompt-sync";

const prompt = PromptSync();

const agent = new Agent();

console.log('agent.compute(S)', agent.compute('S'));
// console.log('agent.compute(#)', agent.compute('#'));

while (1) {
  const result = prompt('Result ');
  console.log(`agent.compute(${result})`, agent.compute(result));
  // console.log('agent.compute(#)', agent.compute('#'));

}