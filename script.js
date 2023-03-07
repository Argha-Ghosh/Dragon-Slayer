//Staritng out with JavaScript

//declaring variables

let xp = 0;
let health = 100;
let maxHealth = 100;
let currentWeapon = 0;
let gold = 50;
let monsterHealth;
let fighting = 0;
let inventory = ["stick"];
let damage;

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

const weapons = [
    {
        name: "Stick",
        power: 10
    },
    {
        name: "Dagger",
        power: 50
    },
    {
        name: "Claw Hammer",
        power: 80
    },
    {
        name: "Sword of Exibus",
        power: 150
    }
];

const monsters = [
    {
        name: "Slime",
        lvl: 2,
        health: 50
    },
    {
        name: "Scribble",
        lvl: 8,
        health: 150
    },
    {
        name: "Frost Dragon",
        lvl: 20,
        health: 500
    }
];

const locations = [
    {
        name: "backyard",
        button_text: ["Go to Town","Go to Cave","Sleep "],
        "button functions": [goTown,goCave,sleep],
        text: "You are in your backyard, wanna take rest or continue adventure?"
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
        button_text: ["Fight Slime","Fight Scribble","Get out of Cave"],
        "button functions": [fightSlime,fightScribble,exitCave],
        text: "You're inside the cave now. It's too silent and cold inside. You can't see that well but hear some noises..."
    },
    {
        name: "toFight",
        button_text: ["Attack","Dodge","Run"],
        "button functions": [attack,dodge,exitCave],
        text: "A " + monsters[fighting].name + " appeared!!!!"
    }
];

//intializing buttons

button1.onclick = goTown;
button2.onclick = goCave;
button3.onclick = sleep;


function update(location){
    monsterStats.style.display = "none";
    
    button1.innerText = location.button_text[0];
    button2.innerText = location.button_text[1];
    button3.innerText = location.button_text[2];

    button1.onclick = location["button functions"][0];
    button2.onclick = location["button functions"][1];
    button3.onclick = location["button functions"][2];

    text.innerText=location.text;
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

function exitCave() {
    update(locations[0])
}

function sleep() {
    if(health <= (maxHealth-20)){
        health+=20;
        healthValue.innerText = health;
        text.innerText="You have well slept and recovered your heath.";
    }else{
        health = maxHealth;
        healthValue.innerText = health;
        text.innerText="You have well slept and recovered your heath.";
    }
}


function buyHealth() {
    if(gold>=10){
        if(health <= (maxHealth-10)){
            gold-=10;
            health+=10;
            goldValue.innerText = gold;
            healthValue.innerText = health;
            text.innerText = "you successfully bought 10 health :)";
        }else if(health<maxHealth){
            let amount = maxHealth-health;
            gold -=amount;
            goldValue.innerText = gold;
            health = maxHealth;
            healthValue.innerText = health;
            text.innerText = "you successfully bought " + amount + " health :)";
        }else{
            gold-=10;
            goldValue.innerText = gold;
            maxHealth+=10;
            health = maxHealth;
            healthValue.innerText = health;
            text.innerText = "your increased maximum health is now: " + maxHealth;
        }
    }else{
        text.innerText = "You don't have enough gold to buy health. Go earn some coins and visit again :)";
    }
}

function buyWeapon() {
    if(currentWeapon < weapons.length - 1){
        if(gold>=30){
            gold-=30;
            goldValue.innerText = gold;
            currentWeapon++;
            let newWeapon = weapons[currentWeapon].name;
            text.innerText = "You now have a "+ newWeapon + ".";
            inventory.push(newWeapon);
            text.innerText += "In your inventory now you have " + inventory;
        }else{
            text.innerText = "You don't have enough gold to buy any weapon. Go earn some coins and visit again :)";
        }
    }else{
        text.innerText = "You already have the most powerful weapon :)";
        button2.innerText = "Sell Weapon";
        button2.onclick = sellWeapon;
    }
}

function sellWeapon(){
    if(inventory.length>1){
        gold+=20;
        goldValue.innerText = gold;
        let currentSellingWeapon = inventory.shift;
        text.innerText = "You sold a " + currentSellingWeapon + " for 20 gold.";
        text.innerText += "In your inventory you now have:"+ inventory;
    }else{
        text.innerText = "You can't sell your only weapon."
    }
}



function fightSlime() {
    fighting = 0;
    goFight();
}

function fightScribble() {
    fighting = 1;
    goFight();
}

function fightDragon() {
    fighting = 2;
    goFight();
}

function goFight() {
    update(locations[4]);
    monsterHealth = monsters[fighting].health;
    monsterHealthText.innerText = monsterHealth;
    monsterNameText.innerText = monsters[fighting].name;
    monsterStats.style.display = "block";
    

}

function attack(){
    text.innerText = "the " + monsters[fighting].name + " attacks!";
    text.innerText += "you attack the " + monsters[fighting].name + " with your " + weapons[currentWeapon].name + ".";

    if(health >= monsters[fighting].lvl){
        health -= monsters[fighting].lvl;
    }else{
        health = 0;
    }

    healthValue.innerText = health;
    damage = weapons[currentWeapon].power + Math.floor(Math.random * xp) + 1;

    if(monsterHealth >= damage){
        monsterHealth -=damage;
    }else{
        monsterHealth = 0;
    }
    monsterHealthText.innerText = monsterHealth;

    if(health == 0){
        lose();
    }else if(monsterHealth == 0){
        (monsters[fighting]==monsters[2])? win():defeatMonster();
    }
}

function dodge(){
    text.innerText = "You dodge the attack from the " + monsters[fighting].name + ".";
}

function lose(){

}

function win(){

}

function defeatMonster(){
    gold += Math.floor(monsters[fighting].lvl * 6.7);
    xp+= monsters[fighting].lvl;

    goldValue.innerText = gold;
    xpValue.innerText = xp;

    update(locations[3]);
    text.innerText = "The monster screams \"Arg!\" as it dies. You gained experience points and gold. What do you want to do?";
}