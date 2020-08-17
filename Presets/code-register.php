<?php 

    require_once "Presets/database.php";

    $username = $email = $password = $password2 = "";

    $username_err = $email_err = $password_err = $password2_err = "";

    if($_SERVER['REQUEST_METHOD'] == "POST"){
        /*wtf*/
        
        if(empty(trim($_POST["username"]))){
            $username_err = "Por favor, ingrese un nombre de usuario";
        }else{
            
            $sql = "SELECT id FROM login WHERE username = ?";
            
            if($stmt = mysqli_prepare($link, $sql)){
                mysqli_stmt_bind_param($stmt,"s", $param_username);
                
                $param_username = trim($_POST["username"]); 
                
                if(mysqli_stmt_execute($stmt)){
                    mysqli_stmt_store_result($stmt);
                    
                    if(mysqli_stmt_num_rows($stmt) == 1){
                        $username_err = "Este nombre de usuario ya esta en uso";
                    }else{
                        $username = trim($_POST["username"]);
                    }
                }else{
                    echo "Ups! Algo salió mal, intentelo mas tarde.";
                }
            }
        }
        
        
        
        if(empty(trim($_POST["email"]))){
            $email_err = "Por favor, ingrese un email";
        }else{
            
            $sql = "SELECT id FROM login WHERE Email = ?";
            
            if($stmt = mysqli_prepare($link, $sql)){
                mysqli_stmt_bind_param($stmt,"s", $param_email);
                
                $param_email = trim($_POST["email"]); 
                
                if(mysqli_stmt_execute($stmt)){
                    mysqli_stmt_store_result($stmt);
                    
                    if(mysqli_stmt_num_rows($stmt) == 1){
                        $email_err ="Este email ya esta en uso";
                    }else{
                        $email = trim($_POST["email"]);
                    }
                }else{
                    echo "Ups! Algo salió mal, intentelo mas tarde.";
                }
            }
        }
        
        
        
        
        if(empty(trim($_POST["password"]))){
            $password_err = "Por favor, ingrese una contraseña";
        }elseif((strlen(trim($_POST["password"])) < 4) &&(strlen(trim($_POST["password"] > 16)))){
            $password_err = "La contraseña debe ser entre 4 y 16 caracteres";
        }
        
        if(empty(trim($_POST["password2"]))){
            $password2_err = "Por favor, escriba de nuevo su contraseña";
        }elseif((trim($_POST["password"])) != (trim($_POST["password2"]))){
            $password2_err = "Las contraseñas no coinciden" ;
        }else{
            $password = trim($_POST["password"]);
        }
        /*hey*/
        if(empty($username_err) && empty($password2_err)&& empty($password_err)){
            $sql = "INSERT INTO login (username, password) VALUES (?, ?)";
            if($stmt = mysqli_prepare($link, $sql)){
                mysqli_stmt_bind_param($stmt,"ss", $param_username, $param_password);
                $param_username = $username;
                $param_password = password_hash($password, PASSWORD_DEFAULT);
                
                
                if(mysqli_stmt_execute($stmt)){
                    header("location: index.php");                    
		}else {
			$errorcode = mysqli_stmt_error($stmt);
			echo $errorcode ;
                    echo "Algo salio mal, intentelo de nuevo más tarde, si el problema persiste pongase en contacto con el administrador de la página";
                }
            }
            mysqli_close($link);
        }
        
    }

?>
