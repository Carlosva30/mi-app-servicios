import React, { useState, useEffect } from 'react';
import axios from '../../api/axios'; // instancia con token

const CATEGORIAS = [
  { nombre: 'Plomería', icono: '🛠️' },
  { nombre: 'Electricidad', icono: '⚡' },
  { nombre: 'Limpieza', icono: '🧼' },
  { nombre: 'Belleza', icono: '🌸' }
];

function PantallaInicio({ onCotizar }) {
  const [busqueda, setBusqueda] = useState('');
  const [expertos, setExpertos] = useState([]);
  const [filtrados, setFiltrados] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const obtenerExpertos = async () => {
      try {
        const res = await axios.get('/auth'); // Solo expertos
        setExpertos(res.data);
        setFiltrados(res.data);
        setError('');
      } catch (err) {
        console.error('❌ Error al obtener expertos:', err);
        setError('Error al cargar los expertos.');
      } finally {
        setCargando(false);
      }
    };
    obtenerExpertos();
  }, []);

  useEffect(() => {
    const texto = busqueda.toLowerCase();
    const resultados = expertos.filter(exp =>
      exp.nombre.toLowerCase().includes(texto)
    );
    setFiltrados(resultados);
  }, [busqueda, expertos]);

  return (
    <div style={{ backgroundColor: '#1e318a', minHeight: '100vh', color: 'white', padding: '20px' }}>
      <input
        type="text"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        placeholder="¿Qué servicio necesitas?"
        style={{
          width: '100%',
          padding: '12px',
          borderRadius: '10px',
          border: 'none',
          fontSize: '16px'
        }}
      />

      <div style={{ display: 'flex', justifyContent: 'space-around', margin: '20px 0' }}>
        {CATEGORIAS.map((cat, i) => (
          <div key={i} style={{ textAlign: 'center' }}>
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

      <h3>Expertos Recomendados</h3>

      {cargando && <p>Cargando expertos...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!cargando && filtrados.length === 0 && <p>No se encontraron expertos.</p>}

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
                style={{
                  width: '70px',
                  height: '70px',
                  borderRadius: '10px',
                  marginRight: '10px'
                }}
              />
              <div>
                <strong>{experto.nombre}</strong>
                <div style={{ fontSize: '14px' }}>{experto.tipoUsuario}</div>
              </div>
            </div>
            <button onClick={() => onCotizar(experto)} style={{
              backgroundColor: '#ff6600',
              color: 'white',
              border: 'none',
              padding: '10px 15px',
              borderRadius: '10px',
              cursor: 'pointer'
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
