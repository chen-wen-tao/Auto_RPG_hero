// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, setDoc, getDocs, deleteDoc } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
function MyFirebase(){
    const firebaseConfig = {
        apiKey: "AIzaSyBPoGJZxpM9jbk3F_awxpur43FkNQp6uVk",
        authDomain: "rpgtony-aa91c.firebaseapp.com",
        projectId: "rpgtony-aa91c",
        storageBucket: "rpgtony-aa91c.appspot.com",
        messagingSenderId: "78956573662",
        appId: "1:78956573662:web:d4f6015ee37429d193234f",
        measurementId: "G-ZFF3BPWDKL"
      };
      
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const analytics = getAnalytics(app);
    
    // console.log("Firebase initialized!", app, analytics);

    const me = {};
    


    me.getCurrentPlayer = async() => {
        const CurrentPlayerRef = collection(db, "CurrentPlayer");
        const querySnapshot = await getDocs(CurrentPlayerRef);
        return querySnapshot.docs.map((d) => d.data());
    }

    me.changeCurrentPlayer = async(name) => {
        await setDoc(doc(db, "CurrentPlayer", "NjXBWw5sjEdb7ettB94a"), {
            name: name,
        });
    }

    me.getCurrentCharacter = async() => {
        const CurrentCharacterRef = collection(db, "CurrentCharacter");
        const querySnapshot = await getDocs(CurrentCharacterRef);
        return querySnapshot.docs.map((d) => d.data());
    }

    me.changeCurrentCharacter = async(character) => {
        await setDoc(doc(db, "CurrentCharacter", "4i4eNqeLM08O6Px756Le"), {
            Playername: character.playername,
            Name: character.name,
            Profession: character.profession,
            Health: character.health,
            Damage_rate: character.damage_rate,
            Damage_block_rate: character.damage_block_rate,
            Weapon: character.weapon.show_stat(),
            Armor: character.armor.show_stat(),
            Inventory: character.inventory,
        });
    }

    me.getPlayerAccounts = async() => { 
        const PlayerAccountsRef = collection(db, "PlayerAccounts");
        const querySnapshot = await getDocs(PlayerAccountsRef);
        return querySnapshot.docs.map((d) => d.data());
    }

    me.addPlayer = async(name, pwd) => {
        await setDoc(doc(db, "PlayerAccounts", (name + ("" + (await me.getPlayerAccounts()).length))), {
            id: (await me.getPlayerAccounts()).length,
            username: name,
            password: pwd,
        });
    }

    me.checkPlayer = async(name, pwd) => {
        const accounts = await me.getPlayerAccounts();
        const length = (await me.getPlayerAccounts()).length;
        for (let p = 0; p < length; p++){
            if (name === accounts[p].username){
                if (pwd === accounts[p].password){
                    console.log("login success")
                    return "true";
                    
                }
                else{
                    console.log("wrong password")
                    return "false";
                }
            }
            // console.log(accounts[p].username, accounts[p].password);
        }
        return "false";
        // console.log("user does not exist");
        // console.log(accounts);
    }

    me.getCharacters = async() => { 
        const CharacterListRef = collection(db, "CharacterList");
        const querySnapshot = await getDocs(CharacterListRef);
        return querySnapshot.docs.map((d) => d.data());
    }

    me.createNewCharacter = async(character) => {
        await setDoc(doc(db, "CharacterList", character.playername + character.name + character.profession + (await me.getCharacters()).length), {
            Playername: character.playername,
            Name: character.name,
            Profession: character.profession,
            Health: character.health,
            Damage_rate: character.damage_rate,
            Damage_block_rate: character.damage_block_rate,
            Weapon: character.weapon.show_stat(),
            Armor: character.armor.show_stat(),
            Inventory: character.inventory,
        });
    }


    return me;
}

export const myFirebase = MyFirebase();