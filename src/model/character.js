import Armor from "./armor";
import Weapon from "./weapon";

export default function Character(playername, name, profession, health=100, damage_rate, damage_block_rate, weapon, armor, inventory=[]) {
    const me = {};
    me.playername = playername;
    me.name = name;
    me.profession = profession;
    if (profession === "warrior"){
      me.health = 200;
      me.damage_rate = 10000;
      me.damage_block_rate = 10000;
      me.weapon = Weapon("sword", 20);
      me.armor = Armor("Plate armour", 30);
    }
    else if (profession === "archor"){
      me.health = 200;
      me.damage_rate = 10000;
      me.damage_block_rate = 10000;
      me.weapon = Weapon("sword", 20);
      me.armor = Armor("Plate armour", 30);
    }
    else if (profession === "mega"){
      me.health = 200;
      me.damage_rate = 10000;
      me.damage_block_rate = 10000;
      me.weapon = Weapon("sword", 20);
      me.armor = Armor("Plate armour", 30);
    }
    
    // me.level = level;
    me.inventory = inventory;

    me.lvl_up = () => {
      me.health += 10;
      me.damage_rate += 1;
      me.damage_block_rate += 1;
    }

    me.die = () => {
      me.health = 0;
      alert("You Died!!");
    }

    me.fight = (target) => {
      if (((me.damage_block_rate + me.armor.damage_block_rate) - (target.damage_rate + target.weapon.damage_rate)) > ((target.damage_block_rate + target.armor.damage_block_rate) - (me.damage_rate + me.weapon.damage_rate))){
        document.getElementById("enemy-health-bar").style.background = "linear-gradient(to right, blue 50%, red 50%)";
        console.log(document.getElementById("enemy-health-bar").style.background)
        alert("You Win!!!!");
        me.obtain_item(target.weapon);
        me.obtain_item(target.armor);
        
        return true;
      }
      else{
        document.getElementById("character-health-bar").style.background = "linear-gradient(to left, blue 100%, red 0%)";
        me.die();
        return false;
      }
    }

    me.equip_item = (item) => {
      if (item instanceof Weapon){
        me.weapon = item;
      }
      if (item instanceof Armor){
        me.armor = item;
      }
    }

    me.obtain_item = (item) => {
      me.inventory.push(item)
    }

    me.change_name = (new_name) => {
      me.name = new_name;
    }

    me.show_stat = () => {
      return(
        "Name: " + me.name + "\n" +
        "Profession: " + me.profession + "\n" +
        // "Level: " + me.level + "\n" +
        "Health: " + me.health + "\n" +
        "Damage Rate: " + me.damage_rate + "\n" +
        "Damage Block Rate: " + me.damage_block_rate + "\n" +
        "Weapon: " + me.weapon.show_stat() + "\n" +
        "Armor: " + me.armor.show_stat() + "\n" +
        "Inventory: " + me.inventory.map((item) => item.show_stat()) + "\n"
      );
    }

    return me;
  }