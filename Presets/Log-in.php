<?php 
require 'Presets/database.php';

$username = $password = "" ;
$username_err = $password_err = "";

if($_SERVER["REQUEST_METHOD"] === "POST"){
        
    if(empty(trim($_POST["username"]))){
        $username_err = "Porfavor ingrese un nombre de usuario";
    }else{
       $username = trim($_POST["username"]); 
    }
    
    if(empty(trim($_POST["password"]))){
        $password_err = "Este campo no puede estar vacio";
    }else{
        $password = trim($_POST["password"]);
    }

    if(empty($username_err) && empty($password_err)){
        
        $sql ="SELECT `id`, `username`, `password`  FROM `login` WHERE  username = ?";
        
        if($stmt = mysqli_prepare($link,$sql)){
            mysqli_stmt_bind_param($stmt, "s", $param_username);
            $param_username = $username;
            
            
            if(mysqli_stmt_execute($stmt)){
                mysqli_stmt_store_result($stmt);
            }
            if(mysqli_stmt_num_rows($stmt) == 1){
                mysqli_stmt_bind_result($stmt, $id, $username, $hash);
                if(mysqli_stmt_fetch($stmt)){
                    if(password_verify($password, $hash)){
                        session_start();
                        
                        $_SESSION["loggedin"] = true;
                        $_SESSION["id"] = $id;
                        $_SESSION["username"] = $username;
                        
                        
                        header("location: index.php");    

                    }else{
                        $password_err = "la contraseña no es valida"; 
                    }
                    
                }else{
                    $username_err = "No se ha encontrado ningun nombre de usuario";
                }
            }else{
            echo "UPS! algo salio mal";    
        }
    }    
}
mysqli_close($link);
}



?>
