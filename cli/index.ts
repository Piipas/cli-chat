import chalk from "chalk";
import readline from "readline";
import io from "socket.io-client";

let username: string = "";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.question("Enter your username: ", (answer) => {
    username = answer.trim();

    const socket = io("http://localhost:3000");

    socket.on("connect", () => {
        console.log(chalk.green("Connected to server"));
    });

    socket.on("message", (data) => {
        username !== data.username
            ? console.log(chalk.blue(`${data.username}: ${data.message}`))
            : null;
    });

    rl.on("line", (input) =>
        socket.emit("message", { username, message: input })
    );
});
