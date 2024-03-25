import React, { useState, useEffect } from 'react'
import Root from "./routes/root.jsx";
import LoginPage from './routes/login_page.jsx';
import Create_character from './routes/create_character.jsx';
import Game_page from './routes/game_page.jsx';
import { myFirebase } from './model/MyFirebase.js';
import { BrowserRouter, Routes, Route  } from "react-router-dom";
import Character from './model/character.js';
import Weapon from './model/weapon.js';
import Armor from './model/armor.js';

export default function App() {
    const [currentplayer, setcurrentplayer] = useState("haha");
    const [currentcharacter, setcurrentcharacter] = useState({});

    useEffect ( () => {
        const getCurrentPlayer = async() => {
          const cplayer = await myFirebase.getCurrentPlayer();
        //   console.log(cplayer);
          setcurrentplayer(cplayer[0].name);
        }
        getCurrentPlayer();
      }, [])

    useEffect ( () => {
        const getCurrentCharacter = async() => {
          const ccharacter = await myFirebase.getCurrentCharacter();
          if (ccharacter.Name != null){
            let tmp_char = Character(ccharacter[0].Playername, ccharacter[0].Name, ccharacter[0].Profession, false, ccharacter[0].Health, 
                ccharacter[0].Damage_rate, ccharacter[0].Damage_nlock_rate, 
                Weapon((ccharacter[0].Weapon.split(":"))[0], (ccharacter[0].Weapon.split(":"))[1]),  
                Armor((ccharacter[0].Armor.split(":"))[0], (ccharacter[0].Armor.split(":"))[1]),
                ccharacter[0].Inventory);
              setcurrentcharacter(tmp_char);
          }
        }
        getCurrentCharacter();
      }, [])

    // console.log(currentcharacter);

      
    const AddPlayer = (name, password) => {
        myFirebase.addPlayer(name, password);
        myFirebase.changeCurrentPlayer(name);
    }

    const CheckPlayer = (name, password) => {
        // console.log("asdfadfadf")
        async function promiseFun() {
            const createPromise = myFirebase.checkPlayer(name, password);
                const waitPromise = await createPromise;
                if (waitPromise == "true") {
                    myFirebase.changeCurrentPlayer(name);
                }
                else {
                    alert("wrong password/username");
                }
            }
        promiseFun();
    }



    return(
        <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Root />}/>
                <Route path="/login" element={<LoginPage AddPlayer={AddPlayer} CheckPlayer={CheckPlayer} />}/>
                <Route path="/create-character" element={<Create_character currentplayer={currentplayer}/>} />
                <Route path="/game" element={<Game_page currentcharacter={currentcharacter}/>} />
            </Routes>    
        </BrowserRouter>

        </>
    );
}



