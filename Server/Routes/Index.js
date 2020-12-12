const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');

const router = express.Router();
let TreeContents = fs.readFileSync("Tree.json", "utf-8");
let Tree = JSON.parse(TreeContents);

let Root = "/Prueba"
let ActualPath = Root + "/";
let RootPath = "/";
var itx; 
let Err = "";  
//Index.
router.get('/' , (req, res) => {
    res.render('Index', { Tree, ActualPath, Err, RootPath})
});

router.post('/upload', (req, res) => {
        if(!req.files) return;

        var File = req.files.file;
        var FileName = File.name

        const CreateNewFile = {
            "type": "File",
            "name": FileName,
            "path": ActualPath
        }

        var FileNamePath = ActualPath + FileName; 

        if(fs.existsSync(FileNamePath)) return;

        var treeChildren = Tree; 

        const getChildren = (treeChildren) =>{
            treeChildren.forEach((e)=> {
                console.log("e: " +e)
                if(e.type == "Folder"){
                    console.log("e1: " +e)
                    if(e.path == ActualPath){
                        console.log("e2: " + FileNamePath)
                        File.mv("./" +FileNamePath, (err)=> {
                            console.log("e3.5" + e)
                            if(err) return;
                            console.log("e3: " +e)
                            e.Children.push(CreateNewFile);
                            var Json_tree = JSON.stringify(e);
                            fs.writeFileSync("Tree.json", Json_tree, 'utf-8');
                            TreeContents = fs.readFileSync("Tree.json", "utf-8");
                            Tree = JSON.parse(TreeContents);
                            var exit =  1 ;
                            res.redirect("/");
                        });

                    }else{
                        if(exit == 1 ) return; 
                        itx = itx +1 ; 
                        console.log("e4: " +e)
                        
                    }
                }

            });
            for(var i = 0; i < itx; i++){
                treeChildren = treeChildren.Children[i]
                getChildren(treeChildren);
                console.log("e5: " +e)
            }
            res.redirect("/")
            console.log("e6: ")
        }
        getChildren(treeChildren);
    
/*     if(req.files){
        var errorforeach = 0 ;
        var file = req.files.file;
        var filename = file.name; 
        
        var newfile = {
            "type": "file",
            "name": filename,
            "path": ActualPath + filename
        }
        

        var routeFile = ActualPath + filename ;
        if(!fs.existsSync(routeFile)){
            Tree.forEach((tree) => {
                if(ActualPath == tree.path + "/"){
                    if(tree.type == "Folder"){
                        file.mv(routeFile, (err) =>{
                            if (err) {
                            }else{
                                    console.log('Uploaded2');
                                    errorforeach = 0;
                                    tree.Children.push(newfile);
                                    const Json_tree = JSON.stringify(Tree);
                                    fs.writeFileSync("Tree.json", Json_tree, 'utf-8');
                                    
                                    res.redirect("/");
                                    
                                
                            }
                        });
        
                    }
                }else{
                    errorforeach = 1 ;
                }
            })   
            console.log("errorforeach: " + errorforeach)
            if(errorforeach == 1){
                file.mv(routeFile, (err) =>{
                    if (err) {
                    }else{
                            console.log('Uploaded');
                            Tree.push(newfile);
                            const Json_tree = JSON.stringify(Tree);
                            fs.writeFileSync("Tree.json", Json_tree, 'utf-8');   
                    }
                });
            }
        }else{
            Err = "Esa carpeta ya existe, Porfavor ingrese un nombre no existente.";
            res.redirect("/");
        };

    }
    res.redirect("/"); */
});






router.post('/ChangeRoute', (req,res) => {
    ActualPath = req.body.path;
    res.redirect('/')
})

router.post('/Deletefolder', (req,res) => {
    var PathToDelete = req.body.path;
    const found = Tree.findIndex(element => element.path == PathToDelete);
    Tree.forEach((FTD) => {
        if(FTD.path == PathToDelete){
            //this if can be delted.
            if(fs.existsSync(PathToDelete)){
                if(fs.lstatSync(PathToDelete + "/").isDirectory()){ fs.rmdirSync(PathToDelete + "/");}else{fs.unlinkSync(PathToDelete)}
            };
            Tree.splice(found,1);
            const Json_tree = JSON.stringify(Tree);
            fs.writeFileSync("Tree.json", Json_tree, 'utf-8');
            ActualPath = "/"
        }
    });
    console.log("Deleted");

    res.redirect("/")
})
router.post('/Folder', (req, res) => {

    var NewFolderName = "NuevaCarpeta"
    
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




module.exports = router ; 
