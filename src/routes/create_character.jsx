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

export default function Create_character({ currentplayer }){
    const navigate = useNavigate();
    const nameRef = useRef();
    const warriortRef = useRef();
    const archorRef = useRef();
    const megaRef = useRef();

    const onClickCreateNewCharacter = () => {
        if (warriortRef.current.checked === true){
            let my_character = Character(currentplayer, nameRef.current.value, "warrior");
            console.log(my_character);
            myFirebase.createNewCharacter(my_character);
            myFirebase.changeCurrentCharacter(my_character);
            navigate('/game', { replace: true });
        }
        else if (archorRef.current.checked === true){
            let my_character = Character(currentplayer, nameRef.current.value, "archor");
            myFirebase.createNewCharacter(my_character);
            myFirebase.changeCurrentCharacter(my_character);
            navigate('/game', { replace: true });
        }
        else if (megaRef.current.checked === true){
            let my_character = Character(currentplayer, nameRef.current.value, "mega");
            myFirebase.createNewCharacter(my_character);
            myFirebase.changeCurrentCharacter(my_character);
            navigate('/game', { replace: true });
        }
        else {
            alert("please specify all the fields");
        }
        
    }

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
        </div>
        </>
    );  

    
}

// Create_character.propTypes = {
//     currentplayer: PropTypes.string.isRequired,
// }



