const express = require('express');
const path = require('path');
const fs = require('fs');

const router = express.Router();

const TreeContents = fs.readFileSync("Tree.json", "utf-8");
let Tree = JSON.parse(TreeContents);

const FolderRoute = "./Prueba/";
let ActualPath = "";

//Index.
router.get('/' , (req, res) => {
    res.render('Index', { Tree })
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
    file.mv(routeFile, (err) =>{
        if (err) {
            console.log(err)
        }else{
            console.log(Tree)
           // for(data in Tree){
              //  if(Tree.path != routeFile || !data.path){
                   console.log('Uploaded');
                    Tree.push(newfile);
                    const Json_tree = JSON.stringify(Tree);
                    fs.writeFileSync("Tree.json", Json_tree, 'utf-8');
                    res.redirect('/');
                  return
            //    }else{
             //       console.log('Este archivo ya existe');
             //  return
              //  }
     //     }
        }
    })
}
});


module.exports = router; 
