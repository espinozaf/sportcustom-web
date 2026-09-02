<?php

require_once "conexion.php";

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo "Acceso no válido.";
    exit;
}

$nombre = trim($_POST["nombre"] ?? "");
$correo = trim($_POST["correo"] ?? "");
$password = $_POST["password"] ?? "";
$telefono = trim($_POST["telefono"] ?? "");
$direccion = trim($_POST["direccion"] ?? "");



if ($nombre === "" || $correo === "" || $password === "") {
    echo "ERROR: Debes completar los campos obligatorios.";
    exit;
}

if (!filter_var($correo, FILTER_VALIDATE_EMAIL)) {
    echo "ERROR: El correo electrónico no es válido.";
    exit;
}

if (strlen($password) < 6) {
    echo "ERROR: La contraseña debe tener al menos 6 caracteres.";
    exit;
}


$sql = "SELECT id FROM clientes WHERE correo = ?";

$stmt = $conexion->prepare($sql);
$stmt->bind_param("s", $correo);
$stmt->execute();

$resultado = $stmt->get_result();

if ($resultado->num_rows > 0) {
    echo "ERROR: Ya existe un usuario registrado con ese correo.";
    $stmt->close();
    $conexion->close();
    exit;
}

$stmt->close();


$password_segura = password_hash(
    $password,
    PASSWORD_DEFAULT
);

/* ==============================
   REGISTRAR CLIENTE
================================ */

$sql = "INSERT INTO clientes
        (nombre, correo, password, telefono, direccion)
        VALUES (?, ?, ?, ?, ?)";

$stmt = $conexion->prepare($sql);

$stmt->bind_param(
    "sssss",
    $nombre,
    $correo,
    $password_segura,
    $telefono,
    $direccion
);

if ($stmt->execute()) {

    echo "REGISTRO_EXITOSO";

} else {

    echo "ERROR: No se pudo registrar el usuario.";
}

$stmt->close();
$conexion->close();

?>