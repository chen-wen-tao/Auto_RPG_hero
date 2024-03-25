export default class Chest{
    constructor(weapon, armor){
        this.weapon = weapon;
        this.armor = armor;
    }

    unlock(person){
        person.obtain_item(this.weapon);
        person.obtain_item(this.armor);
    }
}