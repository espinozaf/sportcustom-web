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
   OBTENER PEDIDOS
========================================= */

$sql = "SELECT
            p.id,
            p.cliente_id,
            p.total,
            p.descuento,
            p.estado,
            p.fecha_pedido,
            c.nombre AS cliente_nombre,
            c.correo AS cliente_correo

        FROM pedidos p

        INNER JOIN clientes c
            ON p.cliente_id = c.id

        ORDER BY p.fecha_pedido DESC";


$resultado = $conexion->query($sql);


if (!$resultado) {

    echo json_encode([
        "success" => false,
        "message" => "No se pudieron obtener los pedidos."
    ]);

    exit;
}


/* =========================================
   CREAR LISTA
========================================= */

$pedidos = [];


while ($pedido = $resultado->fetch_assoc()) {

    $pedidos[] = $pedido;

}


/* =========================================
   RESPUESTA
========================================= */

echo json_encode([
    "success" => true,
    "pedidos" => $pedidos
]);


$conexion->close();

?>