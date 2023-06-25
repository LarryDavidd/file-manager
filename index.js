import os from "os";
import readline from "readline";
import path from "path";
import { error } from "console";

import { up, cd, ls } from './src/navigation.js';

const goodbyeMess = (userName) => {
  console.log(`Thank you for using File Manager, ${userName}, goodbye!`);
  process.exit();
};

// let curDirectory = os.homedir();
let curDir = process.cwd();

const username = process.argv.find(a => a.startsWith('--username=')).split('=').pop();
console.log(`Welcome to the File Manager, ${username}!`);
console.log(`You are currently in ${curDir}`);


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.prompt()

rl.on("SIGINT", () => {
  goodbyeMess(username);
});

rl.on("line", (inputLine) => {
  if (inputLine.trim().toLowerCase().includes(".exit")) {
    goodbyeMess(username);
  }
});

rl.on('line', async (line) => {
  const [command, ...params] = line.trim().split(' ');
  try {
    switch (command) {
      case 'up':
        curDir = up(curDir);
		    console.log(`You are currently in ${curDir}`);
        break;
      case 'ls':
        await ls(curDir);
        break;
      case 'cd':
        curDir = await cd(args[0], curDir);
		    console.log(`You are currently in ${curDir}`);

        break;
      
      default:
        console.log('Invalid input');
        break;
    }
  } catch(e) {
    throw new Error(e);
  }
});