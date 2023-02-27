
const fs = require("fs"); // fs module
const path = require("path"); // path module

let types = {
    media: ["mp4", "mkv", "mp3","mov"],
    archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex',"csv",'json'],
    app: ['exe', 'dmg', 'pkg', "deb","apk"],
    images: ['png','jpg','jpeg']
}

function organize(srcpath){

    if(srcpath == undefined){
        srcpath=process.cwd();
    
}

let organizefile = path.join(srcpath,"organized_files");
console.log("organized files folder path is ", organizefile);
if(!fs.existsSync(organizefile)){
    fs.mkdirSync(organizefile);
}
else {
    console.log("file already present")
}



let allFiles =fs.readdirSync(srcpath);

for(let i=0;i< allFiles.length;i++){
    let fullPathOfFile = path.join(srcpath,allFiles[i]);
    console.log(fullPathOfFile);

    let IsThisAFile = fs.lstatSync(fullPathOfFile).isFile();
    console.log(allFiles[i] + " is " + IsThisAFile);
    if(IsThisAFile){
        let ext = path.extname(allFiles[i]).split(".")[1];
          

    let folderName= getFolderName(ext);
    
    copyFileToDest(srcpath, fullPathOfFile, folderName);
}
}
}

function getFolderName(ext){

    for(let key in types){
        for(let i=0;i<types[key].length;i++){
            if(types[key][i] == ext){
                return key;
            }
        }
    }
    return "miscellaneous"
}
function  copyFileToDest(srcpath, fullPathOfFile, folderName){
    let destFolderPath= path.join(srcpath,"organized_files",folderName);
    
    if(!fs.existsSync(destFolderPath)){
        fs.mkdirSync(destFolderPath);
    }

    let fileName =path.basename(fullPathOfFile);
    
    let DestFileName = path.join(destFolderPath,fileName);
   
    fs.copyFileSync(fullPathOfFile,DestFileName);
}

module.exports = {
    organize : organize
}