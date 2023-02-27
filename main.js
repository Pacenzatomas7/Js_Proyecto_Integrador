const productos = [
    {
        id: "cerve1",
        titulo:"CREAM",
        imagen:"./assets/img/cerve7.png",
        categoria:{
            nombre: "Rubia",
            id:"rubia",
        },
        precio: 650,
    },
    {
        id: "cerve2",
        titulo:"RED IPA",
        imagen:"./assets/img/cerve6.png",
        categoria:{
            nombre: "Roja",
            id:"roja",
        },
        precio: 700,
    },
    {
        id: "cerve3",
        titulo:"IPA",
        imagen:"./assets/img/cerve8.png",
        categoria:{
            nombre: "Special",
            id:"special",
        },
        precio: 700,
    },
    {
        id: "cerve4",
        titulo:"APA",
        imagen:"./assets/img/cerve5.png",
        categoria:{
            nombre: "Special",
            id:"special",
        },
        precio: 650,
    },
    {
        id: "cerve5",
        titulo:"IRISH RED",
        imagen:"./assets/img/cerve4.png",
        categoria:{
            nombre: "Roja",
            id:"roja",
        },
        precio: 650,
    },
    {
        id: "cerve6",
        titulo:"MUNICH",
        imagen:"./assets/img/cerve1.png",
        categoria:{
            nombre: "Rubia",
            id:"rubia",
        },
        precio: 700,
    },
    {
        id: "cerve7",
        titulo:"STOUT",
        imagen:"./assets/img/cerve3.png",
        categoria:{
            nombre: "Negra",
            id:"negra",
        },
        precio: 700,
    },
    {
        id: "cerve8",
        titulo:"RED",
        imagen:"./assets/img/cerve2.png",
        categoria:{
            nombre: "Roja",
            id:"roja",
        },
        precio: 650,
    },
]

const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".category");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".btn_product");
const numeroCart = document.querySelector("#number-cart");

function cargarProductos (productosElegidos) {

    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="product_info">
                <h3>${producto.titulo}</h3>
                <span> $${producto.precio}</span>
                <button class="btn_product" id="${producto.id}">Comprar</button>
            </div>`;

        contenedorProductos.append(div);

    })

    actualizarBotonesAgregar();
}

cargarProductos(productos);

botonesCategorias.forEach(boton => {
    boton.addEventListener("click",(e) =>{

        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "todos") {
            const productoCategoria = productos.find (producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;

            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
        cargarProductos(productosBoton);
        } else {
            tituloPrincipal.innerText = "Nuestras cervezas";
            cargarProductos(productos)
        }
        
    })
});

function actualizarBotonesAgregar() {
     botonesAgregar = document.querySelectorAll(".btn_product");

     botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
     });
}

let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if (productosEnCarritoLS) {
     productosEnCarrito = JSON.parse(productosEnCarritoLS); 
     actualizarNumero();
} else {
    productosEnCarrito = [];
}


function agregarAlCarrito(e) {

    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if(productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index= productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad ++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    actualizarNumero();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

function actualizarNumero () {
    let nuevoNumero = productosEnCarrito.reduce((acc,producto) => acc + producto.cantidad, 0);
    numeroCart.innerText = nuevoNumero;
}