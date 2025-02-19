var prompt = require('prompt-sync')();
const age = prompt("Enter your age:");
if(age<18){
    console.log("You get 20% discount");
}
else if(age>=18 && age<65){
    console.log("Normal ticket price applies");
}
else {
    console.log("You get a 30% senior discount");
}