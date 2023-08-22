import { Monster } from "../models";

export const calculateFirstAttacker = (monsterA: Monster, monsterB: Monster): Monster => {
    if(monsterA.speed > monsterB.speed) {
        return monsterA;
    } else if (monsterB.speed > monsterA.speed) {
        return monsterB;
    } else if (monsterA.speed === monsterB.speed) {
        return monsterA.attack > monsterB.attack ? monsterA : monsterB;
    }
    return monsterA;
}

export const damageCalculation = (AttackingMonster: Monster, defendingMonster: Monster): number => {
    const damage = AttackingMonster.attack - defendingMonster.defense;
    return damage > 0 ? damage : 1;
}