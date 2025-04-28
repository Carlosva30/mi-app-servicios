import React from 'react';

function PantallaInicio({ onVerServicios, onVerSolicitudes, onLogout }) {
  const cerrarSesion = () => {
    localStorage.removeItem('token');
    onLogout();
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      
      {/* Menú y Ubicación */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div style={{ fontSize: '24px' }}>☰</div> {/* Ícono menú hamburguesa */}
        <div style={{ fontSize: '16px' }}>📍 Ubicación</div>
      </div>

      {/* Barra de búsqueda */}
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Buscar servicio"
          style={{ width: '80%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
      </div>

      {/* Botones rápidos */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '20px' }}>
        <button onClick={onVerServicios} style={{ padding: '10px', width: '80px', height: '80px' }}>
          🔧<br />Plomería
        </button>

        <button onClick={onVerServicios} style={{ padding: '10px', width: '80px', height: '80px' }}>
          ⚡<br />Eléctrico
        </button>

        <button onClick={onVerServicios} style={{ padding: '10px', width: '80px', height: '80px' }}>
          🎨<br />Pintor
        </button>

        <button onClick={onVerServicios} style={{ padding: '10px', width: '80px', height: '80px' }}>
          ➕<br />Otros
        </button>
      </div>

      {/* Opciones adicionales */}
      <div>
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
