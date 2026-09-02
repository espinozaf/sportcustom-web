<?php

session_start();

require_once "conexion.php";

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo "Acceso no válido.";
    exit;
}

$correo = trim($_POST["correo"] ?? "");
$password = $_POST["password"] ?? "";

if ($correo === "" || $password === "") {
    echo "ERROR: Debes completar el correo y la contraseña.";
    exit;
}

if (!filter_var($correo, FILTER_VALIDATE_EMAIL)) {
    echo "ERROR: El correo electrónico no es válido.";
    exit;
}


/* =========================================
   BUSCAR USUARIO
========================================= */

$sql = "SELECT
            id,
            nombre,
            correo,
            password,
            telefono,
            direccion,
            es_admin
        FROM clientes
        WHERE correo = ?";

$stmt = $conexion->prepare($sql);

if (!$stmt) {
    echo "ERROR: No se pudo preparar la consulta.";
    exit;
}

$stmt->bind_param("s", $correo);
$stmt->execute();

$resultado = $stmt->get_result();

if ($resultado->num_rows === 0) {

    echo "ERROR: El correo o la contraseña son incorrectos.";

    $stmt->close();
    $conexion->close();

    exit;
}


/* =========================================
   DATOS DEL USUARIO
========================================= */

$cliente = $resultado->fetch_assoc();


/* =========================================
   VERIFICAR CONTRASEÑA
========================================= */

if (!password_verify($password, $cliente["password"])) {

    echo "ERROR: El correo o la contraseña son incorrectos.";

    $stmt->close();
    $conexion->close();

    exit;
}


/* =========================================
   CREAR SESIÓN
========================================= */

$_SESSION["cliente_id"] = (int) $cliente["id"];

$_SESSION["cliente_nombre"] = $cliente["nombre"];

$_SESSION["cliente_correo"] = $cliente["correo"];

$_SESSION["es_admin"] = (int) $cliente["es_admin"];


/* =========================================
   REDIRECCIÓN SEGÚN TIPO DE CUENTA
========================================= */

if ((int) $cliente["es_admin"] === 1) {

    echo "LOGIN_EXITOSO|ADMIN";

} else {

    echo "LOGIN_EXITOSO|CLIENTE";

}


/* =========================================
   CERRAR CONEXIÓN
========================================= */

$stmt->close();

$conexion->close();

?>