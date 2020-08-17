<?php 

session_start();

if(!isset($_SESSION["loggedin"]) && $_SESSION !== true){
    header("location: LockScreen.php");
    exit;
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <?php require 'Presets/header.php'; ?>
</head>
<body>
    <form action="Presets/logout.php" method="post">
        <input type="submit" name="logout" value="deslogear">
    </form>
</body>
</html>