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
        this.pers.attributes.eyes;
        this.pers.attributes.smell;
        //this.mydial = allDialogs[name];
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

let Bobby1:Brain;
Bobby1.pers.attributes.eyes = 6
Bobby1.nameOfNpc = "Bobby1" 
let Bobby2:Brain;
Bobby2.pers.attributes.smell = "good"
Bobby2.nameOfNpc = "Bobby2" 

  let allDialogs = {
     bob1:
     [
         {cond:()=>{return Bobby1.pers.attributes.eyes==6}, repl:"I can see you 6th times"},
         {cond:()=>{return Bobby1.pers.attributes.eyes!=6}, repl:"Raise my eyes!"},
     ],
     bob2: [
        {cond:()=>{return Bobby2.pers.attributes.smell!=="fu"}, repl:"sory, didnt brush my teeth"},
        {cond:()=>{return Bobby2.pers.attributes.smell=="good"}, repl:"Ye. I use Axe - strong power!"},
     ],
     bob3: [],
     bob4: [],
     bob5: []
 }
 




export{Brain, allDialogs}