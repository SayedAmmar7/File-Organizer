
let helpfunction = require("./commands/help");
let organizefunction = require("./commands/organize")
let treefunction = require("./commands/tree");
let inputArr = process.argv.slice(2);
let command = inputArr[0];
let path = inputArr[1];

switch(command){
    case "tree":
        treefunction.tree(path);
      break;
    case "organize":
        organizefunction.organize(path);

        break;
    case "help":
        helpfunction.help();

        break;
    default:
        console.log("command not recognized " );

        break;

}


