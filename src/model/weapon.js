export default function Weapon(name, damage_rate){
    const me = {};
    me.name = name;
    me.damage_rate = damage_rate;


    me.show_stat = () => {
        return(this.name + ":" + this.damage_rate);
    }

    return me;
}