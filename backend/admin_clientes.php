<?php

session_start();

header("Content-Type: application/json; charset=UTF-8");

require_once "conexion.php";


/* =========================================
   COMPROBAR SESIÓN
========================================= */

if (!isset($_SESSION["cliente_id"])) {

    echo json_encode([
        "success" => false,
        "message" => "Debes iniciar sesión."
    ]);

    exit;
}


/* =========================================
   COMPROBAR ADMINISTRADOR
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
   CONSULTAR CLIENTES
========================================= */

$sql = "SELECT
            id,
            nombre,
            correo,
            telefono,
            direccion,
            fecha_registro,
            es_admin
        FROM clientes
        ORDER BY fecha_registro DESC";


$resultado = $conexion->query($sql);


if (!$resultado) {

    echo json_encode([
        "success" => false,
        "message" => "No se pudieron obtener los clientes."
    ]);

    exit;
}


/* =========================================
   PREPARAR RESULTADOS
========================================= */

$clientes = [];


while ($cliente = $resultado->fetch_assoc()) {

    $clientes[] = [

        "id" => (int) $cliente["id"],

        "nombre" => $cliente["nombre"],

        "correo" => $cliente["correo"],

        "telefono" => $cliente["telefono"],

        "direccion" => $cliente["direccion"],

        "fecha_registro" => $cliente["fecha_registro"],

        "es_admin" => (int) $cliente["es_admin"]

    ];
}


/* =========================================
   RESPUESTA
========================================= */

echo json_encode([

    "success" => true,

    "clientes" => $clientes

], JSON_UNESCAPED_UNICODE);


/* =========================================
   CERRAR CONEXIÓN
========================================= */

$conexion->close();

?>