const {createWriteStream} = require('fs');
const {resolve} = require('path');

let fileStream = createWriteStream(resolve(__dirname, 'text.txt'), {flags: 'a'});
let input = process.openStdin();
console.log("Welcome to writing program. " +
    "\nIf you need some help please type .help." +
    "\nProvide your input that you want to save into the file:");
input.addListener('data', d => {

    if(d.toString().trim() === '.exit' || d.toString().trim() === '.quit'){
       input.end(()=> {
          console.log("The program will exit soon. Thank you for using our application.");
          fileStream.close();
          process.exit();
       });
    } else if(d.toString().trim() === '.help'){
        console.log("Here are some commands that acceptable by the application:\n" +
            "\t\t .help - Display the available commands into the console\n" +
            "\t\t .exit or .quit - Terminates the application. \n" +
            "Please enter your input to save information into the file: \n");
    } else {
        fileStream.write(d.toString());
    }
})