"use strict";

/*
log in
sign up
exit
search
log out
follow
*/

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

        // Check if email exist in memory
        const checkEmail = () => {
            for (let i = 0; i < memory.length; i++) {
                if (memory[i].email === email) {
                    index = i;
                }
            }

            //If it doesn't
            if (index < 0) {
                alert("We don’t have that account");
                logIn();
            }
        };
        checkEmail();

        const pass = askUser("Enter your password!");
        if (memory[index].password !== pass) {
            alert("The password is incorrect");
            logIn();
        }

        if (online === 1) {
            alert("You are already logged in");
            commandsSwitch();
        }

        online = 1;
        indexUser = index;
        alert(`Welcome ${memory[index].name}`);
        commandsSwitch();
    };

    // Command Sign Up
    const signUp = () => {
        const name = askUser("Enter your name!");

        const askEmail = () => {
            const email = askUser("Enter your email!");

            //Command for exit askEmail
            const exitEmail = () => {
                const regex = email.match(/^exit\*/gi);
                if (regex) {
                    commandsSwitch();
                }
            };
            exitEmail();

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
                let n = 0;
                for (let i = 0; i < memory.length; i++) {
                    if (memory[i].email === email) {
                        n = 1;
                    }
                }
                console.log({ memory });
                if (n === 1) {
                    alert("Sorry, that email is already taken");
                    askEmail();
                }
            };
            emailExist();

            //Check if someone is logged
            const log1 = () => {
                if (online === 1) {
                    alert("log out first before you create a new account");
                    askEmail();
                }
            };
            log1();

            return email;
        };

        // Create a new user based on User class
        const newProfile = new User(
            name,
            askEmail(),
            askUser("Enter your password!")
        );

        alert("Thank you for your registration, welcome!");

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
                commandsSwitch();
            }
        };
        log0();

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
                commandsSwitch();
            }
        };
        checkEmail();

        alert(
            `${memory[index].name}\n${memory[index].email}\nFollowers: ${memory[index].followers}\nFollowing: ${memory[index].following}`
        );
    };
    // Command Log out
    const logOut = () => {
        if (online === 0) {
            alert("Sorry, you have to be logged in to use that functionality");
            commandsSwitch();
        }

        alert("You logged out, see you later");
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
                commandsSwitch();
            }
        };
        emailExist();

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

        const regex = command.match(/^([a-zA-Z]+ [a-zA-Z]+)|([a-zA-Z]+)/g);
        console.log(regex);

        switch (regex[0].toLowerCase()) {
            case "log in":
                logIn();
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
                console.log("test4");
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

        console.log(memory);
    };
    commandsSwitch();
};
miniInstagram();
