let productos = [];

function agregarProducto(nombre) {
  const nuevoProducto = {
    nombre: nombre,
    contador: 0
  };

  productos.push(nuevoProducto);
  actualizarProductos();
}

function actualizarProductos() {
  const productosDiv = document.getElementById('productos');
  productosDiv.innerHTML = '';

  productos.forEach((producto, index) => {
    const productoDiv = document.createElement('div');
    productoDiv.innerHTML = `
      <p>${producto.nombre}: 
        <span id="contador-${index}">${producto.contador}</span>
        <button onclick="incrementarContador(${index})">+1</button>
        <button onclick="decrementarContador(${index})">-1</button>
      </p>
    `;
    productosDiv.appendChild(productoDiv);
  });
}

function incrementarContador(index) {
  productos[index].contador++;
  const contadorSpan = document.getElementById(`contador-${index}`);
  contadorSpan.textContent = productos[index].contador;
}

function decrementarContador(index) {
  if (productos[index].contador > 0) {
    productos[index].contador--;
    const contadorSpan = document.getElementById(`contador-${index}`);
    contadorSpan.textContent = productos[index].contador;
  }
}

function exportarATexto() {
  let texto = '';

  productos.forEach(producto => {
    texto += `${producto.nombre}: ${producto.contador}\n`;
  });

  const blob = new Blob([texto], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'productos.txt';
  a.click();
  URL.revokeObjectURL(url);
}

document.getElementById('exportar-btn').addEventListener('click', exportarATexto);

document.getElementById('formulario').addEventListener('submit', function(event) {
  event.preventDefault();
  const nombreProducto = document.getElementById('nombreProducto').value;
  agregarProducto(nombreProducto);
  document.getElementById('nombreProducto').value = '';
});
