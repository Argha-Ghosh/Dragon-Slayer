//Staritng out with JavaScript

//declaring variables

let xp = 0;
let health = 500;
let currentWeapon = 0;
let gold = 0;
let monsterHealth;
let fighting;
let inventory = ["stick"];

//creating instances of HTML elements to maipulate them

const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const xpValue = document.querySelector("#xp-value");
const healthValue = document.querySelector("#health-value");
const goldValue = document.querySelector("#gold-value");
const text = document.querySelector("#text");
const monsterStats = document.querySelector("#monster-stats");
const monsterHealthText = document.querySelector("#monster-health");
const monsterNameText = document.querySelector("#monster-name");
const locations = [
    {
        name: "backyard",
        button_text: ["Go to Town","Go to Cave","Sleep "],
        "button functions": [goTown,goCave,sleep],
        text: "You are in the town square, you see a sign that says \"Store\""
    },
    {
        name: "town",
        button_text: ["Go to Store","Go to Cave","Fight Dragon"],
        "button functions": [goStore,goCave,fightDragon],
        text: "You are in the town square, you see a sign that says \"Store\""
    },
    {
        name: "store",
        button_text: ["Buy Health(10 Gold)","Buy weapon(30 Gold)","Go to Town"],
        "button functions": [buyHealth,buyWeapon,goTown],
        text: "You are inside the store now, you see racks of potion, swords, daggers and many other weapons. What do you want to do?"
    },
    {
        name: "cave",
        button_text: ["Buy Health(10 Gold)","Buy weapon(30 Gold)","Go to Town"],
        "button functions": [buyHealth,buyWeapon,goTown],
        text: "You are inside the store now, you see racks of potion, swords, daggers and many other weapons. What do you want to do?"
    }
]


//intializing buttons

button1.onclick = goTown;
button2.onclick = goCave;
button3.onclick = sleep;


function update(location){
    button1.innerText = location.button_text[0];
    button2.innerText = location.button_text[1];
    button3.innerText = location.button_text[2];

    button1.onclick = location["button functions"][0];
    button2.onclick = location["button functions"][1];
    button3.onclick = location["button functions"][2];

    text.innerText=location.text;
    console.log("you are in somewhere");
}

function goBackyard() {
    update(locations[0]);
}

function goTown() {
    update(locations[1]);
}

function goStore() {
    update(locations[2]);
}

function goCave() {
    update(locations[3]);
}

function sleep() {

}

function fightDragon() {

}

function buyHealth() {

}

function buyWeapon() {

}