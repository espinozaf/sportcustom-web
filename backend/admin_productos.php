<?php

session_start();

header("Content-Type: application/json; charset=UTF-8");

require_once "conexion.php";



if (!isset($_SESSION["cliente_id"])) {

    echo json_encode([
        "success" => false,
        "message" => "Debes iniciar sesión."
    ]);

    exit;
}


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


if ($_SERVER["REQUEST_METHOD"] === "POST") {

    $input = json_decode(
        file_get_contents("php://input"),
        true
    );


    if (!$input) {

        echo json_encode([
            "success" => false,
            "message" => "No se recibieron los datos del producto."
        ]);

        exit;
    }


    $nombre = trim($input["nombre"] ?? "");

    $descripcion = trim(
        $input["descripcion"] ?? ""
    );

    $precio = isset($input["precio"])
        ? (float) $input["precio"]
        : 0;

    $imagen = trim(
        $input["imagen"] ?? ""
    );

    $categoria = trim(
        $input["categoria"] ?? ""
    );

    $stock = isset($input["stock"])
        ? (int) $input["stock"]
        : 0;


    if ($nombre === "") {

        echo json_encode([
            "success" => false,
            "message" => "El nombre del producto es obligatorio."
        ]);

        exit;
    }


    if ($categoria === "") {

        echo json_encode([
            "success" => false,
            "message" => "La categoría es obligatoria."
        ]);

        exit;
    }


    if ($precio < 0) {

        echo json_encode([
            "success" => false,
            "message" => "El precio no puede ser negativo."
        ]);

        exit;
    }


    if ($stock < 0) {

        echo json_encode([
            "success" => false,
            "message" => "El stock no puede ser negativo."
        ]);

        exit;
    }


    /* =========================================
       INSERTAR
    ========================================= */

    $sql = "INSERT INTO productos
            (
                nombre,
                descripcion,
                precio,
                imagen,
                categoria,
                stock,
                estado
            )
            VALUES (?, ?, ?, ?, ?, ?, 1)";


    $stmt = $conexion->prepare($sql);


    if (!$stmt) {

        echo json_encode([
            "success" => false,
            "message" => "Error preparando INSERT.",
            "error" => $conexion->error
        ]);

        exit;
    }


    $stmt->bind_param(
        "ssdssi",
        $nombre,
        $descripcion,
        $precio,
        $imagen,
        $categoria,
        $stock
    );


    if (!$stmt->execute()) {

        echo json_encode([
            "success" => false,
            "message" => "MySQL rechazó el producto.",
            "error" => $stmt->error
        ]);

        $stmt->close();

        exit;
    }


    

    $producto_id = $conexion->insert_id;

    $filas_afectadas = $stmt->affected_rows;


    if ($producto_id <= 0 || $filas_afectadas !== 1) {

        echo json_encode([
            "success" => false,
            "message" => "MySQL no confirmó la inserción.",
            "producto_id" => $producto_id,
            "filas_afectadas" => $filas_afectadas
        ]);

        $stmt->close();

        exit;
    }


    $stmt->close();


    echo json_encode([
        "success" => true,
        "message" => "Producto guardado correctamente.",
        "producto_id" => $producto_id,
        "filas_afectadas" => $filas_afectadas
    ]);

    $conexion->close();

    exit;
}



$sql = "SELECT
            id,
            nombre,
            descripcion,
            precio,
            imagen,
            categoria,
            stock,
            estado,
            fecha_creacion
        FROM productos
        ORDER BY id DESC";


$resultado = $conexion->query($sql);


if (!$resultado) {

    echo json_encode([
        "success" => false,
        "message" => "No se pudieron obtener los productos.",
        "error" => $conexion->error
    ]);

    exit;
}


$productos = [];


while ($producto = $resultado->fetch_assoc()) {

    $productos[] = [

        "id" => (int) $producto["id"],

        "nombre" => $producto["nombre"],

        "descripcion" => $producto["descripcion"],

        "precio" => (float) $producto["precio"],

        "imagen" => $producto["imagen"],

        "categoria" => $producto["categoria"],

        "stock" => (int) $producto["stock"],

        "estado" => (int) $producto["estado"],

        "fecha_creacion" => $producto["fecha_creacion"]
    ];
}


echo json_encode([
    "success" => true,
    "productos" => $productos
], JSON_UNESCAPED_UNICODE);


$conexion->close();

?>