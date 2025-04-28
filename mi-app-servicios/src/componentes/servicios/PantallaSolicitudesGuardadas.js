import React, { useEffect, useState } from 'react';
import axios from '../../api/axios'; //  token automático

const PantallaSolicitudesGuardadas = ({ onVolver }) => {
  const [solicitudes, setSolicitudes] = useState([]);
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    axios.get('/solicitudes') //  no necesita la URL completa
      .then((res) => {
        setSolicitudes(res.data.solicitudes || []);
      })
      .catch((err) => {
        console.error('❌ Error al obtener solicitudes:', err);
        setMensaje('No se pudieron cargar las solicitudes. ¿Iniciaste sesión?');
      });
  }, []);

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Solicitudes Guardadas</h2>

      {mensaje && <p>{mensaje}</p>}

      {solicitudes.length === 0 && !mensaje ? (
        <p>No hay solicitudes registradas.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {solicitudes.map((s, index) => (
            <li key={index} style={{ marginBottom: '15px' }}>
              <strong>{s.servicio}</strong> - {s.descripcion} <br />
              <small>{s.email} | {new Date(s.fecha).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      )}

      <button onClick={onVolver} style={{ marginTop: '20px' }}>Volver</button>
    </div>
  );
};

export default PantallaSolicitudesGuardadas;
