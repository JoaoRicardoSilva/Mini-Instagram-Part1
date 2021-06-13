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
        this.Following = 0;
    }
}

// Memory to save new Users
const memory = [];

//

// Generic function to the user give some input
const askUser = (str) => window.prompt(str);

// Command Log In
const logIn = () => {
    const email = askUser("Enter your email!");
    let n = 0;
    let filter = memory.filter((i) => {
        memory[i].email === email;
        n = i;
    });

    if (filter) {
        return;
    } else {
        alert("We don’t have that account");
        commandsSwitch();
    }

    const password = askUser("Enter your password!");
    if (memory[n].password !== password) {
        alert("The password is incorrect");
    }
};

// Command Sign Up
const signUp = () => {
    const name = askUser("Enter your name!");

    const askEmail = () => {
        const email = askUser("Enter your email!");

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
