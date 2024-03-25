import "../style/game.css";
import React, { Component, useState, useRef } from "react";
import { Link } from "react-router-dom";
import Character from "../model/character";
import Enemy from "../model/enemy";
import Weapon from "../model/weapon";
import Armor from "../model/armor";
import Weapon_list from "../assets/weapon_list";
import Armor_list from "../assets/armor_list";
import Enemy_name_list from "../assets/enemy_name_list";
import { myFirebase } from "../model/MyFirebase";

export default function Create_character({ currentplayer }){
    const nameRef = useRef();
    const warriortRef = useRef();
    const archorRef = useRef();
    const megaRef = useRef();

    const [characterInfo, setcharacterInfo] = useState([]);
    console.log("currentplayer");
    console.log(currentplayer);

    const onClickCreateNewCharacter = () => {
        if (warriortRef === true){
            setcharacterInfo(Character(currentplayer, nameRef,"warrior"));
            return myFirebase.createNewCharacter(currentplayer, nameRef, "warrior");
        }
        else if (archorRef === true){
            setcharacterInfo(Character(currentplayer, nameRef,"archor"));
            return myFirebase.createNewCharacter(currentplayer, nameRef, "archor");
        }
        else if (megaRef === true){
            setcharacterInfo(Character(currentplayer, nameRef,"mega"));
            return myFirebase.createNewCharacter(currentplayer, nameRef, "mega");
        }
        else {
            alert("please specify all the fields");
        }
        
    }

    // constructor(props){
    //     super(props);
    //     this.created = false;
    //     this.hero;
    //     this.weaponlist = new Weapon_list();
    //     this.armorlist = new Armor_list();
    //     this.namelst = new Enemy_name_list();
    //     this.tmp_enemy = new Enemy(this.namelst.name_list[Math.floor(Math.random() * this.namelst.name_list.length)], 
    //     Math.floor(Math.random() * 500),
    //     20,
    //     30,
    //     this.weaponlist.weapon_list[Math.floor(Math.random() * this.weaponlist.weapon_list.length)],
    //     this.armorlist.armor_list[Math.floor(Math.random() * this.armorlist.armor_list.length)]
    //     );
    // }
    return (
        <>
        <div className="center">
            <label>Name:</label><br/>
            <input type="text" id="name" name="name" ref={nameRef}/><br/>
            <p>Please select your class:</p>
            <input type="radio" id="warrior" name="class" value="Warrior" ref={warriortRef}/>
            <label>Warrior</label><br/>
            <input type="radio" id="archor" name="class" value="Archor" ref={archorRef}/>
            <label>Archor</label><br/>
            <input type="radio" id="mage" name="class" value="Mage" ref={megaRef}/>
            <label>Mage</label>
            <button onClick={onClickCreateNewCharacter}>Start</button>
                
                {/* // () => {
                // if(document.getElementById("warrior").checked){
                //     this.hero = new Character(document.getElementById("name").value, "Warrior", 200, 1000, 1000, new Weapon("sword", 20), new Armor("Plate armour", 30));
                //     this.created = true;
                //     // alert("warrior");

                // }
                // if(document.getElementById("archor").checked){
                //     this.hero = new Character(document.getElementById("name").value, "Archor", 150, 120, 120, new Weapon("bow", 30), new Armor("Leather Coat", 20));
                //     this.created = true;
                //     // alert("archor");
                // }
                // if(document.getElementById("mage").checked){
                //     this.hero = new Character(document.getElementById("name").value, "Mage", 120, 150, 80, new Weapon("wand", 40), new Armor("Cloak", 10));
                //     this.created = true;
                //     // alert("mage");
                // }
                // alert(this.hero.show_stat());
                // this.forceUpdate(); */} 
        </div>
        </>
    );  

    // if (this.created === false){

    // }
    // else{

    //     return (
    //         <>
    //             <div className="grid-container">
    //                 <div className="health-bar-1" id="character-health-bar">Health Bar</div>
    //                 <div className="health-bar-2" id="enemy-health-bar">Health Bar</div>
    //                 <div className="character">{this.hero.show_stat()}</div>
    //                 <div className="enemy">{this.tmp_enemy.show_stat()}</div>
    //                 <div className="item"><input type="text" placeholder="Enter Item Name" id="item_name"/></div>
    //                 <div className="bag"><button
    //                 onClick={() => {
    //                     let tmp;
    //                     if ((tmp = this.hero.inventory.find((element) => element.name == document.getElementById("item_name").value)) != null){

    //                         let index = this.hero.inventory.indexOf(tmp)
    //                         if (index > -1) {
    //                             this.hero.inventory.splice(index, 1);
    //                         }
    //                         if (tmp instanceof Weapon){
    //                             this.hero.inventory.push(this.hero.weapon);
                                
    //                         }
    //                         else{
    //                             this.hero.inventory.push(this.hero.armor);
    //                         }
    //                         this.hero.equip_item(tmp);
    //                         this.forceUpdate();
    //                     }
    //                     else{
    //                         alert("You dont have the item!!!");
    //                     }

    //                 }}
                    
                    
    //                 >Change Gears</button></div>
    //                 <div className="fight"><button 
    //                 onClick={() => {
    //                     if (this.hero.fight(this.tmp_enemy)){
    //                         document.getElementById("enemy-health-bar").style.background = "linear-gradient(to right, red 100%, blue 0%)";
    //                     }
    //                     else{
    //                         document.getElementById("character-health-bar").style.background = "linear-gradient(to left, red 100%, blue 0%)";
    //                     }
    //                     this.tmp_enemy = new Enemy(this.namelst.name_list[Math.floor(Math.random() * this.namelst.name_list.length)], 
    //                         Math.floor(Math.random() * 500),
    //                         20,
    //                         30,
    //                         this.weaponlist.weapon_list[Math.floor(Math.random() * this.weaponlist.weapon_list.length)],
    //                         this.armorlist.armor_list[Math.floor(Math.random() * this.armorlist.armor_list.length)]
    //                         );
    //                     if (this.hero.health == 0){
    //                         this.created = false;
                            
    //                     }
    //                     this.forceUpdate();
    //                 }}>Fight</button></div>
    //             </div>
    //         </>
    //     );
    // }

    
}




