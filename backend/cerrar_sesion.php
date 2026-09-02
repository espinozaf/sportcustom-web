<?php

session_start();

/* Eliminar todos los datos de la sesión */
$_SESSION = [];

/* Eliminar la cookie de sesión */
if (ini_get("session.use_cookies")) {

    $params = session_get_cookie_params();

    setcookie(
        session_name(),
        '',
        time() - 42000,
        $params["path"],
        $params["domain"],
        $params["secure"],
        $params["httponly"]
    );
}

/* Destruir la sesión */
session_destroy();

/* Volver al inicio principal */
header("Location: /sportcustom/frontend/index.html");

exit;

?>