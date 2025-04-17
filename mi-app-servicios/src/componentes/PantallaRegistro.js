import React, { useState } from 'react';

const PantallaRegistro = ({ onRegistro, setEmail, setPassword }) => {
  const [localEmail, setLocalEmail] = useState('');
  const [localPassword, setLocalPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    setEmail(localEmail);         // guardar en App.js
    setPassword(localPassword);   // guardar en App.js
    onRegistro();                 // pasar a pantalla de servicios
  };

  return (
    <div>
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Correo Electrónico</label>
        <input
          type="email"
          id="email"
          placeholder="Tu email"
          value={localEmail}
          onChange={(e) => setLocalEmail(e.target.value)}
          required
        />

        <label htmlFor="password">Contraseña</label>
        <input
          type="password"
          id="password"
          placeholder="Tu contraseña"
          value={localPassword}
          onChange={(e) => setLocalPassword(e.target.value)}
          required
        />

        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
};

export default PantallaRegistro;
