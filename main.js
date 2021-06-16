"use strict";

const miniInstagram = () => {
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

    // Index in the memory for the user that have log
    let indexUser = -1;

    // Generic function to the user give some input
    const askUser = (str) => window.prompt(str);

    // Command Log In
    const logIn = () => {
        //console.log({ memory });
        let index = -1;

        const email = askUser("Enter your email!");

        const pass = askUser("Enter your password!");

        // Check if email exist in memory
        const checkEmail = () => {
            for (let i = 0; i < memory.length; i++) {
                if (memory[i].email === email) {
                    index = i;
                }
            }
        };
        checkEmail();

        //If email doesn't exist
        if (index < 0) {
            alert("We don't have that account");
            alert("");
            return;
        }

        //If the password isn't correct
        if (index > -1) {
            if (memory[index].password !== pass) {
                alert("The password is incorrect");
                alert("");
                return;
            }
        }

        //If is someone already online
        if (online === 1) {
            alert("You are already logged in");
            return;
        }

        online = 1;
        indexUser = index;
        alert(`Welcome, ${memory[index].name}.`);
        alert("");
        return;
    };

    // Command Sign Up
    const signUp = () => {
        const name = askUser("Enter your name!");
        let email = askUser("Enter your email!");
        let stop = false;
        // let emailLoopVar = null

        let emailLoop = () => {
            //Command for exit askEmail
            if (/^exit\*/gi.test(email)) {
                stop = true;
                return false;
            }

            //Check if is a valid email
            if (!/^[a-zA-Z0-9]+\@[a-zA-Z]+\.[a-zA-Z]+$/.test(email)) {
                alert("Insert a valid email");
                alert("");
                return true;
            }

            //Check if email already exist
            const emailExist = () => {
                let n = 0;
                for (let i = 0; i < memory.length; i++) {
                    if (memory[i].email === email) {
                        n = 1;
                    }
                }
                console.log({ memory });
                if (n === 1) {
                    alert("Sorry, that email is already taken");
                    return true;
                }
            };
            if (emailExist()) {
                return true;
            }

            //Check if someone is online
            if (online === 1) {
                alert("log out first before you create a new account");
                return true;
            }
        };

        while (emailLoop()) {
            email = askUser("Enter your email!");
        }

        if (stop === true) {
            return;
        }

        // Create a new user based on User class
        const newProfile = new User(
            name,
            email,
            askUser("Enter your password!")
        );

        alert("Thank you for your registration, welcome!");
        alert("");

        return memory.push(newProfile);
    };

    // Command Exit
    const exit = () => alert("You left the program, bye");

    // Command Search
    const search = () => {
        const email = askUser("Enter your email");
        let index = -1;

        //Check if User is logged
        const log0 = () => {
            if (online === 0) {
                alert(
                    "Sorry, you have to be logged in to use that functionality"
                );
                alert("");
                return true;
            }
        };
        if (log0()) {
            return;
        }

        // Check if email exist in memory
        const checkEmail = () => {
            for (let i = 0; i < memory.length; i++) {
                if (memory[i].email === email) {
                    index = i;
                }
            }

            //If it doesn't
            if (index < 0) {
                alert("We have no results for that query");
                return true;
            }
        };
        if (checkEmail()) {
            return;
        }

        alert(
            `${memory[index].name}\n${memory[index].email}\nFollowers: ${memory[index].followers}\nFollowing: ${memory[index].following}`
        );
        alert("");
    };
    // Command Log out
    const logOut = () => {
        if (online === 0) {
            alert("Sorry, you have to be logged in to use that functionality");
            alert("");
            return;
        }

        alert("You logged out, see you later");
        alert("");
        return;
    };

    // Command Follow
    const follow = () => {
        const followEmail = askUser(
            "What's the email of the person that you want to folloW?"
        );
        let index = -1;

        //Check if email already exist
        const emailExist = () => {
            for (let i = 0; i < memory.length; i++) {
                if (memory[i].email === followEmail) {
                    index = i;
                }
            }

            if (index === -1) {
                alert("That user does not exist");
                return true;
            }
        };
        if (emailExist()) {
            return;
        }

        // Add 1 follower
        memory[index].followers++;

        // Add 1 following to the User
        memory[indexUser].following++;

        alert(`You now follow ${memory[index].name}`);
    };

    // Check and execute the command
    const commandsSwitch = () => {
        // Get the command from the user
        let command = askUser("What's your command?");
        console.log({ command });
        const regex = command.match(/^([a-zA-Z]+ [a-zA-Z]+)|([a-zA-Z]+)/g);
        console.log(regex);

        switch (regex[0].toLowerCase()) {
            case "log in":
                logIn();
                commandsSwitch();
                break;
            case "sign up":
                signUp();
                console.log({ memory });
                commandsSwitch();
                break;
            case "exit":
                exit();
                break;
            case "search":
                search();
                commandsSwitch();
                break;
            case "log out":
                logOut();
                commandsSwitch();
                break;
            case "follow":
                follow();
                commandsSwitch();
                break;

            default:
                window.alert("We don’t have that option");
                break;
        }
    };
    commandsSwitch();
};
miniInstagram();
