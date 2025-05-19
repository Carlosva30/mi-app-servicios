import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CATEGORIAS = [
  { nombre: 'Plomería', icono: '🛠️' },
  { nombre: 'Electricidad', icono: '⚡' },
  { nombre: 'Limpieza', icono: '🧼' },
  { nombre: 'Belleza', icono: '🌸' }
];

const formatoPesos = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  minimumFractionDigits: 0
});

function PantallaInicio({ onCotizar }) {
  const [busqueda, setBusqueda] = useState('');
  const [expertos, setExpertos] = useState([]);
  const [filtrados, setFiltrados] = useState([]);

  useEffect(() => {
    const obtenerExpertos = async () => {
      try {
        //  Obtener los expertos reales
        const res = await axios.get('https://backend-nowservices.onrender.com/api/usuarios');
        setExpertos(res.data);
        setFiltrados(res.data);
      } catch (error) {
        console.error('❌ Error al obtener expertos:', error);
      }
    };

    obtenerExpertos();
  }, []);

  useEffect(() => {
    const texto = busqueda.toLowerCase();
    const filtrados = expertos.filter(experto =>
      experto.nombre.toLowerCase().includes(texto) ||
      (experto.tipoUsuario && experto.tipoUsuario.toLowerCase().includes(texto))
    );
    setFiltrados(filtrados);
  }, [busqueda, expertos]);

  return (
    <div style={{ backgroundColor: '#1e318a', minHeight: '100vh', color: 'white', padding: '20px' }}>
      <div style={{ backgroundColor: 'white', borderRadius: '20px', padding: '10px', marginBottom: '15px' }}>
        <input
          type="text"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          placeholder="¿Qué servicio necesitas?"
          style={{ width: '100%', padding: '12px', borderRadius: '10px', border: 'none', fontSize: '16px' }}
        />
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '20px' }}>
        {CATEGORIAS.map((cat, index) => (
          <div key={index} style={{ textAlign: 'center' }}>
            <div style={{
              backgroundColor: 'white',
              borderRadius: '50%',
              width: '60px',
              height: '60px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '28px',
              color: '#1e318a',
              margin: '0 auto'
            }}>
              {cat.icono}
            </div>
            <div style={{ marginTop: '5px', fontSize: '14px' }}>{cat.nombre}</div>
          </div>
        ))}
      </div>

      <h3 style={{ marginTop: '20px', marginBottom: '10px' }}>Expertos Recomendados</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {filtrados.map((experto) => (
          <div key={experto._id} style={{
            backgroundColor: 'white',
            borderRadius: '15px',
            padding: '10px',
            color: '#1e318a',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img
                src="https://via.placeholder.com/100"
                alt={experto.nombre}
                style={{ width: '70px', height: '70px', borderRadius: '10px', marginRight: '10px' }}
              />
              <div>
                <strong>{experto.nombre}</strong>
                <div>{formatoPesos.format(80000)}</div>
              </div>
            </div>
            <button onClick={() => onCotizar(experto)} style={{
              backgroundColor: '#ff6600',
              color: 'white',
              border: 'none',
              padding: '10px 15px',
              borderRadius: '10px'
            }}>
              Solicitar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PantallaInicio;



