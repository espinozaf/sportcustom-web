<?php

session_start();

header("Content-Type: application/json; charset=UTF-8");

require_once "conexion.php";


/* =========================================
   VERIFICAR SESIÓN
========================================= */

if (!isset($_SESSION["cliente_id"])) {

    echo json_encode([
        "success" => false,
        "message" => "Debes iniciar sesión."
    ]);

    exit;
}


/* =========================================
   VERIFICAR ADMINISTRADOR
========================================= */

if (
    !isset($_SESSION["es_admin"]) ||
    (int) $_SESSION["es_admin"] !== 1
) {

    echo json_encode([
        "success" => false,
        "message" => "No tienes permisos de administrador."
    ]);

    exit;
}


/* =========================================
   OBTENER MENSAJES
========================================= */

$sql = "SELECT
            id,
            nombre,
            correo,
            telefono,
            asunto,
            mensaje,
            fecha
        FROM mensajes
        ORDER BY fecha DESC";


$resultado = $conexion->query($sql);


if (!$resultado) {

    echo json_encode([
        "success" => false,
        "message" => "No se pudieron obtener los mensajes."
    ]);

    exit;
}


/* =========================================
   CREAR LISTA
========================================= */

$mensajes = [];


while ($mensaje = $resultado->fetch_assoc()) {

    $mensajes[] = $mensaje;

}


/* =========================================
   RESPUESTA
========================================= */

echo json_encode([
    "success" => true,
    "mensajes" => $mensajes
]);


$conexion->close();

?>