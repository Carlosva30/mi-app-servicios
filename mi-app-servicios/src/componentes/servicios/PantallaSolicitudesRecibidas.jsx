import React, { useEffect, useState } from 'react';
import axios from 'axios';

function PantallaSolicitudesRecibidas({ onVolver }) {
  const [solicitudes, setSolicitudes] = useState([]);

  useEffect(() => {
    const obtenerSolicitudes = async () => {
      try {
        const token = localStorage.getItem('token');

        const res = await axios.get(
          'https://backend-nowservices.onrender.com/api/solicitudes/recibidas',
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );

        setSolicitudes(res.data.solicitudes || []);
      } catch (error) {
        console.error('❌ Error obteniendo solicitudes:', error);
      }
    };

    obtenerSolicitudes();
  }, []);

  const actualizarEstado = async (id, estado) => {
    try {
      const token = localStorage.getItem('token');

      const res = await axios.put(
        `https://backend-nowservices.onrender.com/api/solicitudes/${id}`,
        { estado },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSolicitudes((prev) =>
        prev.map((s) => (s._id === id ? res.data.solicitud : s))
      );
    } catch (error) {
      console.error('❌ Error actualizando estado:', error);
    }
  };

  return (
    <div style={{ backgroundColor: '#1e318a', color: 'white', minHeight: '100vh', padding: '20px' }}>
      <h2 style={{ textAlign: 'center' }}>Solicitudes Recibidas</h2>

      {solicitudes.length === 0 ? (
        <p style={{ textAlign: 'center' }}>No hay solicitudes por ahora.</p>
      ) : (
        solicitudes.map((solicitud, index) => (
          <div key={index} style={{ backgroundColor: 'white', color: '#1e318a', borderRadius: '10px', padding: '15px', marginBottom: '20px' }}>
            <p><strong>Servicio:</strong> {solicitud.servicio}</p>
            <p><strong>Descripción:</strong> {solicitud.descripcion}</p>
            <p><strong>Cliente:</strong> {solicitud.email}</p>
            <p><strong>Fecha:</strong> {new Date(solicitud.fecha).toLocaleString()}</p>
            <p><strong>Estado:</strong> {solicitud.estado}</p>

            {solicitud.estado === 'pendiente' && (
              <div style={{ marginTop: '10px' }}>
                <button
                  onClick={() => actualizarEstado(solicitud._id, 'aceptada')}
                  style={btn('green')}
                >
                  ✅ Aceptar
                </button>
                <button
                  onClick={() => actualizarEstado(solicitud._id, 'rechazada')}
                  style={btn('gray')}
                >
                  ❌ Rechazar
                </button>
              </div>
            )}

            {solicitud.estado === 'aceptada' && (
              <button
                onClick={() => actualizarEstado(solicitud._id, 'realizada_experto')}
                style={btn('orange')}
              >
                📦 Marcar como realizada
              </button>
            )}

            {solicitud.estado === 'completada' && (
              <p style={{ color: 'green', fontWeight: 'bold' }}>✅ Servicio completado</p>
            )}
          </div>
        ))
      )}

      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <button
          onClick={onVolver}
          style={{
            padding: '10px 20px',
            backgroundColor: '#ccc',
            color: '#1e318a',
            border: 'none',
            borderRadius: '10px'
          }}
        >
          Volver al perfil
        </button>
      </div>
    </div>
  );
}

const btn = (color) => ({
  margin: '5px',
  padding: '10px 15px',
  borderRadius: '8px',
  border: 'none',
  color: 'white',
  backgroundColor:
    color === 'green' ? '#28a745' :
    color === 'orange' ? '#ff6600' :
    '#6c757d',
  cursor: 'pointer'
});

export default PantallaSolicitudesRecibidas;

