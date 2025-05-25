import React, { useEffect, useState } from 'react';
import axios from '../../api/axios'; // token automático

const PantallaSolicitudesGuardadas = ({ onVolver }) => {
  const [solicitudes, setSolicitudes] = useState([]);
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    axios.get('/solicitudes')
      .then((res) => {
        setSolicitudes(res.data.solicitudes || []);
      })
      .catch((err) => {
        console.error('❌ Error al obtener solicitudes:', err);
        setMensaje('No se pudieron cargar las solicitudes. ¿Iniciaste sesión?');
      });
  }, []);

  const marcarComoRealizada = async (id) => {
    try {
      await axios.put(`/solicitudes/${id}`, { estado: 'realizada_cliente' });

      setSolicitudes(prev =>
        prev.map(s =>
          s._id === id ? { ...s, estado: 'realizada_cliente' } : s
        )
      );
    } catch (error) {
      console.error('❌ Error al marcar como realizada:', error);
      setMensaje('Error al actualizar estado');
    }
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center', backgroundColor: '#1e318a', color: 'white', minHeight: '100vh' }}>
      <h2>📋 Mis Solicitudes</h2>

      {mensaje && <p>{mensaje}</p>}

      {solicitudes.length === 0 && !mensaje ? (
        <p>No hay solicitudes registradas.</p>
      ) : (
        solicitudes.map((s, index) => (
          <div key={index} style={{ backgroundColor: 'white', color: '#1e318a', padding: '15px', borderRadius: '10px', marginBottom: '15px' }}>
            <p><strong>Servicio:</strong> {s.servicio}</p>
            <p><strong>Descripción:</strong> {s.descripcion}</p>
            <p><strong>Fecha:</strong> {new Date(s.fecha).toLocaleString()}</p>
            <p><strong>Estado:</strong> {s.estado}</p>

            {(s.estado === 'aceptada' || s.estado === 'realizada_experto') && (
              <button
                onClick={() => marcarComoRealizada(s._id)}
                disabled={s.estado === 'realizada_cliente' || s.estado === 'completada'}
                style={{
                  marginTop: '10px',
                  padding: '10px 20px',
                  backgroundColor: '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              >
                Marcar como realizada
              </button>
            )}

            {s.estado === 'realizada_cliente' && (
              <p style={{ marginTop: '10px', color: 'green', fontWeight: 'bold' }}>
                Ya marcada como realizada ✅
              </p>
            )}

            {s.estado === 'completada' && (
              <p style={{ marginTop: '10px', color: '#ff6600', fontWeight: 'bold' }}>
                ¡Servicio completado! 🎉
              </p>
            )}
          </div>
        ))
      )}

      <button onClick={onVolver} style={{
        marginTop: '30px',
        padding: '10px 20px',
        borderRadius: '10px',
        border: 'none',
        backgroundColor: '#ccc',
        color: '#1e318a',
        cursor: 'pointer'
      }}>
        Volver
      </button>
    </div>
  );
};

export default PantallaSolicitudesGuardadas;

