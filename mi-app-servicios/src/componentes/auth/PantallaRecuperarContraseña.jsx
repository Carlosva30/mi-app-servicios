import React, { useState } from 'react';
import axios from '../../api/axios';

function PantallaRecuperarContraseña({ onVolver }) {
  const [correo, setCorreo] = useState('');
  const [mensaje, setMensaje] = useState('');

  const manejarRecuperacion = async () => {
    if (!correo) {
      setMensaje('Por favor ingresa tu correo.');
      return;
    }

    //  ruta backend que envíe un correo real
    try {
      // Simulación
      setMensaje('📧 Si el correo está registrado, recibirás un enlace para restablecer tu contraseña.');
    } catch (err) {
      console.error(err);
      setMensaje('❌ Error al intentar recuperar la contraseña.');
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
        style={{ padding: '10px', width: '80%', marginBottom: '20px', borderRadius: '5px' }}
      />
      <br />
      <button onClick={manejarRecuperacion} style={{ padding: '10px 20px' }}>Enviar</button>
      <br /><br />
      <button onClick={onVolver} style={{ color: 'white', marginTop: '10px', background: 'transparent', border: '1px solid white', padding: '5px 10px' }}>Volver</button>
      <p style={{ marginTop: '20px' }}>{mensaje}</p>
    </div>
  );
}

export default PantallaRecuperarContraseña;
