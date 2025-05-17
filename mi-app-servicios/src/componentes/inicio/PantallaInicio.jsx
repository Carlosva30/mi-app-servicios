import React, { useState } from 'react';

const EXPERTOS = [
  {
    id: 1,
    nombre: 'Pedro Plomero',
    servicio: 'Plomería',
    foto: 'https://via.placeholder.com/150x150',
    precio: 40000,
    disponibilidad: 'Disponible'
  },
  {
    id: 2,
    nombre: 'Laura Electricista',
    servicio: 'Eléctrico',
    foto: 'https://via.placeholder.com/150x150',
    precio: 55000,
    disponibilidad: 'Disponible'
  },
  {
    id: 3,
    nombre: 'Juan Pintor',
    servicio: 'Pintor',
    foto: 'https://via.placeholder.com/150x150',
    precio: 30000,
    disponibilidad: 'Ocupado'
  },
  {
    id: 4,
    nombre: 'Ana TodoServicio',
    servicio: 'Otros',
    foto: 'https://via.placeholder.com/150x150',
    precio: 25000,
    disponibilidad: 'Disponible'
  }
];

const formatoPesos = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  minimumFractionDigits: 0
});

function PantallaInicio({ onSeleccionarServicio, onVerSolicitudes, onLogout, onCotizar }) {
  const [textoBusqueda, setTextoBusqueda] = useState('');
  const [resultados, setResultados] = useState([]);

  let usuario = null;
  try {
    const raw = localStorage.getItem('usuario');
    if (raw) usuario = JSON.parse(raw);
  } catch (e) {
    console.error('❌ Error al leer usuario del localStorage:', e);
  }

  const tipoUsuario = localStorage.getItem('tipoUsuario') || '';

  const cerrarSesion = () => {
    localStorage.clear();
    onLogout();
  };

  const manejarBusqueda = () => {
    const texto = textoBusqueda.toLowerCase();
    const filtrados = EXPERTOS.filter(experto =>
      experto.servicio.toLowerCase().includes(texto) ||
      experto.nombre.toLowerCase().includes(texto)
    );
    setResultados(filtrados);
  };

  return (
    <div style={{ backgroundColor: '#f5f5f5', minHeight: '100vh', padding: '10px' }}>
      <div style={{ backgroundColor: 'white', padding: '10px', borderRadius: '8px', marginBottom: '10px' }}>
        <input
          type="text"
          placeholder="Buscar servicio (Ej: Plomería o Juan)"
          value={textoBusqueda}
          onChange={(e) => setTextoBusqueda(e.target.value)}
          style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <button onClick={manejarBusqueda} style={{ marginTop: '10px', padding: '10px 20px', backgroundColor: '#1e318a', color: 'white', border: 'none', borderRadius: '5px' }}>
          Buscar
        </button>
      </div>

      {usuario && (
        <div style={{ marginBottom: '10px', textAlign: 'center' }}>
          <strong>Hola, {usuario.nombre}</strong> ({tipoUsuario})
        </div>
      )}

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', justifyContent: 'center' }}>
        {resultados.map((experto) => (
          <div
            key={experto.id}
            style={{
              backgroundColor: 'white',
              borderRadius: '10px',
              width: '160px',
              padding: '10px',
              textAlign: 'center',
              boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)'
            }}
          >
            <img src={experto.foto} alt={experto.nombre} style={{ width: '100%', borderRadius: '8px' }} />
            <h4 style={{ fontSize: '16px', margin: '10px 0 5px 0' }}>{experto.nombre}</h4>
            <p style={{ margin: 0 }}>{experto.servicio}</p>
            <p style={{ color: '#e60023', fontWeight: 'bold' }}>{formatoPesos.format(experto.precio)}</p>
            <p style={{ color: experto.disponibilidad === 'Disponible' ? 'green' : 'red', fontSize: '13px' }}>
              {experto.disponibilidad}
            </p>
            <button
              onClick={() => onCotizar(experto)}
              style={{ padding: '6px 10px', backgroundColor: '#1e318a', color: 'white', border: 'none', borderRadius: '5px' }}
            >
              Solicitar
            </button>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '30px', textAlign: 'center' }}>
        <button onClick={onVerSolicitudes} style={{ marginRight: '10px', padding: '10px 20px', backgroundColor: '#1e318a', color: 'white', border: 'none', borderRadius: '5px' }}>
          Ver solicitudes guardadas
        </button>
        <button onClick={cerrarSesion} style={{ padding: '10px 20px', backgroundColor: '#d32f2f', color: 'white', border: 'none', borderRadius: '5px' }}>
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}

export default PantallaInicio;
