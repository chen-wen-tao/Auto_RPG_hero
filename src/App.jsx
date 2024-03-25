import React, { useState, useEffect } from 'react'
import Root from "./routes/root.jsx";
import LoginPage from './routes/login_page.jsx';
import Create_character from './routes/create_character.jsx';
import { myFirebase } from './model/MyFirebase.js';
import { BrowserRouter, Routes, Route  } from "react-router-dom";

export default function App() {
    const [currentplayer, setcurrentplayer] = useState("haha");
    const [isLoggedIn, setisLoggedIn] = useState("false");


    useEffect ( () => {
        const getCurrentPlayer = async() => {
          const cplayer = await myFirebase.getCurrentPlayer();
          // console.log(products);
          setcurrentplayer(cplayer[0].Name);
        }
        getCurrentPlayer();
      }, [])


    console.log(currentplayer);
      
    const AddPlayer = (name, password) => {
        myFirebase.addPlayer(name, password);
        myFirebase.changeCurrentPlayer(name);
    }

    const CheckPlayer = (name, password) => {
        console.log("asdfadfadf")
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
                <Route path="/create-character" element={<Create_character currentPlayer={currentplayer}/>} />
            </Routes>    
        </BrowserRouter>

        </>
    );
}



