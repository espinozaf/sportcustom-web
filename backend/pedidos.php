<?php

session_start();

header("Content-Type: application/json; charset=UTF-8");

require_once "conexion.php";


/* ==================================================
   COMPROBAR SESIÓN
================================================== */

if (!isset($_SESSION["cliente_id"])) {

    echo json_encode([
        "success" => false,
        "message" => "Debes iniciar sesión para realizar el pedido."
    ]);

    exit;
}

$cliente_id = (int) $_SESSION["cliente_id"];


/* ==================================================
   RECIBIR DATOS
================================================== */

$input = json_decode(
    file_get_contents("php://input"),
    true
);

if (!$input) {

    echo json_encode([
        "success" => false,
        "message" => "No se recibieron los datos del pedido."
    ]);

    exit;
}


/* ==================================================
   DATOS DEL PEDIDO
================================================== */

$subtotal = isset($input["subtotal"])
    ? (float) $input["subtotal"]
    : 0;

$envio = isset($input["envio"])
    ? (float) $input["envio"]
    : 0;

$productos = isset($input["productos"])
    ? $input["productos"]
    : [];


if ($subtotal <= 0) {

    echo json_encode([
        "success" => false,
        "message" => "El subtotal del pedido no es válido."
    ]);

    exit;
}


/* ==================================================
   COMPROBAR PRIMER PEDIDO
================================================== */

$sql = "SELECT COUNT(*) AS cantidad
        FROM pedidos
        WHERE cliente_id = ?";

$stmt = $conexion->prepare($sql);

$stmt->bind_param(
    "i",
    $cliente_id
);

$stmt->execute();

$resultado = $stmt->get_result();

$fila = $resultado->fetch_assoc();

$cantidad_pedidos = (int) $fila["cantidad"];

$stmt->close();


/* ==================================================
   CALCULAR DESCUENTO
================================================== */

$porcentaje_descuento = 0;

if ($cantidad_pedidos === 0) {

    if ($subtotal < 50) {

        $porcentaje_descuento = 5;

    } elseif ($subtotal < 100) {

        $porcentaje_descuento = 10;

    } else {

        $porcentaje_descuento = 15;
    }
}


$descuento =
    $subtotal * ($porcentaje_descuento / 100);


$total_final =
    $subtotal - $descuento + $envio;


/* ==================================================
   GUARDAR PEDIDO
================================================== */

$estado = "Pendiente";

$sql = "INSERT INTO pedidos
        (cliente_id, total, descuento, estado)
        VALUES (?, ?, ?, ?)";

$stmt = $conexion->prepare($sql);

$stmt->bind_param(
    "idds",
    $cliente_id,
    $total_final,
    $descuento,
    $estado
);


if (!$stmt->execute()) {

    echo json_encode([
        "success" => false,
        "message" => "No se pudo guardar el pedido."
    ]);

    exit;
}


$pedido_id = $stmt->insert_id;

$stmt->close();


/* ==================================================
   GUARDAR DETALLE DEL PEDIDO
================================================== */

if (!empty($productos)) {

    $sql = "INSERT INTO detalle_pedido
            (
                pedido_id,
                producto_id,
                cantidad,
                precio,
                disciplina,
                nombre_jugador,
                numero,
                talla,
                tejido,
                color_principal,
                color_secundario
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    $stmt = $conexion->prepare($sql);


    foreach ($productos as $producto) {

        $producto_id = null;

        $cantidad = isset($producto["cantidad"])
            ? (int) $producto["cantidad"]
            : 1;

        $precio = 49.99;

        $disciplina =
            $producto["disciplina"] ?? null;

        $nombre_jugador =
            $producto["nombre"] ?? null;

        $numero =
            $producto["numero"] ?? null;

        $talla =
            $producto["talla"] ?? null;

        $tejido =
            $producto["tejido"] ?? null;

        $color_principal =
            $producto["colorPrincipal"] ?? null;

        $color_secundario =
            $producto["colorSecundario"] ?? null;


        $stmt->bind_param(
            "iiidsssssss",
            $pedido_id,
            $producto_id,
            $cantidad,
            $precio,
            $disciplina,
            $nombre_jugador,
            $numero,
            $talla,
            $tejido,
            $color_principal,
            $color_secundario
        );


        if (!$stmt->execute()) {

            echo json_encode([
                "success" => false,
                "message" => "El pedido se guardó, pero no se pudo guardar el detalle."
            ]);

            exit;
        }
    }

    $stmt->close();
}


/* ==================================================
   RESPUESTA
================================================== */

echo json_encode([

    "success" => true,

    "message" =>
        "Pedido registrado correctamente.",

    "pedido_id" =>
        $pedido_id,

    "primer_pedido" =>
        ($cantidad_pedidos === 0),

    "descuento_porcentaje" =>
        $porcentaje_descuento,

    "descuento" =>
        round($descuento, 2),

    "envio" =>
        round($envio, 2),

    "total" =>
        round($total_final, 2)

]);

?>