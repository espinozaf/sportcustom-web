<?php

session_start();

header("Content-Type: application/json; charset=UTF-8");

require_once "conexion.php";

if (isset($_SESSION["cliente_id"])) {

    $id = (int) $_SESSION["cliente_id"];

    $sql = "SELECT id, nombre, correo, telefono, direccion
            FROM clientes
            WHERE id = ?";

    $stmt = $conexion->prepare($sql);

    $stmt->bind_param("i", $id);

    $stmt->execute();

    $resultado = $stmt->get_result();

    if ($usuario = $resultado->fetch_assoc()) {

        echo json_encode([
            "sesion" => true,
            "id" => $usuario["id"],
            "nombre" => $usuario["nombre"],
            "correo" => $usuario["correo"],
            "telefono" => $usuario["telefono"],
            "direccion" => $usuario["direccion"]
        ]);

    } else {

        echo json_encode([
            "sesion" => false,
            "message" => "Usuario no encontrado."
        ]);
    }

    $stmt->close();

} else {

    echo json_encode([
        "sesion" => false
    ]);
}

?>