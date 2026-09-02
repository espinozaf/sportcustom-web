<?php

$servidor = "localhost";
$usuario = "root";
$password = "";
$base_datos = "sportscustom";

$conexion = new mysqli(
    $servidor,
    $usuario,
    $password,
    $base_datos
);

if ($conexion->connect_error) {
    die("ERROR: No se pudo conectar con la base de datos.");
}

$conexion->set_charset("utf8mb4");

?>