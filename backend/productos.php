<?php

header("Content-Type: application/json; charset=UTF-8");

require_once "conexion.php";

$sql = "SELECT 
            id,
            nombre,
            descripcion,
            precio,
            imagen,
            categoria,
            stock,
            estado
        FROM productos
        WHERE estado = 1
        ORDER BY id DESC";

$resultado = $conexion->query($sql);

if (!$resultado) {
    echo json_encode([
        "success" => false,
        "message" => "No se pudieron obtener los productos."
    ]);
    exit;
}

$productos = [];

while ($producto = $resultado->fetch_assoc()) {
    $productos[] = $producto;
}

echo json_encode([
    "success" => true,
    "productos" => $productos
]);

$conexion->close();

?>