const productos = [
    { nombre: 'Castillo numero 1', precio: 2500 },
    { nombre: 'Castillo numero 2', precio: 2800 },
    { nombre: 'Granja',precio: 2300 },
    { nombre: 'Casita de muñecas', precio: 3500 },
];

let carrito = [];

const listaProductos = document.getElementById('listaProductos');

const carritoLista = document.getElementById('carritoLista');

const totalPagarElement = document.getElementById('totalPagar');

const finalizarCompraBtn = document.getElementById('finalizarCompra');

const mensajeCarritoVacio = document.getElementById('mensajeCarritoVacio');

function actualizarCarrito() {
    carritoLista.innerHTML = '';

    let totalPagar = 0;
    carrito.forEach(function(producto, index) {
        totalPagar += producto.precio;
        const carritoItem = document.createElement('li');
        carritoItem.className = 'list-group-item';
        carritoItem.innerText = `${producto.nombre} - Precio: $${producto.precio.toFixed(2)}`;

        const deleteButton = document.createElement('button');
        deleteButton.className = 'btn btn-danger float-right ml-2';
        deleteButton.innerText = 'Eliminar';

        deleteButton.addEventListener('click', function() {
            carrito.splice(index, 1);
            actualizarCarrito();
        });

        carritoItem.appendChild(deleteButton);

        carritoLista.appendChild(carritoItem);
    });

    totalPagarElement.innerText = totalPagar.toFixed(2);

    localStorage.setItem('carrito', JSON.stringify(carrito));

    if (carrito.length > 0) {
        mensajeCarritoVacio.style.display = 'block';
    } else {
        mensajeCarritoVacio.style.display = 'none';
    }
}

productos.forEach(function(producto) {
    const listItem = document.createElement('li');
    listItem.className = 'list-group-item';

    const addButton = document.createElement('button');

    addButton.addEventListener('click', (e) =>{
        e.preventDefault();
        Swal.fire({
            icon: 'success',
            title: 'Producto Agregado',
            text: 'El producto se agrego correctamente',
          })
    });

    addButton.className = 'btn btn-success float-right';
    addButton.innerText = 'Comprar';

    listItem.innerText = `${producto.nombre} - Precio: $${producto.precio.toFixed(2)}`;

    listItem.appendChild(addButton);

    addButton.addEventListener('click', function() {
        carrito.push(producto);
        actualizarCarrito();
    });

    listaProductos.appendChild(listItem);
});

const carritoGuardado = localStorage.getItem('carrito');
if (carritoGuardado) {
    carrito = JSON.parse(carritoGuardado);
    actualizarCarrito();
}

finalizarCompraBtn.addEventListener('click', function() {
    carrito = [];
    actualizarCarrito();
});