import React, { useEffect, useState } from 'react';
import axios from 'axios';

function PantallaSolicitudesRecibidas({ onVolver }) {
  const [solicitudes, setSolicitudes] = useState([]);

  useEffect(() => {
    const obtenerSolicitudes = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('https://backend-nowservices.onrender.com/api/solicitudes', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setSolicitudes(res.data.solicitudes || []);
      } catch (error) {
        console.error('Error obteniendo solicitudes:', error);
      }
    };

    obtenerSolicitudes();
  }, []);

  const marcarComoRealizada = async (id) => {
    try {
      // Simulamos cambio de estado (puedes hacer un PUT en el backend real)
      alert(`Solicitud ${id} marcada como realizada (simulado)`);
    } catch (error) {
      console.error('Error actualizando solicitud:', error);
    }
  };

  return (
    <div style={{ backgroundColor: '#1e318a', color: 'white', minHeight: '100vh', padding: '20px' }}>
      <h2 style={{ textAlign: 'center' }}>Solicitudes Recibidas</h2>

      {solicitudes.length === 0 ? (
        <p style={{ textAlign: 'center' }}>No hay solicitudes por ahora.</p>
      ) : (
        solicitudes.map((solicitud, index) => (
          <div key={index} style={{ backgroundColor: 'white', color: '#1e318a', borderRadius: '10px', padding: '10px', marginBottom: '15px' }}>
            <p><strong>Servicio:</strong> {solicitud.servicio}</p>
            <p><strong>Descripción:</strong> {solicitud.descripcion}</p>
            <p><strong>Cliente:</strong> {solicitud.email}</p>
            <p><strong>Fecha:</strong> {new Date(solicitud.fecha).toLocaleDateString()}</p>

            <button
              onClick={() => marcarComoRealizada(solicitud._id)}
              style={{ padding: '8px 15px', backgroundColor: '#ff6600', color: 'white', border: 'none', borderRadius: '8px' }}
            >
              Marcar como realizada
            </button>
          </div>
        ))
      )}

      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button
          onClick={onVolver}
          style={{ padding: '10px 20px', backgroundColor: '#ccc', color: '#1e318a', border: 'none', borderRadius: '10px' }}
        >
          Volver al perfil
        </button>
      </div>
    </div>
  );
}

export default PantallaSolicitudesRecibidas;
