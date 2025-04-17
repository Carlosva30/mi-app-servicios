import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PantallaSolicitudesGuardadas = ({ onVolver }) => {
  const [solicitudes, setSolicitudes] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/solicitudes')
      .then((res) => setSolicitudes(res.data))
      .catch((err) => console.error('❌ Error al obtener solicitudes:', err));
  }, []);

  return (
    <div>
      <h2>Solicitudes Guardadas</h2>
      {solicitudes.length === 0 ? (
        <p>No hay solicitudes registradas.</p>
      ) : (
        <ul>
          {solicitudes.map((s, index) => (
            <li key={index}>
              <strong>{s.servicio}</strong> - {s.descripcion} <br />
              <small>{s.email} | {new Date(s.fecha).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      )}
      <button onClick={onVolver}>Volver</button>
    </div>
  );
};

export default PantallaSolicitudesGuardadas;
