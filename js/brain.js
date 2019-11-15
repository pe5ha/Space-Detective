export let names = [
    "Bob",
    "Bob2",
    "Bob3",
    "Bob4",
    "Bob5"
];
class Brain {
    constructor(perss) {
        this.pers = perss;
        this.nameOfNpc = perss.name;
        this.pers.attributes.eyes = 3;
        // this.mydial = allDialogs[name];
    }
    getDialogline(NumOfPlayerResp = "") {
        //сюда будет приходить номер ответа нпс в диалоге
        //getting text 
        //yet dont know how 
        //here we use NameOfNpc and NumOfResp
        
        return "hELLO I m " + this.nameOfNpc;
        //возращаю ответ персонажа
    }
}
// let allDialogs = {
//     "bob1":{
//         {cond:()=>{return mainField.h==20}; repl:"Field h is 20"},
//         {cond:()=>{return mainField.h==21}; repl:"Field h is 21"},
//         {cond:()=>{return true}; repl:"Field h is hh"}
//     },
//     "bob2":{}
// }
export { Brain };
//# sourceMappingURL=brain.js.map