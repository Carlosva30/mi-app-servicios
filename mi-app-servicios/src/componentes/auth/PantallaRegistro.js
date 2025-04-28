import React, { useState } from 'react';
import axios from '../../api/axios'; // ✅ Importando instancia de axios que incluye el token automáticamente

const PantallaRegistro = ({ onRegistro }) => {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('/auth/registro', { nombre, correo, contraseña });
      if (onRegistro) onRegistro(); // Si se registra bien, avanza
    } catch (error) {
      setMensaje(error.response?.data?.mensaje || 'Error al registrarse');
      console.error('❌ Error en el registro:', error);
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '30px' }}>
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Tu nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
          style={{ display: 'block', marginBottom: '10px', width: '250px', padding: '10px' }}
        />

        <input
          type="email"
          placeholder="Correo electrónico"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          required
          style={{ display: 'block', marginBottom: '10px', width: '250px', padding: '10px' }}
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={contraseña}
          onChange={(e) => setContraseña(e.target.value)}
          required
          style={{ display: 'block', marginBottom: '20px', width: '250px', padding: '10px' }}
        />

        <button type="submit" style={{ padding: '10px 20px' }}>Registrarse</button>

        {mensaje && <p style={{ color: 'red', marginTop: '15px' }}>{mensaje}</p>}
      </form>
    </div>
  );
};

export default PantallaRegistro;
