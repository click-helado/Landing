import React from 'react';
function App() {
  const [sabores, setSabores] = React.useState([
    { id: 1, nombre: 'Chocolate', descripcion: 'Intenso chocolate belga', precio: '$800' },
    { id: 2, nombre: 'Frutilla', descripcion: 'Con trozos de fruta natural', precio: '$750' },
    { id: 3, nombre: 'Dulce de Leche', descripcion: 'Clásico argentino', precio: '$850' },
    { id: 4, nombre: 'Limón', descripcion: 'Refrescante y natural', precio: '$700' },
    { id: 5, nombre: 'Vainilla', descripcion: 'Suave y cremosa', precio: '$700' },
    { id: 6, nombre: 'Menta Granizada', descripcion: 'Con chips de chocolate', precio: '$800' }
  ]);

  const [productos, setProductos] = React.useState([
    { id: 1, nombre: '1/4 kg', descripcion: 'Perfecto para 1-2 personas', precio: '$2500' },
    { id: 2, nombre: '1/2 kg', descripcion: 'Ideal para compartir', precio: '$4500' },
    { id: 3, nombre: '1 kg', descripcion: 'Para toda la familia', precio: '$8500' },
    { id: 4, nombre: 'Palitos', descripcion: 'Caja x6 unidades', precio: '$3000' }
  ]);

  const [nuevoSabor, setNuevoSabor] = React.useState({ nombre: '', descripcion: '', precio: '' });
  const [nuevoProducto, setNuevoProducto] = React.useState({ nombre: '', descripcion: '', precio: '' });
  const [editando, setEditando] = React.useState({ tipo: null, id: null });
  const [datosContacto, setDatosContacto] = React.useState({
    whatsapp: '+5492914469704',
    direccion: 'Vicente Fatone 657, Bahía Blanca, Buenos Aires, Argentina'
  });

  const whatsappLink = `https://wa.me/${datosContacto.whatsapp.replace(/\+/g, '')}?text=Hola! Me gustaría hacer un pedido de Click-Helado`;

  const agregarSabor = () => {
    if (nuevoSabor.nombre && nuevoSabor.precio) {
      setSabores([...sabores, { ...nuevoSabor, id: Date.now() }]);
      setNuevoSabor({ nombre: '', descripcion: '', precio: '' });
    }
  };

  const agregarProducto = () => {
    if (nuevoProducto.nombre && nuevoProducto.precio) {
      setProductos([...productos, { ...nuevoProducto, id: Date.now() }]);
      setNuevoProducto({ nombre: '', descripcion: '', precio: '' });
    }
  };

  const eliminarSabor = (id) => {
    setSabores(sabores.filter(s => s.id !== id));
  };

  const eliminarProducto = (id) => {
    setProductos(productos.filter(p => p.id !== id));
  };

  const editarItem = (tipo, item) => {
    setEditando({ tipo, id: item.id });
  };

  const guardarEdicion = (tipo, id, campo, valor) => {
    if (tipo === 'sabor') {
      setSabores(sabores.map(s => s.id === id ? { ...s, [campo]: valor } : s));
    } else {
      setProductos(productos.map(p => p.id === id ? { ...p, [campo]: valor } : p));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-blue-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-pink-500 to-purple-600 text-white py-8 shadow-lg">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-2">🍦 Click-Helado</h1>
          <p className="text-xl">Los mejores helados artesanales de Bahía Blanca</p>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 text-center">
        <div className="bg-white rounded-lg shadow-xl p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">¡Pedí tu helado favorito!</h2>
          <p className="text-lg text-gray-600 mb-6">Hacé tu pedido por WhatsApp y te lo llevamos</p>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-full text-xl transition transform hover:scale-105 shadow-lg"
          >
            <i className="fab fa-whatsapp mr-2"></i>
            Hacer Pedido por WhatsApp
          </a>
          <div className="mt-4 text-sm text-gray-500">
            <p>📱 {datosContacto.whatsapp}</p>
            <p>📍 {datosContacto.direccion}</p>
          </div>
        </div>
      </section>

      {/* Sabores Section */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-4xl font-bold text-center mb-8 text-purple-700">Nuestros Sabores</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {sabores.map(sabor => (
            <div key={sabor.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
              {editando.tipo === 'sabor' && editando.id === sabor.id ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={sabor.nombre}
                    onChange={(e) => guardarEdicion('sabor', sabor.id, 'nombre', e.target.value)}
                    className="w-full border rounded px-2 py-1"
                  />
                  <input
                    type="text"
                    value={sabor.descripcion}
                    onChange={(e) => guardarEdicion('sabor', sabor.id, 'descripcion', e.target.value)}
                    className="w-full border rounded px-2 py-1"
                  />
                  <input
                    type="text"
                    value={sabor.precio}
                    onChange={(e) => guardarEdicion('sabor', sabor.id, 'precio', e.target.value)}
                    className="w-full border rounded px-2 py-1"
                  />
                  <button
                    onClick={() => setEditando({ tipo: null, id: null })}
                    className="bg-green-500 text-white px-3 py-1 rounded text-sm"
                  >
                    Guardar
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="text-2xl font-bold text-pink-600 mb-2">{sabor.nombre}</h3>
                  <p className="text-gray-600 mb-3">{sabor.descripcion}</p>
                  <p className="text-xl font-bold text-purple-700">{sabor.precio}</p>
                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => editarItem('sabor', sabor)}
                      className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => eliminarSabor(sabor.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                    >
                      Eliminar
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        {/* Agregar Sabor */}
        <div className="bg-purple-100 rounded-lg p-6 max-w-2xl mx-auto">
          <h3 className="text-xl font-bold mb-4 text-purple-800">Agregar Nuevo Sabor</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <input
              type="text"
              placeholder="Nombre del sabor"
              value={nuevoSabor.nombre}
              onChange={(e) => setNuevoSabor({ ...nuevoSabor, nombre: e.target.value })}
              className="border rounded px-3 py-2"
            />
            <input
              type="text"
              placeholder="Descripción"
              value={nuevoSabor.descripcion}
              onChange={(e) => setNuevoSabor({ ...nuevoSabor, descripcion: e.target.value })}
              className="border rounded px-3 py-2"
            />
            <input
              type="text"
              placeholder="Precio"
              value={nuevoSabor.precio}
              onChange={(e) => setNuevoSabor({ ...nuevoSabor, precio: e.target.value })}
              className="border rounded px-3 py-2"
            />
          </div>
          <button
            onClick={agregarSabor}
            className="mt-3 bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700 w-full"
          >
            Agregar Sabor
          </button>
        </div>
      </section>

      {/* Productos Section */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-4xl font-bold text-center mb-8 text-pink-700">Nuestros Productos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {productos.map(producto => (
            <div key={producto.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
              {editando.tipo === 'producto' && editando.id === producto.id ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={producto.nombre}
                    onChange={(e) => guardarEdicion('producto', producto.id, 'nombre', e.target.value)}
                    className="w-full border rounded px-2 py-1"
                  />
                  <input
                    type="text"
                    value={producto.descripcion}
                    onChange={(e) => guardarEdicion('producto', producto.id, 'descripcion', e.target.value)}
                    className="w-full border rounded px-2 py-1"
                  />
                  <input
                    type="text"
                    value={producto.precio}
                    onChange={(e) => guardarEdicion('producto', producto.id, 'precio', e.target.value)}
                    className="w-full border rounded px-2 py-1"
                  />
                  <button
                    onClick={() => setEditando({ tipo: null, id: null })}
                    className="bg-green-500 text-white px-3 py-1 rounded text-sm"
                  >
                    Guardar
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="text-2xl font-bold text-pink-600 mb-2">{producto.nombre}</h3>
                  <p className="text-gray-600 mb-3">{producto.descripcion}</p>
                  <p className="text-xl font-bold text-purple-700">{producto.precio}</p>
                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => editarItem('producto', producto)}
                      className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => eliminarProducto(producto.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                    >
                      Eliminar
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        {/* Agregar Producto */}
        <div className="bg-pink-100 rounded-lg p-6 max-w-2xl mx-auto">
          <h3 className="text-xl font-bold mb-4 text-pink-800">Agregar Nuevo Producto</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <input
              type="text"
              placeholder="Nombre del producto"
              value={nuevoProducto.nombre}
              onChange={(e) => setNuevoProducto({ ...nuevoProducto, nombre: e.target.value })}
              className="border rounded px-3 py-2"
            />
            <input
              type="text"
              placeholder="Descripción"
              value={nuevoProducto.descripcion}
              onChange={(e) => setNuevoProducto({ ...nuevoProducto, descripcion: e.target.value })}
              className="border rounded px-3 py-2"
            />
            <input
              type="text"
              placeholder="Precio"
              value={nuevoProducto.precio}
              onChange={(e) => setNuevoProducto({ ...nuevoProducto, precio: e.target.value })}
              className="border rounded px-3 py-2"
            />
          </div>
          <button
            onClick={agregarProducto}
            className="mt-3 bg-pink-600 text-white px-6 py-2 rounded hover:bg-pink-700 w-full"
          >
            Agregar Producto
          </button>
        </div>
      </section>

      {/* CTA WhatsApp */}
      <section className="container mx-auto px-4 py-12">
        <div className="bg-gradient-to-r from-green-400 to-green-600 rounded-lg shadow-xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">¿Listo para disfrutar?</h2>
          <p className="text-xl mb-6">Hacé click en el botón y pedí por WhatsApp</p>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-green-600 font-bold py-4 px-8 rounded-full text-xl transition transform hover:scale-105 shadow-lg hover:shadow-2xl"
          >
            <i className="fab fa-whatsapp mr-2"></i>
            Contactar por WhatsApp
          </a>
        </div>
      </section>

      {/* Editar Datos de Contacto */}
      <section className="container mx-auto px-4 py-8">
        <div className="bg-gray-100 rounded-lg p-6 max-w-2xl mx-auto">
          <h3 className="text-xl font-bold mb-4 text-gray-800">Editar Datos de Contacto</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-bold mb-1">WhatsApp:</label>
              <input
                type="text"
                value={datosContacto.whatsapp}
                onChange={(e) => setDatosContacto({ ...datosContacto, whatsapp: e.target.value })}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1">Dirección:</label>
              <input
                type="text"
                value={datosContacto.direccion}
                onChange={(e) => setDatosContacto({ ...datosContacto, direccion: e.target.value })}
                className="w-full border rounded px-3 py-2"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-purple-600 to-pink-500 text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-2">Click-Helado</h3>
          <p className="mb-2">📍 {datosContacto.direccion}</p>
          <p className="mb-4">📱 {datosContacto.whatsapp}</p>
          <p className="text-sm">© 2026 Click-Helado - Todos los derechos reservados</p>
        </div>
      </footer>
    </div>
  );
}
export default App;
