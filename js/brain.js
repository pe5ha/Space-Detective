import { mainField } from "./main.js";
import { Person } from "./field.js";
export let names = [
    "Bob",
    "Bob2",
    "Bob3",
    "Bob4",
    "Bob5"
];
let Nums; //temprary var for transfering numbers from getDIalogLines into AllDialogs
class Brain {
    constructor(perss) {
        this.pers = perss;
        this.nameOfNpc = perss.name;
        this.pers.attributes.eyes;
        this.pers.attributes.smell;
        this.pers.attributes.apples;
        this.mydial = allDialogs[this.nameOfNpc];
    }
    getDialogline(NumOfPlayerResp = "") {
        //сюда будет приходить номер ответа нпс в диалоге
        //getting text 
        //yet dont know how 
        //here we use NameOfNpc and NumOfResp
        if (!this.mydial)
            return "I HAVE NOTHING TO SAY!";
        return getDialogLine(this.mydial, this.pers); //"hELLO I m "+this.nameOfNpc;
        //возращаю ответ персонажа
    }
}
let Bobby1;
let Bobby2;
//НЕ запускать т к есть один баг в ts: Когда он авто-импортирует всякую фигню из др файлов,
// (например из main.js как в первой строчке) он забывает ставить ".js"! см первую строчку!
function initBrain() {
    let B1 = new Person("booby1", mainField, 2, 3); //Нужно создать НПС и поставить его на поле. Он сам создаст себе мозг.
    let B2 = new Person("booby2", mainField, 4, 3);
    Bobby1 = B1.brain; //Потом этот мозг можно достать. аккуратно.
    Bobby2 = B2.brain;
    Bobby1.pers.attributes.eyes = 6; //Вместо этого, конечно можно просто писать B1.attributes.eyes... Но как хочешь
    // Bobby1.nameOfNpc = "Bobby1"; //      Это менять не надо, оно пусть задается через НПС и не меняется никогда
    Bobby2.pers.attributes.smell = "good";
    // Bobby2.nameOfNpc = "Bobby2" ;
    Bobby2.pers.attributes.apples = 5;
    Bobby1.pers.attributes.apples = 0;
}
//Я еще написал эту ф. Можешь удалить и сам что-нить написать.
// function getDialogLine(dial:Dialog, speaker:Person):string{    //Принимает диалог и того кто говорит, возвр - текст реплики
//     for(let line of dial)
//         if(line.cond())return line.repl;
//     return null;
// }
let allDialogs = {
    booby1: [
        { cond: () => { return Bobby1.pers.attributes.apples != 0; }, repl: "Да, у меня есть яблоки." },
        { cond: () => { return Bobby1.pers.attributes.apples == 0; }, repl: "Нет, у меня нет яблок." },
        { cond: () => { return Bobby1.pers.attributes.apples; }, repl: "У меня " + Bobby1.pers.attributes.apples + "яблок" },
        { cond: () => { return (Bobby1.pers.attributes.apples -= Nums) >= 0; }, repl: "Держи" + Nums + "яблок" },
        { cond: () => { return (Bobby1.pers.attributes.apples - Nums) < 0; }, repl: "У меня нет" + Nums + "яблок" },
    ],
    booby2: [
        { cond: () => { return Bobby2.pers.attributes.apples != 0; }, repl: "Да, у меня есть яблоки." },
        { cond: () => { return Bobby2.pers.attributes.apples == 0; }, repl: "Нет, у меня нет яблок." },
        { cond: () => { return Bobby2.pers.attributes.apples; }, repl: "У меня " + Bobby1.pers.attributes.apples + "яблок" },
        { cond: () => { return (Bobby2.pers.attributes.apples -= Nums) >= 0; }, repl: "Держи" + Nums + "яблок" },
        { cond: () => { return (Bobby2.pers.attributes.apples -= Nums) < 0; }, repl: "У меня нет" + Nums + "яблок" },
    ],
    bob3: [],
    bob4: [],
    bob5: []
};
export { Brain, allDialogs, initBrain };
//# sourceMappingURL=brain.js.map