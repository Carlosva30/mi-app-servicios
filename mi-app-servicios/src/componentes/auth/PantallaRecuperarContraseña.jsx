import React, { useState } from 'react';
import axios from '../../api/axios';

function PantallaRecuperarContraseña({ onVolver }) {
  const [correo, setCorreo] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [cargando, setCargando] = useState(false);

  const manejarRecuperacion = async () => {
    if (!correo) {
      setMensaje('❗ Por favor ingresa tu correo.');
      return;
    }

    try {
      setCargando(true);
      setMensaje('');
      const res = await axios.post('/auth/recuperar', { correo });

      setMensaje(res.data?.mensaje || '📬 Correo enviado correctamente.');
    } catch (err) {
      console.error('❌ Error en recuperación:', err);
      const mensajeError = err.response?.data?.mensaje || '❌ Error al intentar recuperar la contraseña.';
      setMensaje(mensajeError);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div style={{ padding: '40px', textAlign: 'center', backgroundColor: '#1e318a', minHeight: '100vh', color: 'white' }}>
      <h2>Recuperar Contraseña</h2>

      <input
        type="email"
        placeholder="Tu correo electrónico"
        value={correo}
        onChange={(e) => setCorreo(e.target.value)}
        style={{
          padding: '10px',
          width: '80%',
          marginBottom: '20px',
          borderRadius: '5px',
          border: '1px solid white',
          fontSize: '16px'
        }}
      />
      <br />

      <button
        onClick={manejarRecuperacion}
        style={{
          padding: '10px 20px',
          backgroundColor: '#ff6600',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          fontSize: '16px'
        }}
        disabled={cargando}
      >
        {cargando ? 'Enviando...' : 'Enviar'}
      </button>

      <br /><br />

      <button
        onClick={onVolver}
        style={{
          color: 'white',
          background: 'transparent',
          border: '1px solid white',
          padding: '8px 15px',
          borderRadius: '5px',
          fontSize: '14px'
        }}
      >
        Volver
      </button>

      <p style={{ marginTop: '20px', fontSize: '15px' }}>{mensaje}</p>
    </div>
  );
}

export default PantallaRecuperarContraseña;

