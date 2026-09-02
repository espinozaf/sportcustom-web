<?php

session_start();

header("Content-Type: application/json; charset=UTF-8");

require_once "conexion.php";


if (!isset($_SESSION["cliente_id"])) {

    echo json_encode([
        "success" => false,
        "sesion" => false,
        "message" => "Debes iniciar sesión."
    ]);

    exit;
}


$cliente_id = (int) $_SESSION["cliente_id"];


$sql = "SELECT 
            id,
            total,
            descuento,
            estado,
            fecha_pedido
        FROM pedidos
        WHERE cliente_id = ?
        ORDER BY fecha_pedido DESC";


$stmt = $conexion->prepare($sql);

$stmt->bind_param("i", $cliente_id);

$stmt->execute();

$resultado = $stmt->get_result();


$pedidos = [];


while ($pedido = $resultado->fetch_assoc()) {

    $pedidos[] = $pedido;

}


$stmt->close();


echo json_encode([
    "success" => true,
    "sesion" => true,
    "pedidos" => $pedidos
]);

?>