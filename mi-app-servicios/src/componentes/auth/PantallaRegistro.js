import React, { useState } from 'react';
import axios from '../../api/axios';

const PantallaRegistro = ({ onRegistro }) => {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [tipoUsuario, setTipoUsuario] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [exito, setExito] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!tipoUsuario) {
      setMensaje('Por favor selecciona si eres Cliente o Experto.');
      setExito(false);
      return;
    }

    try {
      await axios.post('/auth/registro', { nombre, correo, contraseña, tipoUsuario });

      setExito(true);
      setMensaje('¡Usuario registrado exitosamente! ✅');

      setTimeout(() => {
        if (onRegistro) onRegistro(tipoUsuario);
      }, 2000);
    } catch (error) {
      setExito(false);
      setMensaje(error.response?.data?.mensaje || 'Error al registrarse');
      console.error('❌ Error en el registro:', error);
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
        onSubmit={handleSubmit}
        style={{
          backgroundColor: '#1e318af',
          padding: '30px',
          borderRadius: '12px',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '300px'
        }}
      >
        <h2 style={{ marginBottom: '20px' }}>Registro</h2>

        <input
          type="text"
          placeholder="Tu nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
          style={{ marginBottom: '10px', width: '100%', padding: '10px' }}
        />

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

        <select
          value={tipoUsuario}
          onChange={(e) => setTipoUsuario(e.target.value)}
          required
          style={{ marginBottom: '20px', width: '100%', padding: '10px' }}
        >
          <option value="">Selecciona tu tipo de usuario</option>
          <option value="cliente">Cliente</option>
          <option value="experto">Experto</option>
        </select>

        <button type="submit" style={{ padding: '10px 20px', width: '100%' }}>
          Registrarse
        </button>

        {mensaje && (
          <p style={{
            color: exito ? 'green' : 'red',
            marginTop: '15px',
            fontWeight: 'bold'
          }}>
            {mensaje}
          </p>
        )}
      </form>
    </div>
  );
};

export default PantallaRegistro;
