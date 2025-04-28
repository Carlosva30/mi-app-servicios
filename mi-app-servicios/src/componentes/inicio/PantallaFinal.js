import React, { useEffect, useState } from 'react';
import axios from 'axios';

function PantallaFinal({ onLogout }) {
  const [usuario, setUsuario] = useState(null);
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      setMensaje('No tienes sesión activa.');
      return;
    }

    axios.get('http://localhost:3001/api/auth/perfil', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => {
      setUsuario(res.data.usuario);
    })
    .catch(err => {
      console.error(err);
      setMensaje('Token inválido o expirado. Inicia sesión nuevamente.');
    });
  }, []);

  const cerrarSesion = () => {
    localStorage.removeItem('token');
    if (onLogout) onLogout(); // vuelve a pantalla login
  };

  return (
    <div style={{ padding: '30px', textAlign: 'center' }}>
      <h2>¡Gracias por usar nuestra app! 🎉</h2>

      {mensaje && <p>{mensaje}</p>}

      {usuario ? (
        <>
          <p><strong>Nombre:</strong> {usuario.nombre}</p>
          <p><strong>Correo:</strong> {usuario.correo}</p>
          <button onClick={cerrarSesion}>Cerrar sesión</button>
        </>
      ) : !mensaje && (
        <p>Cargando información del usuario...</p>
      )}
    </div>
  );
}

export default PantallaFinal;
