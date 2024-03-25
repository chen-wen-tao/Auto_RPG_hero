import { Form } from "react-router-dom";
import "../style/login.css";
import React, { useState, useEffect, useRef } from "react";
import { myFirebase } from "../model/MyFirebase";
import Create_character from "./create_character";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

export default function LoginPage({ AddPlayer, CheckPlayer }){
    const usernameRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();
    
    // const [currentplayer, setcurrentplayer] = useState();
    
    // console.log( (myFirebase.getPlayerAccounts()).length)
    useEffect ( () => {
        const gotonextpage = async() => {
            const isloggedin = await myFirebase.getCurrentPlayer();
            console.log(isloggedin[0].name);
            if (isloggedin[0].name != null){
                navigate('/create-character', { replace: true });
            }
        }
        gotonextpage();
        }, [])
    
    // if (myFirebase.getCurrentPlayer != "haha"){
    //     navigate('/create-character', { replace: true });
    // }



    const onAddPlayer = () => {
        // console.log(usernameRef.current.value);
        // console.log(passwordRef.current.value);
        // myFirebase.addPlayer(usernameRef.current.value, passwordRef.current.value);
        // setcurrentplayer(usernameRef.current.value);
        // console.log("current player: " + currentplayer);
        

        AddPlayer(usernameRef.current.value, passwordRef.current.value);
        // navigate('/create-character', { replace: true });
    };

    const onCheckPlayer = () => {
        CheckPlayer(usernameRef.current.value, passwordRef.current.value);
        
    };

    return (
        <>

            <div className="center">

                <div className="container">
                    <label className="uname"><b>Username</b></label>
                    <input type="text" placeholder="Enter Username" name="uname" ref={usernameRef} required/>

                    <label className="psw"><b>Password</b></label>
                    <input type="password" placeholder="Enter Password" name="psw" ref={passwordRef} required/>

                    <button onClick={onCheckPlayer}>Login</button>
                    <button onClick={onAddPlayer}>Register</button>
                </div>

                <div className="container">
                    <button type="button" className="cancelbtn">Cancel</button>
                    <span className="psw">Forgot <a href="#">password?</a></span>
                </div>
            </div>
        </>

    );

}

LoginPage.propTypes = {
    onAddPlayer: PropTypes.func,
    onCheckPlayer: PropTypes.func,
}