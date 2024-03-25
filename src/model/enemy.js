export default function Enemy(name, health=100, damage_rate, damage_block_rate, weapon, armor) {
    const me = {};
    me.name = name;
    me.health = health;
    me.damage_rate = damage_rate;
    me.damage_block_rate = damage_block_rate;
    me.weapon = weapon;
    me.armor = armor;

    me.die = () =>{
      me.health = 0;
    }

    me.show_stat = () => {
      return(
        "Name: " + me.name + "\n" +
        "Health: " + me.health + "\n" +
        "Damage Rate: " + me.damage_rate + "\n" +
        "Damage Block Rate: " + me.damage_block_rate + "\n" +
        "Weapon: " + me.weapon.show_stat() + "\n" +
        "Armor: " + me.armor.show_stat() + "\n"
      );
    }
    return me;
  }