const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');

const router = express.Router();


const TreeContents = fs.readFileSync("Tree.json", "utf-8");
let Tree = JSON.parse(TreeContents);


let ActualPath = "/";
let FolderRoute = "./Prueba";

let Err = "";  
//Index.
router.get('/' , (req, res) => {
    res.render('Index', { Tree, ActualPath, Err })
});
router.post('/Deletefolder', (req,res) => {
    console.log("Deleted");
    var aux = req.body;
    console.log(aux)
})
router.post('/Folder', (req, res) => {
    console.log("New Folder, created on: '" + ActualPath + "'");
    console.log(req.body)
    var NewFolderName = "NuevaCarpeta"
    console.log(req.body);
    
    if(req.body.NewFolderName) NewFolderName = req.body.NewFolderName ;
    
    var NewFolderRoute = FolderRoute + ActualPath + NewFolderName ; 
    
    const CreatedNewFolder = {
        "type": "Folder",
        "name": NewFolderName,
        "path": NewFolderRoute,
        "Children": []
    }
        
        if (!fs.existsSync(NewFolderRoute)){ 
            fs.mkdirSync(NewFolderRoute) 
            Tree.push(CreatedNewFolder);
            const Json_tree = JSON.stringify(Tree);
            fs.writeFileSync("Tree.json", Json_tree, 'utf-8');
        }else{
            Err = "El nombre de la carpeta ya existe porfavor ingrese un nombre valido"
        };

    res.redirect("/"); 
});
//Upload.
router.post('/upload', (req, res) => {
    
    if(req.files){

        var file = req.files.file;
        var filename = file.name; 
        console.log(filename);
        
        var newfile = {
            "type": "file",
            "name": filename,
            "path": FolderRoute + ActualPath + filename
        }

        var routeFile = FolderRoute + ActualPath + filename ;
        if(!fs.existsSync(routeFile)){

            file.mv(routeFile, (err) =>{
                if (err) {
                    console.log(err)
                }else{
                    
                        console.log('Uploaded');
                        Tree.push(newfile);
                        const Json_tree = JSON.stringify(Tree);
                        fs.writeFileSync("Tree.json", Json_tree, 'utf-8');
                        res.redirect('/');
                    
                }
            });
                    //    }else{
                        //       console.log('Este archivo ya existe');
                        //  return
                        //  }
                //     }
                
        }else{
            Err = "Esa carpeta ya existe, Porfavor ingrese un nombre no existente.";
            res.redirect("/");
        };

    }
});


module.exports = router ; 
