export default function Armor(name, damage_block_rate){
    const me = {};
    me.name = name;
    me.damage_block_rate = damage_block_rate;

    me.show_stat = () => {
        return(this.name + ":" + this.damage_block_rate);
    }

    return me;
}