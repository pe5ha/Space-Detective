import { mainField } from "./main";

class Brain{
    
    // typeOfResp: number; //means npc or item
    nameOfNpc: string;      //its to hard to explain      
    // numOfResp: number;  //heres num of Player choice
    mydial:Dialog;

    constructor(name:string){
        this.mydial = allDialogs[name];
    }

    //here we read num of scene or num of dialog then we
    // get num of player's answer and  look for the appropriate
    // text
    getDialogline(NumOfPlayerResp:string): string {
        
        //getting text 
        //yet dont know how 
        //here we use NameOfNpc and NumOfResp

        return;

    }

    AskField(): number{
        
        //ask Field type of resp and name of npc
        //then write its in TypeOfRespond NameOfNpc 
        //and NumOfRespond

        return ;

    }
}

type Reply = string;
type Condition = ()=>boolean;
type Dialog = {cond:Condition, repl:Reply}[];

let allDialogs = {
    "bob1":{
        {cond:()=>{return mainField.h==20}; repl:"Field h is 20"},
        {cond:()=>{return mainField.h==21}; repl:"Field h is 21"},
        {cond:()=>{return true}; repl:"Field h is hh"}


    },
    "bob2":{}
}