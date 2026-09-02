<?php

header("Content-Type: application/json; charset=UTF-8");

require_once "conexion.php";


/* =========================================
   RECIBIR DATOS
========================================= */

$input = json_decode(
    file_get_contents("php://input"),
    true
);


if (!$input) {

    echo json_encode([
        "success" => false,
        "message" => "No se recibieron datos."
    ]);

    exit;
}


/* =========================================
   LIMPIAR DATOS
========================================= */

$nombre = trim($input["nombre"] ?? "");
$correo = trim($input["correo"] ?? "");
$telefono = trim($input["telefono"] ?? "");
$asunto = trim($input["asunto"] ?? "");
$mensaje = trim($input["mensaje"] ?? "");


/* =========================================
   VALIDAR
========================================= */

if (
    $nombre === "" ||
    $correo === "" ||
    $telefono === "" ||
    $asunto === "" ||
    $mensaje === ""
) {

    echo json_encode([
        "success" => false,
        "message" => "Completa todos los campos."
    ]);

    exit;
}


if (!filter_var($correo, FILTER_VALIDATE_EMAIL)) {

    echo json_encode([
        "success" => false,
        "message" => "El correo electrónico no es válido."
    ]);

    exit;
}


/* =========================================
   GUARDAR EN MYSQL
========================================= */

$sql = "INSERT INTO mensajes
        (nombre, correo, telefono, asunto, mensaje)
        VALUES (?, ?, ?, ?, ?)";


$stmt = $conexion->prepare($sql);


if (!$stmt) {

    echo json_encode([
        "success" => false,
        "message" => "No se pudo preparar el mensaje."
    ]);

    exit;
}


$stmt->bind_param(
    "sssss",
    $nombre,
    $correo,
    $telefono,
    $asunto,
    $mensaje
);


if ($stmt->execute()) {

    echo json_encode([
        "success" => true,
        "message" => "¡Mensaje enviado correctamente!"
    ]);

} else {

    echo json_encode([
        "success" => false,
        "message" => "No se pudo guardar el mensaje."
    ]);

}


$stmt->close();

?>