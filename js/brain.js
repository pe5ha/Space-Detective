import { mainField } from "./main";
class Brain {
    constructor(name) {
        this.mydial = allDialogs[name];
    }
    //here we read num of scene or num of dialog then we
    // get num of player's answer and  look for the appropriate
    // text
    getDialogline(NumOfPlayerResp) {
        //getting text 
        //yet dont know how 
        //here we use NameOfNpc and NumOfResp
        return;
    }
    AskField() {
        //ask Field type of resp and name of npc
        //then write its in TypeOfRespond NameOfNpc 
        //and NumOfRespond
        return;
    }
}
let allDialogs = {
    "bob1": {}
};
{
    cond: () => { return mainField.h == 20; };
    repl: "Field h is 20";
}
{
    cond: () => { return mainField.h == 21; };
    repl: "Field h is 21";
}
{
    cond: () => { return true; };
    repl: "Field h is hh";
}
"bob2";
{ }
//# sourceMappingURL=brain.js.map