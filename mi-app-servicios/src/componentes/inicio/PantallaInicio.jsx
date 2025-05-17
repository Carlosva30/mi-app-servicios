import React, { useState } from 'react';

const EXPERTOS = [
  {
    id: 1,
    nombre: 'Pedro Plomero',
    servicio: 'Plomería',
    foto: 'https://via.placeholder.com/80',
    calificacion: 4.5,
    disponibilidad: 'Disponible'
  },
  {
    id: 2,
    nombre: 'Laura Electricista',
    servicio: 'Eléctrico',
    foto: 'https://via.placeholder.com/80',
    calificacion: 4.8,
    disponibilidad: 'Disponible'
  },
  {
    id: 3,
    nombre: 'Juan Pintor',
    servicio: 'Pintor',
    foto: 'https://via.placeholder.com/80',
    calificacion: 4.2,
    disponibilidad: 'Ocupado'
  },
  {
    id: 4,
    nombre: 'Ana TodoServicio',
    servicio: 'Otros',
    foto: 'https://via.placeholder.com/80',
    calificacion: 4.7,
    disponibilidad: 'Disponible'
  }
];

function PantallaInicio({ onSeleccionarServicio, onVerSolicitudes, onLogout, onCotizar }) {
  const [textoBusqueda, setTextoBusqueda] = useState('');
  const [resultados, setResultados] = useState([]);

  // ✅ Manejo seguro de usuario
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

  // ✅ Buscador mejorado: filtra por nombre y servicio
  const manejarBusqueda = () => {
    const texto = textoBusqueda.toLowerCase();
    const filtrados = EXPERTOS.filter(experto =>
      experto.servicio.toLowerCase().includes(texto) ||
      experto.nombre.toLowerCase().includes(texto)
    );
    setResultados(filtrados);
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center', color: 'white', backgroundColor: '#1e318a', minHeight: '100vh' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div style={{ fontSize: '24px' }}>☰</div>
        <div style={{ fontSize: '16px' }}>📍 Dirección</div>
      </div>

      {usuario && (
        <div style={{ marginBottom: '20px', fontSize: '16px' }}>
          <p><strong>Hola, {usuario.nombre}</strong> ({tipoUsuario})</p>
        </div>
      )}

      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Buscar servicio (Ej: Plomería o Juan)"
          value={textoBusqueda}
          onChange={(e) => setTextoBusqueda(e.target.value)}
          style={{ width: '70%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <button onClick={manejarBusqueda} style={{ padding: '10px 20px', marginLeft: '10px' }}>
          Buscar
        </button>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '15px' }}>
        {resultados.map((experto) => (
          <div
            key={experto.id}
            style={{
              border: '1px solid #ccc',
              padding: '10px',
              borderRadius: '10px',
              width: '180px',
              textAlign: 'center',
              backgroundColor: 'white',
              color: 'black'
            }}
          >
            <img src={experto.foto} alt={experto.nombre} style={{ width: '80px', height: '80px', borderRadius: '50%' }} />
            <h4>{experto.nombre}</h4>
            <p>{experto.servicio}</p>
            <p>⭐ {experto.calificacion}</p>
            <p style={{ color: experto.disponibilidad === 'Disponible' ? 'green' : 'red' }}>
              {experto.disponibilidad}
            </p>
            <button
              onClick={() => onCotizar(experto)}
              style={{ marginTop: '10px', padding: '5px 10px' }}
            >
              Cotizar
            </button>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '30px' }}>
        <button onClick={onVerSolicitudes} style={{ marginRight: '10px', padding: '10px 20px' }}>
          Ver solicitudes guardadas
        </button>
        <button onClick={cerrarSesion} style={{ padding: '10px 20px' }}>
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}

export default PantallaInicio;

