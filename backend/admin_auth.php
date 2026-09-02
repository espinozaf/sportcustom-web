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
        "admin" => false,
        "message" => "Debes iniciar sesión."
    ]);

    exit;
}


$cliente_id = (int) $_SESSION["cliente_id"];


/* =========================================
   CONSULTAR ADMIN DIRECTAMENTE EN MYSQL
========================================= */

$sql = "SELECT es_admin
        FROM clientes
        WHERE id = ?";

$stmt = $conexion->prepare($sql);

if (!$stmt) {

    echo json_encode([
        "success" => false,
        "admin" => false,
        "message" => "No se pudo comprobar la cuenta."
    ]);

    exit;
}


$stmt->bind_param("i", $cliente_id);

$stmt->execute();

$resultado = $stmt->get_result();


/* =========================================
   USUARIO NO ENCONTRADO
========================================= */

if ($resultado->num_rows === 0) {

    echo json_encode([
        "success" => false,
        "admin" => false,
        "message" => "La cuenta no existe."
    ]);

    $stmt->close();
    $conexion->close();

    exit;
}


$cliente = $resultado->fetch_assoc();

$es_admin = (int) $cliente["es_admin"];


/* =========================================
   RESPUESTA
========================================= */

if ($es_admin === 1) {

    echo json_encode([
        "success" => true,
        "admin" => true,
        "message" => "Administrador autorizado."
    ]);

} else {

    echo json_encode([
        "success" => true,
        "admin" => false,
        "message" => "Cuenta de cliente."
    ]);

}


$stmt->close();

$conexion->close();

?>