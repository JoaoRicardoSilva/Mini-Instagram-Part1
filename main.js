"use strict";

/*
log in
sign up
exit
search
log out
follow
*/

// Base class for new Users
class User {
    constructor(name, email, password) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.followers = 0;
        this.following = 0;
    }
}

// Memory to save new Users
const memory = [];

// Online state:
//      0: No user is online
//      1: Someone is online
let online = 0;

// Generic function to the user give some input
const askUser = (str) => window.prompt(str);

// Command Log In
const logIn = () => {
    console.log({ memory });

    let n = -1;

    const email = askUser("Enter your email!");

    // Check if email exist in memory
    const checkEmail = () => {
        for (let i = 0; i < memory.length; i++) {
            if (memory[i].email === email) {
                n = i;
            }
        }

        //If it doesn't
        if (n < 0) {
            alert("We don’t have that account");
            logIn();
        }
    };
    checkEmail();

    console.log({ n });

    const pass = askUser("Enter your password!");
    if (memory[n].password !== pass) {
        alert("The password is incorrect");
        logIn();
    }

    if (online === 1) {
        alert("You are already logged in");
        commandsSwitch();
    }

    online = 1;
    alert(`Welcome ${memory[n].name}`);
    commandsSwitch();
};

// Command Sign Up
const signUp = () => {
    const name = askUser("Enter your name!");

    const askEmail = () => {
        const email = askUser("Enter your email!");

        //Check if is an email
        const validateEmail = (email) => {
            // Not real life regex for validate emails
            /^[a-zA-Z0-9]+\@[a-zA-Z]+\.[a-zA-Z]+$/.test(email)
                ? email
                : (() => {
                      alert("Insert a valid email");
                      askEmail();
                  })();
        };
        validateEmail(email);

        //Check if email already exist
        const emailExist = () => {
            const verifyEmail = memory.filter((e) => {
                memory[e].email === email;
            });
            if (!verifyEmail) {
                alert("Sorry, that email is already taken");
                commandsSwitch();
            }
        };
        emailExist();

        //Check if someone is logged
        const log1 = () => {};

        return email;
    };

    // Create a new user based on User class
    const newProfile = new User(
        name,
        askEmail(),
        askUser("Enter your password!")
    );

    return memory.push(newProfile);
};

// Command Exit
const exit = () => alert("You left the program, bye");

// Check and execute the command
const commandsSwitch = () => {
    // Get the command from the user
    let command = askUser("What's your command?");

    const regex = command.match(/^([a-zA-Z]+ [a-zA-Z]+)|([a-zA-Z]+)/g);
    console.log(regex);

    switch (regex[0].toLowerCase()) {
        case "log in":
            logIn();
            break;
        case "sign up":
            signUp();
            commandsSwitch();
            break;
        case "exit":
            exit();
            break;
        case "search":
            console.log("test4");
            break;
        case "log out":
            console.log("test5");
            break;
        case "follow":
            console.log("test6");
            break;

        default:
            window.alert("We don’t have that option");
            break;
    }

    console.log(memory);
};
commandsSwitch();
