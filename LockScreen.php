<?php  require  'Presets/Log-in.php';?>


<!DOCTYPE html>
<html lang="es">
<head>
    <?php require 'Presets/header.php'  ?>
</head>
<body>
    <div>
    <span class="TittleSakura">SaKura<a style="color:white;">X<a></span>
        <div class="Lock">
            <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="post">
            <input type="text" placeholder="Usuario" name="username">
            <span class="msg-error"> <?php echo $username_err; ?> </span>
            <input type="password" placeholder="Contraseña" name="password">
            <span style="margin-bottom:20px;" class="msg-error"> <?php echo $password_err; ?> </span>
            <input type="submit" value="">
            </form>
        </div>  
</body>
</html>
