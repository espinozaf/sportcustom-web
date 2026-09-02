/* ========================================
   SPORTCUSTOM
   JAVASCRIPT PRINCIPAL
======================================== */


/* ========================================
   INICIO
======================================== */

document.addEventListener("DOMContentLoaded", function () {

    console.log("SPORTCUSTOM iniciado correctamente.");

    actualizarContadorCarrito();
    configurarNavegacion();
    configurarBotonesDiseño();
    configurarFooter();
    configurarBotonSubir();

});


/* ========================================
   CONTADOR DEL CARRITO
======================================== */

function actualizarContadorCarrito() {

    const contador = document.getElementById("cart-count");

    if (!contador) {
        return;
    }

    let carrito = [];

    try {
        carrito = JSON.parse(
            localStorage.getItem("sportcustom_carrito")
        ) || [];
    } catch (error) {
        carrito = [];
    }

    let cantidadTotal = 0;

    carrito.forEach(function (producto) {
        cantidadTotal += Number(producto.cantidad) || 0;
    });

    contador.textContent = cantidadTotal;
}


/* ========================================
   MENÚ / NAVEGACIÓN
======================================== */

function configurarNavegacion() {

    const enlaces = document.querySelectorAll(".nav-link");

    enlaces.forEach(function (enlace) {

        enlace.addEventListener("click", function () {

            enlaces.forEach(function (item) {
                item.classList.remove("active");
            });

            this.classList.add("active");

        });

    });

}


/* ========================================
   BOTONES DISEÑO
======================================== */

function configurarBotonesDiseño() {

    const botonesDiseño = document.querySelectorAll(
        'a[href="personalizador/index.html"]'
    );

    botonesDiseño.forEach(function (boton) {

        boton.addEventListener("click", function () {

            console.log(
                "El usuario quiere diseñar un uniforme."
            );

        });

    });

}


/* ========================================
   FOOTER
   VENTANAS DE INFORMACIÓN
======================================== */

function configurarFooter() {

    const footerLinks = document.querySelectorAll(".footer-links a");

    footerLinks.forEach(function (enlace) {

        const texto = enlace.textContent.trim().toLowerCase();

        if (texto.includes("centro de ayuda")) {

            enlace.addEventListener("click", function (evento) {

                evento.preventDefault();

                abrirVentana("ayuda");

            });

        }

        else if (texto.includes("guía de tallas")) {

            enlace.addEventListener("click", function (evento) {

                evento.preventDefault();

                abrirVentana("tallas");

            });

        }

        else if (texto.includes("logística y envíos")) {

            enlace.addEventListener("click", function (evento) {

                evento.preventDefault();

                abrirVentana("envios");

            });

        }

        else if (texto.includes("preguntas frecuentes")) {

            enlace.addEventListener("click", function (evento) {

                evento.preventDefault();

                abrirVentana("faq");

            });

        }

    });

}


/* ========================================
   CREAR VENTANA
======================================== */

function abrirVentana(tipo) {

    cerrarVentana();

    let contenido = "";

    /* ------------------------------------
       CENTRO DE AYUDA
    ------------------------------------ */

    if (tipo === "ayuda") {

        contenido = `
            <div class="sc-modal-overlay">

                <div class="sc-modal">

                    <button class="sc-modal-close">
                        <i class="bi bi-x-lg"></i>
                    </button>

                    <div class="sc-kicker">
                        SOPORTE AL CLIENTE
                    </div>

                    <h2>
                        CENTRO DE AYUDA Y RASTREO
                    </h2>

                    <div class="sc-subtitle">
                        SOPORTE PERSONALIZADO PARA CLUBES,
                        LIGAS Y FEDERACIONES
                    </div>

                    <p class="sc-description">
                        Contamos con un equipo de atención dedicado
                        para ayudarte a perfeccionar las especificaciones
                        gráficas de tu club. Puedes comunicarte directamente
                        a través de:
                    </p>

                    <div class="sc-info-grid">

                        <div class="sc-info-card">

                            <i class="bi bi-telephone"></i>

                            <div>
                                <strong>ATENCIÓN DIRECTA</strong>
                                <small>800-555-SPRT (9:00 - 18:00)</small>
                            </div>

                        </div>

                        <div class="sc-info-card">

                            <i class="bi bi-envelope"></i>

                            <div>
                                <strong>EMAIL DE SOPORTE</strong>
                                <small>soporte@sportcustom.com</small>
                            </div>

                        </div>

                    </div>

                    <div class="sc-tracking">

                        <div class="sc-tracking-title">
                            <i class="bi bi-clock"></i>
                            RASTREO DE PRODUCCIÓN DE LOTE

                            <span>
                                LOTE ACTIVO
                            </span>
                        </div>

                        <p>
                            Ingresa el código identificador de tu lote
                            o el ID de tu pedido para verificar el estado
                            del diseño, sublimado o confección láser actual.
                        </p>

                        <div class="sc-track-form">

                            <input
                                type="text"
                                id="scTrackingCode"
                                placeholder="Código de Lote (ej. LOT-4820)"
                            >

                            <button id="scTrackingButton">
                                CONSULTAR
                            </button>

                        </div>

                    </div>

                    <div class="sc-modal-footer">

                        <span>
                            <i class="bi bi-shield"></i>
                            GARANTÍA TOTAL SPORTCUSTOM
                        </span>

                        <button class="sc-close-button">
                            Cerrar Ventana
                        </button>

                    </div>

                </div>

            </div>
        `;

    }


    /* ------------------------------------
       GUÍA DE TALLAS
    ------------------------------------ */

    else if (tipo === "tallas") {

        contenido = `
            <div class="sc-modal-overlay">

                <div class="sc-modal">

                    <button class="sc-modal-close">
                        <i class="bi bi-x-lg"></i>
                    </button>

                    <div class="sc-kicker">
                        CONFECCIÓN ADAPTATIVA
                    </div>

                    <h2>
                        GUÍA OFICIAL DE TALLAS
                    </h2>

                    <div class="sc-subtitle">
                        JERSEYS CON CORTE ATLÉTICO Y FLEXIBILIDAD
                        DE MOVIMIENTO
                    </div>

                    <p class="sc-description">
                        Nuestras prendas de ingeniería deportiva SportCustom
                        se confeccionan con un corte atlético optimizado para
                        el fútbol, básquetbol y béisbol de alto rendimiento.
                    </p>

                    <div class="sc-table-container">

                        <table class="sc-size-table">

                            <thead>

                                <tr>
                                    <th>Talla</th>
                                    <th>Pecho (cm)</th>
                                    <th>Largo (cm)</th>
                                    <th>Estatura Sugerida</th>
                                </tr>

                            </thead>

                            <tbody>

                                <tr>
                                    <td>S</td>
                                    <td>96-101 cm</td>
                                    <td>70 cm</td>
                                    <td>Menor a 1.70 m</td>
                                </tr>

                                <tr>
                                    <td>M</td>
                                    <td>101-106 cm</td>
                                    <td>72 cm</td>
                                    <td>1.70 m - 1.76 m</td>
                                </tr>

                                <tr>
                                    <td>L</td>
                                    <td>106-111 cm</td>
                                    <td>74 cm</td>
                                    <td>1.76 m - 1.82 m</td>
                                </tr>

                                <tr>
                                    <td>XL</td>
                                    <td>111-120 cm</td>
                                    <td>76 cm</td>
                                    <td>1.82 m - 1.88 m</td>
                                </tr>

                                <tr>
                                    <td>2XL</td>
                                    <td>120-130 cm</td>
                                    <td>79 cm</td>
                                    <td>Mayor a 1.88 m</td>
                                </tr>

                            </tbody>

                        </table>

                    </div>

                    <div class="sc-advice">

                        <i class="bi bi-rulers"></i>

                        <div>
                            <strong>Recomendación del Staff:</strong>

                            Si prefieres un ajuste más holgado para poder
                            usar el jersey sobre ropa de abrigo o para un
                            ajuste cómodo de fin de semana, te sugerimos
                            pedir una talla más grande.
                        </div>

                    </div>

                    <div class="sc-modal-footer">

                        <span>
                            <i class="bi bi-shield"></i>
                            GARANTÍA TOTAL SPORTCUSTOM
                        </span>

                        <button class="sc-close-button">
                            Cerrar Ventana
                        </button>

                    </div>

                </div>

            </div>
        `;

    }


    /* ------------------------------------
       ENVÍOS
    ------------------------------------ */

    else if (tipo === "envios") {

        contenido = `
            <div class="sc-modal-overlay">

                <div class="sc-modal">

                    <button class="sc-modal-close">
                        <i class="bi bi-x-lg"></i>
                    </button>

                    <div class="sc-kicker">
                        LOGÍSTICA MUNDIAL PUERTA A PUERTA
                    </div>

                    <h2>
                        TIEMPOS DE PRODUCCIÓN Y ENVÍO
                    </h2>

                    <div class="sc-subtitle">
                        ENVÍOS GLOBALES EXPRESS CON TRACKING ACTIVO
                    </div>

                    <p class="sc-description">
                        Al ser indumentaria deportiva de alta gama diseñada
                        y confeccionada mediante procesos técnicos,
                        requerimos un periodo de producción ordenado para
                        garantizar que tu escudo, colores técnicos e hilos
                        no pierdan calidad.
                    </p>

                    <div class="sc-timeline">

                        <div class="sc-step">

                            <div class="sc-number">1</div>

                            <div>
                                <strong>
                                    Planificación de Lote Digital
                                    (1-3 días)
                                </strong>

                                <p>
                                    Revisión técnica de logos, vectorizados
                                    e integración estética de nombres y
                                    números en alineación perfecta.
                                </p>
                            </div>

                        </div>


                        <div class="sc-step">

                            <div class="sc-number">2</div>

                            <div>
                                <strong>
                                    Impresión y Sublimación Térmica
                                    (3-5 días)
                                </strong>

                                <p>
                                    Procesamiento de calor molecular.
                                    Las tintas se gasifican y fusionan
                                    molecularmente en las fibras.
                                </p>
                            </div>

                        </div>


                        <div class="sc-step">

                            <div class="sc-number">3</div>

                            <div>
                                <strong>
                                    Corte Láser y Costura Reforzada
                                    (2-4 días)
                                </strong>

                                <p>
                                    Corte mecánico asistido por computadora
                                    y costura plana de alta elasticidad para
                                    evitar rasgaduras en juego rudo.
                                </p>
                            </div>

                        </div>


                        <div class="sc-step">

                            <div class="sc-number">4</div>

                            <div>
                                <strong>
                                    Envío Express de Lote
                                    (3-5 días hábiles)
                                </strong>

                                <p>
                                    Despacho prioritario directo a tu domicilio
                                    mediante servicio de mensajería con código
                                    de rastreo en tiempo real.
                                </p>

                            </div>

                        </div>

                    </div>


                    <div class="sc-advice">

                        <i class="bi bi-truck"></i>

                        <div>
                            <strong>Garantía de Envío:</strong>

                            Todos los pedidos superiores a $150 USD
                            cuentan con envío internacional express
                            gratuito.
                        </div>

                    </div>


                    <div class="sc-modal-footer">

                        <span>
                            <i class="bi bi-shield"></i>
                            GARANTÍA TOTAL SPORTCUSTOM
                        </span>

                        <button class="sc-close-button">
                            Cerrar Ventana
                        </button>

                    </div>

                </div>

            </div>
        `;

    }


    /* ------------------------------------
       PREGUNTAS FRECUENTES
    ------------------------------------ */

    else if (tipo === "faq") {

        contenido = `
            <div class="sc-modal-overlay">

                <div class="sc-modal">

                    <button class="sc-modal-close">
                        <i class="bi bi-x-lg"></i>
                    </button>

                    <div class="sc-kicker">
                        DUDAS DE CONFECCIÓN RESUELTAS
                    </div>

                    <h2>
                        PREGUNTAS FRECUENTES
                    </h2>

                    <div class="sc-subtitle">
                        ACLARA TUS DUDAS SOBRE EL MATERIAL
                        PRO-DRI DE ALTO RENDIMIENTO
                    </div>


                    <div class="sc-faq">

                        <div class="sc-faq-item">

                            <strong>
                                <span>Q.</span>
                                ¿PUEDO PEDIR SOLO 1 PLAYERA
                                PERSONALIZADA PARA MÍ?
                            </strong>

                            <p>
                                ¡Totalmente! En nuestro Diseñador 3D puedes
                                crear desde un solo jersey premium para ti
                                sin requerir mínimos de fabricación.
                            </p>

                        </div>


                        <div class="sc-faq-item">

                            <strong>
                                <span>Q.</span>
                                ¿SE CUARTEA O SE CAE EL ESCUDO
                                CON LAS LAVADAS?
                            </strong>

                            <p>
                                No. La personalización se integra
                                directamente en el tejido, ofreciendo
                                resistencia y durabilidad durante los
                                ciclos normales de lavado.
                            </p>

                        </div>


                        <div class="sc-faq-item">

                            <strong>
                                <span>Q.</span>
                                ¿PUEDEN VECTORIZAR EL BORRADOR
                                A LÁPIZ DE LA INSIGNIA DE MI EQUIPO?
                            </strong>

                            <p>
                                Sí. Nuestro equipo de diseño puede digitalizar
                                y refinar el boceto para convertirlo en una
                                imagen lista para utilizar en el uniforme.
                            </p>

                        </div>


                        <div class="sc-faq-item">

                            <strong>
                                <span>Q.</span>
                                ¿CUÁNTO TARDA EN LLEGAR MI PEDIDO?
                            </strong>

                            <p>
                                El tiempo depende del tipo de producción y
                                método de envío seleccionado. Puedes consultar
                                nuestra sección de logística para conocer
                                las etapas del proceso.
                            </p>

                        </div>

                    </div>


                    <div class="sc-modal-footer">

                        <span>
                            <i class="bi bi-shield"></i>
                            GARANTÍA TOTAL SPORTCUSTOM
                        </span>

                        <button class="sc-close-button">
                            Cerrar Ventana
                        </button>

                    </div>

                </div>

            </div>
        `;

    }


    document.body.insertAdjacentHTML(
        "beforeend",
        contenido
    );


    configurarEventosVentana();

}


/* ========================================
   EVENTOS DE LAS VENTANAS
======================================== */

function configurarEventosVentana() {

    const ventana = document.querySelector(
        ".sc-modal-overlay"
    );

    if (!ventana) {
        return;
    }


    /* BOTÓN X */

    const botonCerrar = ventana.querySelector(
        ".sc-modal-close"
    );

    if (botonCerrar) {

        botonCerrar.addEventListener(
            "click",
            cerrarVentana
        );

    }


    /* BOTÓN CERRAR VENTANA */

    const botonCerrarAbajo = ventana.querySelector(
        ".sc-close-button"
    );

    if (botonCerrarAbajo) {

        botonCerrarAbajo.addEventListener(
            "click",
            cerrarVentana
        );

    }


    /* CERRAR HACIENDO CLIC FUERA */

    ventana.addEventListener(
        "click",
        function (evento) {

            if (evento.target === ventana) {
                cerrarVentana();
            }

        }
    );


    /* CONSULTAR LOTE */

    const botonTracking = document.getElementById(
        "scTrackingButton"
    );

    if (botonTracking) {

        botonTracking.addEventListener(
            "click",
            function () {

                const codigo =
                    document.getElementById(
                        "scTrackingCode"
                    ).value.trim();

                if (!codigo) {

                    alert(
                        "Ingresa un código de lote para consultar."
                    );

                    return;

                }

                alert(
                    "Consulta realizada para el lote: " +
                    codigo
                );

            }
        );

    }

}


/* ========================================
   CERRAR VENTANA
======================================== */

function cerrarVentana() {

    const ventana = document.querySelector(
        ".sc-modal-overlay"
    );

    if (ventana) {
        ventana.remove();
    }

}


/* ========================================
   TECLA ESC
======================================== */

document.addEventListener(
    "keydown",
    function (evento) {

        if (evento.key === "Escape") {

            cerrarVentana();

        }

    }
);


/* ========================================
   BOTÓN SUBIR
======================================== */

function configurarBotonSubir() {

    const boton = document.getElementById(
        "backTop"
    );

    if (!boton) {
        return;
    }


    window.addEventListener(
        "scroll",
        function () {

            if (window.scrollY > 300) {

                boton.classList.add("show");

            } else {

                boton.classList.remove("show");

            }

        }
    );


    boton.addEventListener(
        "click",
        function () {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );

}


/* ========================================
   ESTILOS DE LAS VENTANAS
   Se agregan automáticamente
======================================== */

const estilosVentanas = document.createElement("style");

estilosVentanas.textContent = `

.sc-modal-overlay {

    position: fixed;

    inset: 0;

    background: rgba(0, 0, 0, 0.82);

    backdrop-filter: blur(8px);

    display: flex;

    align-items: center;

    justify-content: center;

    padding: 25px;

    z-index: 99999;

}


.sc-modal {

    position: relative;

    width: min(900px, 95vw);

    max-height: 90vh;

    overflow-y: auto;

    background: #07101c;

    border: 1px solid #b9c6d8;

    border-radius: 25px;

    padding: 38px;

    box-shadow:
        0 30px 80px rgba(0,0,0,.65),
        0 0 40px rgba(0,220,255,.08);

}


.sc-modal-close {

    position: absolute;

    right: 25px;

    top: 22px;

    border: none;

    background: transparent;

    color: #8da0b7;

    font-size: 20px;

    cursor: pointer;

}


.sc-modal-close:hover {

    color: #9bf000;

}


.sc-kicker {

    color: #9bf000;

    font-family: monospace;

    font-size: 13px;

    font-weight: 700;

    letter-spacing: 2px;

    margin-bottom: 6px;

}


.sc-modal h2 {

    color: white;

    font-size: 30px;

    font-weight: 900;

    margin: 0 0 5px;

}


.sc-subtitle {

    color: #607795;

    font-family: monospace;

    font-size: 12px;

    letter-spacing: 1px;

    margin-bottom: 28px;

}


.sc-description {

    color: #7085a1;

    line-height: 1.6;

}


.sc-info-grid {

    display: grid;

    grid-template-columns:
        repeat(2, 1fr);

    gap: 15px;

    margin: 25px 0;

}


.sc-info-card {

    display: flex;

    align-items: center;

    gap: 15px;

    border: 1px solid #536276;

    border-radius: 15px;

    padding: 18px;

}


.sc-info-card > i {

    color: #9bf000;

    font-size: 22px;

}


.sc-info-card strong {

    display: block;

    color: white;

    font-size: 14px;

}


.sc-info-card small {

    display: block;

    color: #647b98;

    margin-top: 4px;

}


.sc-tracking {

    border: 1px solid #163b59;

    border-radius: 18px;

    padding: 22px;

    margin-top: 20px;

}


.sc-tracking-title {

    color: white;

    font-weight: 800;

}


.sc-tracking-title i {

    color: #9bf000;

    margin-right: 7px;

}


.sc-tracking-title span {

    float: right;

    color: #9bf000;

    font-family: monospace;

    font-size: 11px;

}


.sc-tracking p {

    color: #637994;

    font-size: 13px;

    line-height: 1.5;

}


.sc-track-form {

    display: flex;

    gap: 10px;

}


.sc-track-form input {

    flex: 1;

    background: #050b13;

    color: white;

    border: 1px solid #16445e;

    border-radius: 9px;

    padding: 12px 15px;

}


.sc-track-form button,
.sc-close-button {

    border: none;

    background: #9bf000;

    color: #061006;

    font-weight: 800;

    border-radius: 9px;

    padding: 12px 20px;

    cursor: pointer;

}


.sc-table-container {

    overflow-x: auto;

    border-radius: 15px;

    margin-top: 20px;

}


.sc-size-table {

    width: 100%;

    border-collapse: collapse;

    background: #050b13;

}


.sc-size-table th {

    color: #00d9ff;

    padding: 15px;

    text-align: left;

}


.sc-size-table td {

    color: #b5c0d0;

    padding: 15px;

    border-top: 1px solid #6b7480;

}


.sc-size-table td:first-child {

    color: #9bf000;

    font-weight: 800;

}


.sc-advice {

    display: flex;

    gap: 15px;

    align-items: flex-start;

    border: 1px solid #8290a3;

    border-radius: 14px;

    padding: 18px;

    margin-top: 18px;

    color: #657b97;

    line-height: 1.5;

    font-size: 13px;

}


.sc-advice > i {

    color: #00d9ff;

    font-size: 20px;

}


.sc-advice strong {

    color: #8aa0bb;

}


.sc-timeline {

    margin-top: 20px;

}


.sc-step {

    display: flex;

    gap: 16px;

    margin-bottom: 22px;

}


.sc-number {

    min-width: 27px;

    height: 27px;

    border: 1px solid #00d9ff;

    border-radius: 50%;

    color: #00d9ff;

    display: flex;

    align-items: center;

    justify-content: center;

    font-size: 12px;

}


.sc-step strong {

    color: white;

}


.sc-step p {

    color: #657b96;

    font-size: 13px;

    line-height: 1.5;

    margin-top: 5px;

}


.sc-faq {

    display: flex;

    flex-direction: column;

    gap: 15px;

}


.sc-faq-item {

    border: 1px solid #7f8a9a;

    border-radius: 14px;

    padding: 20px;

}


.sc-faq-item strong {

    color: white;

    display: block;

    font-size: 14px;

}


.sc-faq-item strong span {

    color: #9bf000;

    margin-right: 10px;

}


.sc-faq-item p {

    color: #657b96;

    line-height: 1.5;

    margin: 10px 0 0;

    font-size: 13px;

}


.sc-modal-footer {

    display: flex;

    justify-content: space-between;

    align-items: center;

    gap: 20px;

    border-top: 1px solid #405064;

    margin-top: 28px;

    padding-top: 20px;

}


.sc-modal-footer span {

    color: #5f7694;

    font-family: monospace;

    font-size: 11px;

}


.sc-modal-footer span i {

    color: #9bf000;

}


.sc-close-button {

    background: transparent;

    color: #00d9ff;

    border: 1px solid #07506a;

}


.sc-close-button:hover {

    background: #00d9ff;

    color: #06101a;

}


/* Scrollbar */

.sc-modal::-webkit-scrollbar {

    width: 8px;

}


.sc-modal::-webkit-scrollbar-thumb {

    background: #66707e;

    border-radius: 10px;

}


@media (max-width: 700px) {

    .sc-modal {

        padding: 25px;

        max-height: 92vh;

    }


    .sc-modal h2 {

        font-size: 23px;

    }


    .sc-info-grid {

        grid-template-columns: 1fr;

    }


    .sc-track-form {

        flex-direction: column;

    }


    .sc-modal-footer {

        flex-direction: column;

        align-items: stretch;

    }

    .sc-close-button {

        width: 100%;

    }

}

`;

document.head.appendChild(estilosVentanas);

/* ========================================
   CAMBIO DE TEMA
======================================== */

document.addEventListener("DOMContentLoaded", function () {

    const themeButton = document.getElementById("themeButton");

    if (!themeButton) {
        return;
    }

    const icon = themeButton.querySelector("i");

    // Recuperar tema guardado
    const temaGuardado = localStorage.getItem("sportcustom_tema");

    if (temaGuardado === "light") {
        document.body.classList.add("light-mode");

        if (icon) {
            icon.classList.remove("bi-sun");
            icon.classList.add("bi-moon");
        }
    }

    themeButton.addEventListener("click", function () {

        document.body.classList.toggle("light-mode");

        if (document.body.classList.contains("light-mode")) {

            localStorage.setItem("sportcustom_tema", "light");

            if (icon) {
                icon.classList.remove("bi-sun");
                icon.classList.add("bi-moon");
            }

        } else {

            localStorage.setItem("sportcustom_tema", "dark");

            if (icon) {
                icon.classList.remove("bi-moon");
                icon.classList.add("bi-sun");
            }
        }
    });

});

/* ========================================
   USUARIO / SESIÓN
======================================== */

document.addEventListener("DOMContentLoaded", function () {

    const userButton =
        document.getElementById("userButton");

    if (!userButton) {
        console.log(
            "No se encontró el botón de usuario."
        );
        return;
    }


    /* ========================================
       COMPROBAR SI ES ADMINISTRADOR
    ======================================== */

    fetch("/sportcustom/backend/admin_auth.php", {
        method: "GET",
        credentials: "same-origin",
        cache: "no-store"
    })

    .then(function(response) {

        if (!response.ok) {
            throw new Error(
                "Error HTTP: " + response.status
            );
        }

        return response.json();

    })

    .then(function(adminData) {

        console.log(
            "Estado administrador:",
            adminData
        );


        /* ====================================
           ADMINISTRADOR
        ==================================== */

        if (
            adminData.success === true &&
            adminData.admin === true
        ) {

            window.location.href =
                "/sportcustom/frontend/admin/index.html";

            return;
        }


        /* ====================================
           CLIENTE NORMAL
        ==================================== */

        return fetch(
            "/sportcustom/backend/usuario.php",
            {
                method: "GET",
                credentials: "same-origin",
                cache: "no-store"
            }
        );

    })

    .then(function(response) {

        if (!response) {
            return null;
        }

        if (!response.ok) {
            throw new Error(
                "Error HTTP: " + response.status
            );
        }

        return response.json();

    })

    .then(function(data) {

        if (!data) {
            return;
        }

        console.log(
            "Estado de sesión:",
            data
        );


        if (data.sesion === true) {

            userButton.href =
                "usuario/cuenta.html";

            userButton.title =
                "Cuenta de " + data.nombre;

            userButton.innerHTML =
                '<i class="bi bi-person-check"></i>';

        } else {

            userButton.href =
                "usuario/login.html";

            userButton.title =
                "Iniciar sesión / Registrarse";

            userButton.innerHTML =
                '<i class="bi bi-person"></i>';

        }

    })

    .catch(function(error) {

        console.error(
            "No se pudo comprobar la sesión:",
            error
        );

    });

});