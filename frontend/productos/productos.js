/* =====================================================
   SPORTCUSTOM
   JAVASCRIPT - COLECCIÓN / MAYORISTA
===================================================== */


document.addEventListener("DOMContentLoaded", function () {

    actualizarContador();

    configurarProductos();

});


/* =====================================================
   OBTENER CARRITO
===================================================== */

function obtenerCarrito() {

    try {

        return JSON.parse(
            localStorage.getItem(
                "sportcustom_carrito"
            )
        ) || [];

    } catch (error) {

        return [];

    }

}


/* =====================================================
   GUARDAR CARRITO
===================================================== */

function guardarCarrito(carrito) {

    localStorage.setItem(
        "sportcustom_carrito",
        JSON.stringify(carrito)
    );

}


/* =====================================================
   CONTADOR
===================================================== */

function actualizarContador() {

    const contador =
        document.getElementById(
            "cart-count"
        );

    if (!contador) {
        return;
    }

    const carrito =
        obtenerCarrito();

    let cantidad = 0;

    carrito.forEach(function (producto) {

        cantidad +=
            Number(producto.cantidad) || 0;

    });

    contador.textContent = cantidad;

}


/* =====================================================
   CONFIGURAR PRODUCTOS
===================================================== */

function configurarProductos() {

    const productos =
        document.querySelectorAll(
            ".product-card"
        );


    productos.forEach(function (producto) {

        const minus =
            producto.querySelector(
                ".quantity-minus"
            );

        const plus =
            producto.querySelector(
                ".quantity-plus"
            );

        const input =
            producto.querySelector(
                ".quantity-input"
            );

        const total =
            producto.querySelector(
                ".product-total strong"
            );

        const boton =
            producto.querySelector(
                ".add-kit-button"
            );

        const precio =
            Number(
                producto.dataset.price
            );

        const stock =
            Number(
                producto.dataset.stock
            );


        /* -----------------------------------------
           ACTUALIZAR TOTAL
        ----------------------------------------- */

        function actualizarTotal() {

            let cantidad =
                Number(input.value);

            if (isNaN(cantidad)) {

                cantidad = 1;

            }

            cantidad =
                Math.max(
                    1,
                    Math.min(
                        cantidad,
                        stock
                    )
                );

            input.value =
                cantidad;


            const subtotal =
                precio * cantidad;


            total.textContent =
                "$" +
                subtotal.toFixed(2);


            /* No permitir comprar
               más que el stock */

            if (cantidad >= stock) {

                plus.disabled = true;

            } else {

                plus.disabled = false;

            }

        }


        /* -----------------------------------------
           RESTAR
        ----------------------------------------- */

        minus.addEventListener(
            "click",
            function () {

                let cantidad =
                    Number(input.value);

                if (cantidad > 1) {

                    cantidad--;

                }

                input.value =
                    cantidad;

                actualizarTotal();

            }
        );


        /* -----------------------------------------
           SUMAR
        ----------------------------------------- */

        plus.addEventListener(
            "click",
            function () {

                let cantidad =
                    Number(input.value);


                if (cantidad < stock) {

                    cantidad++;

                } else {

                    mostrarMensaje(
                        "No hay más unidades disponibles."
                    );

                }


                input.value =
                    cantidad;

                actualizarTotal();

            }
        );


        /* -----------------------------------------
           ESCRIBIR CANTIDAD
        ----------------------------------------- */

        input.addEventListener(
            "input",
            actualizarTotal
        );


        /* -----------------------------------------
           AÑADIR AL CARRITO
        ----------------------------------------- */

        boton.addEventListener(
            "click",
            function () {

                let cantidad =
                    Number(input.value);


                if (
                    cantidad < 1 ||
                    cantidad > stock
                ) {

                    mostrarMensaje(
                        "La cantidad seleccionada no está disponible."
                    );

                    return;

                }


                const id =
                    producto.dataset.id;


                const nombre =
                    producto.querySelector(
                        ".product-information h3"
                    ).textContent.trim();


                const precioProducto =
                    Number(
                        producto.dataset.price
                    );


                let carrito =
                    obtenerCarrito();


                const existente =
                    carrito.find(
                        function (item) {

                            return item.id === id;

                        }
                    );


                /* ---------------------------------
                   SI YA ESTÁ EN EL CARRITO
                --------------------------------- */

                if (existente) {

                    const nuevaCantidad =
                        existente.cantidad +
                        cantidad;


                    if (
                        nuevaCantidad >
                        stock
                    ) {

                        mostrarMensaje(
                            "No puedes agregar más unidades de este producto porque el stock disponible es " +
                            stock +
                            "."
                        );

                        return;

                    }


                    existente.cantidad =
                        nuevaCantidad;

                }


                /* ---------------------------------
                   PRODUCTO NUEVO
                --------------------------------- */

                else {

                    carrito.push({

                        id: id,

                        nombre: nombre,

                        precio: precioProducto,

                        cantidad: cantidad,

                        stock: stock,

                        tipo: "mayorista"

                    });

                }


                guardarCarrito(
                    carrito
                );


                actualizarContador();


                mostrarMensaje(
                    nombre +
                    " fue añadido al carrito."
                );


                /* Volver a 1 */

                input.value = 1;

                actualizarTotal();

            }
        );


        actualizarTotal();

    });

}


/* =====================================================
   MENSAJE
===================================================== */

function mostrarMensaje(texto) {

    const anterior =
        document.querySelector(
            ".sc-toast"
        );


    if (anterior) {
        anterior.remove();
    }


    const toast =
        document.createElement(
            "div"
        );


    toast.className =
        "sc-toast";


    toast.innerHTML = `

        <i class="bi bi-check-circle"></i>

        <span>
            ${texto}
        </span>

    `;


    document.body.appendChild(
        toast
    );


    setTimeout(
        function () {

            toast.classList.add(
                "hide"
            );

            setTimeout(
                function () {

                    toast.remove();

                },
                300
            );

        },
        3000
    );

}


/* =====================================================
   ESTILO DEL MENSAJE
===================================================== */

const toastStyle =
    document.createElement(
        "style"
    );


toastStyle.textContent = `

.sc-toast {

    position: fixed;

    right: 25px;

    bottom: 25px;

    z-index: 9999;

    display: flex;

    align-items: center;

    gap: 10px;

    background: #091522;

    color: white;

    border:
        1px solid #9bf000;

    border-radius: 10px;

    padding: 14px 18px;

    box-shadow:
        0 15px 40px rgba(0,0,0,.5);

    font-size: 13px;

    font-weight: 700;

    animation:
        scToastIn .25s ease;

}

.sc-toast i {

    color: #9bf000;

    font-size: 20px;

}

.sc-toast.hide {

    opacity: 0;

    transform:
        translateY(10px);

    transition: .3s;

}

@keyframes scToastIn {

    from {

        opacity: 0;

        transform:
            translateY(15px);

    }

    to {

        opacity: 1;

        transform:
            translateY(0);

    }

}

`;

document.head.appendChild(
    toastStyle
);