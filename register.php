<?php require 'Presets/code-register.php' ?>


<!DOCTYPE html>
<html lang="es">

<head>
    <?php require 'Presets/head.php'; ?>
    <title></title>
</head>

<body>
    <?php require 'Presets/header.php'; ?>

    <?php if(!empty($message)): ?>
    <p style="text-align:center;color:red;"> <?= $message ?> </p>
    <?php endif; ?>

    <div class="main wraper_Form">
        <div class="wraper_Form">
            <div class="Tittle">
                REGISTRATE
            </div>
            <div class="small">
                o <small><a href="InicioSesion.php" class="link1.1">Inicia sesión</a></small>
            </div>
            <div class="content wraper_Form">


                <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>" method="POST" enctype="multipart/form-data">

                    <input type="text" name="username" placeholder="Ingrese su Nombre" value="<?php echo $username ?>">
                    <span class="msg-error"> <?php echo $username_err; ?> </span> 
                    <input type="email" name="email" placeholder="Ingrese su Email" value="<?php echo $email ?>">
                    <span class="msg-error"> <?php echo $email_err; ?> </span> 
                    <input type="password" name="password" placeholder="Escriba su Contraseña">
                    <span class="msg-error"> <?php echo $password_err; ?> </span>
                    <input type="password" name="password2" placeholder="Confirme su Contraseña">
                    <span style="margin-bottom:20px;" class="msg-error"> <?php echo $password2_err; ?> </span>

                    <input type="submit" value="Aceptar">

                </form>


            </div>
        </div>
    </div>
</body>

</html>
