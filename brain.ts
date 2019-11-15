import { mainField } from "./main";
import { DRAW } from "./draw";
import { Person } from "./field";

export let names:string[]=[
    "Bob",
    "Bob2",
    "Bob3",
    "Bob4",
    "Bob5"
]

class Brain{
    
    pers:Person;
    nameOfNpc: string;    

    mydial:Dialog;

    constructor(perss:Person){
        this.pers=perss;
        this.nameOfNpc=perss.name;
        this.pers.attributes.eyes=3;
        // this.mydial = allDialogs[name];
    }

    getDialogline(NumOfPlayerResp:string=""): string {
        //сюда будет приходить номер ответа нпс в диалоге
        //getting text 
        //yet dont know how 
        //here we use NameOfNpc and NumOfResp

        return "hELLO I m "+this.nameOfNpc;
        //возращаю ответ персонажа

    }

}

type Reply = string;
type Condition = ()=>boolean;
type Dialog = {cond:Condition, repl:Reply}[];

// let allDialogs = {
//     "bob1":{
//         {cond:()=>{return mainField.h==20}; repl:"Field h is 20"},
//         {cond:()=>{return mainField.h==21}; repl:"Field h is 21"},
//         {cond:()=>{return true}; repl:"Field h is hh"}


//     },
//     "bob2":{}
// }

export{Brain}