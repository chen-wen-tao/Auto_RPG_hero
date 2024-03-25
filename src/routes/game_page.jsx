import "../style/game.css";
import React, { Component, useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Character from "../model/character";
import Enemy from "../model/enemy";
import Weapon from "../model/weapon";
import Armor from "../model/armor";
import Weapon_list from "../assets/weapon_list";
import Armor_list from "../assets/armor_list";
import Enemy_name_list from "../assets/enemy_name_list";
import { myFirebase } from "../model/MyFirebase";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

export default function Game_page({ currentcharacter }){
    const itemRef = useRef();
    const healthbar1 = useRef();
    const healthbar2 = useRef();
    const me = {};
    
    me.weaponlist = Weapon_list();
    me.armorlist = Armor_list();
    me.namelst = Enemy_name_list();
    me.currentcharacter = Character(currentcharacter.playername, currentcharacter.name, currentcharacter.profession, false,
        currentcharacter.health, currentcharacter.damage_rate, currentcharacter.damage_block_rate, currentcharacter.weapon, currentcharacter.armor,
        currentcharacter.inventory);
    me.tmp_enemy = Enemy(me.namelst.name_list[Math.floor(Math.random() * me.namelst.name_list.length)], 
        Math.floor(Math.random() * 500),
        20,
        30,
        me.weaponlist.weapon_list[Math.floor(Math.random() * me.weaponlist.weapon_list.length)],
        me.armorlist.armor_list[Math.floor(Math.random() * me.armorlist.armor_list.length)]
        );
    const [currentenemy, setcurrentenemy] = useState(me.tmp_enemy);
    const [currentchar, setcurrentchar] = useState(me.currentcharacter);

    const onClickChangeItem = () => {
        let tmp;
        console.log(me.currentcharacter.inventory);
        if ((tmp = me.currentcharacter.inventory.find((element) => element.name == itemRef.current.value)) != null){
            console.log(tmp);
            let index = me.currentcharacter.inventory.indexOf(tmp)
            if (index > -1) {
                me.currentcharacter.inventory.splice(index, 1);
            }
            if (tmp.damage_rate != null){
                me.currentcharacter.inventory.push(me.currentcharacter.weapon);
                
            }
            else{
                me.currentcharacter.inventory.push(me.currentcharacter.armor);
            }
            me.currentcharacter.equip_item(tmp);
            setcurrentchar(me.currentcharacter);
        }
        else{
            alert("You dont have the item!!!");
        }

    }


    const onClickFight =() => {
        console.log(me.currentcharacter.inventory);
        me.currentcharacter.obtain_item(me.weaponlist.weapon_list[Math.floor(Math.random() * me.weaponlist.weapon_list.length)]);
        console.log(me.currentcharacter.inventory);
        if (me.currentcharacter.fight(currentenemy)){
            healthbar1.current.style.background = "linear-gradient(to right, red 100%, blue 100%)";
        }
        else{
            healthbar2.current.style.background = "linear-gradient(to left, red 100%, blue 0%)";
        }
        me.tmp_enemy = Enemy(me.namelst.name_list[Math.floor(Math.random() * me.namelst.name_list.length)], 
            Math.floor(Math.random() * 500),
            20,
            30,
            me.weaponlist.weapon_list[Math.floor(Math.random() * me.weaponlist.weapon_list.length)],
            me.armorlist.armor_list[Math.floor(Math.random() * me.armorlist.armor_list.length)]
            );
        setcurrentenemy(me.tmp_enemy);
        setcurrentchar(me.currentcharacter);
        console.log(me.currentcharacter.inventory);
        if (me.currentcharacter.health == 0){
            me.currentcharacter.die();
        }
    }

    return (
        <>
            <div className="grid-container">
                <div className="health-bar-1" id="character-health-bar" ref={healthbar1}>Health Bar</div>
                <div className="health-bar-2" id="enemy-health-bar" ref={healthbar2}>Health Bar</div>
                <div className="character">{currentchar.show_stat()}</div>
                <div className="enemy">{currentenemy.show_stat()}</div>
                <div className="item"><input type="text" placeholder="Enter Item Name" id="item_name" ref={itemRef}/></div>
                <div className="bag"><button onClick={onClickChangeItem}>Change Gears</button></div>
                <div className="fight"><button onClick={onClickFight}>Fight</button></div>
            </div>
        </>
    );
}

// Game_page.propTypes = {
//     currentplayer: PropTypes.shape({
//         playername: PropTypes.string,
//         name: PropTypes.string,
//         profession: PropTypes.string,
//         health: PropTypes.number,
//         damage_rate: PropTypes.number,
//         damage_block_rate: PropTypes.number,
//         weapon: PropTypes.shape({
//             name: PropTypes.string,
//             damage_rate: PropTypes.number,
//             show_stat: PropTypes.func,
//         }),
//         armor: PropTypes.shape({
//             name: PropTypes.string,
//             damage_block_rate: PropTypes.number,
//             show_stat: PropTypes.func,
//         }),
//         lvl_up: PropTypes.func,
//         die: PropTypes.func,
//         equip_item: PropTypes.func,
//         obtain_item: PropTypes.func,
//         change_name: PropTypes.func,
//         show_stat: PropTypes.func,
//     }),
//   };