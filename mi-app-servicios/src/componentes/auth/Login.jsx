import React, { useState } from 'react';
import axios from '../../api/axios';

function Login({ onLoginExitoso, onRegistro }) {
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [mensaje, setMensaje] = useState('');

  const manejarLogin = async (e) => {
    e.preventDefault();
    try {
      const respuesta = await axios.post('/auth/login', { correo, contraseña });

      // ✅ Guardar toda la información necesaria
      localStorage.setItem('token', respuesta.data.token);
      localStorage.setItem('tipoUsuario', respuesta.data.tipoUsuario);
      localStorage.setItem('usuario', JSON.stringify(respuesta.data.usuario));

      if (onLoginExitoso) onLoginExitoso(respuesta.data.tipoUsuario);

    } catch (error) {
      setMensaje(error.response?.data?.mensaje || 'Error al iniciar sesión');
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#1e318a'
    }}>
      <form
        onSubmit={manejarLogin}
        style={{
          backgroundColor: '#1e318a',
          padding: '30px',
          borderRadius: '12px',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '300px'
        }}
      >
        <img
          src="https://via.placeholder.com/100"
          alt="Logo"
          style={{ marginBottom: '20px' }}
        />

        <h2 style={{ marginBottom: '20px' }}>Iniciar sesión</h2>

        <input
          type="email"
          placeholder="Correo electrónico"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          required
          style={{ marginBottom: '10px', width: '100%', padding: '10px' }}
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={contraseña}
          onChange={(e) => setContraseña(e.target.value)}
          required
          style={{ marginBottom: '10px', width: '100%', padding: '10px' }}
        />

        <div style={{ marginBottom: '20px' }}>
          <a href="#" style={{ fontSize: '14px', color: '#888' }}>
            ¿Olvidaste tu contraseña?
          </a>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button type="submit" style={{ padding: '10px 20px' }}>Entrar</button>
          <button type="button" onClick={onRegistro} style={{ padding: '10px 20px' }}>Registrarse</button>
        </div>

        {mensaje && (
          <p style={{ color: 'red', marginTop: '15px', fontWeight: 'bold' }}>
            {mensaje}
          </p>
        )}
      </form>
    </div>
  );
}

export default Login;
