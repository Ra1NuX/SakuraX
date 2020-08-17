<?php

    define('DB_SERVER', 'localhost');

    define('DB_USERNAME', 'admin');
    define('DB_PASSWORD', 'avestruz89');
    define('DB_NAME', 'sakurax_database');

    $link = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);

    if($link === false){
        die("ERROR EN LA CONEXIÓN" . mysqli_connect_error());
    }

?>
