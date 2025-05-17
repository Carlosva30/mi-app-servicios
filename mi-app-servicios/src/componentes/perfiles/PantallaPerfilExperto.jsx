import React, { useState, useEffect } from 'react';

const PerfilExperto = ({ onVerSolicitudes, onLogout }) => {
  const [estado, setEstado] = useState(true); // true = disponible
  const [usuario, setUsuario] = useState({});
  const [estadisticas, setEstadisticas] = useState({
    serviciosRealizados: 12,
    calificacion: 4.7,
    trabajosDestacados: [
      'https://via.placeholder.com/100',
      'https://via.placeholder.com/100',
      'https://via.placeholder.com/100'
    ]
  });

  useEffect(() => {
    try {
      const data = localStorage.getItem('usuario');
      if (data) {
        setUsuario(JSON.parse(data));
      }
    } catch (e) {
      console.error('Error leyendo usuario:', e);
    }
  }, []);

  const cambiarEstado = () => setEstado(!estado);

  return (
    <div style={{ backgroundColor: '#1e318a', minHeight: '100vh', color: 'white', padding: '20px' }}>
      <h2 style={{ textAlign: 'center' }}>Perfil del Experto</h2>

      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <img
          src="https://randomuser.me/api/portraits/men/75.jpg"
          alt="Foto"
          style={{ width: '100px', height: '100px', borderRadius: '50%' }}
        />
        <h3>{usuario?.nombre || 'Nombre no disponible'}</h3>
        <p>{usuario?.correo}</p>
      </div>

      <div style={{ backgroundColor: 'white', borderRadius: '15px', padding: '15px', color: '#1e318a' }}>
        <p><strong>Servicio:</strong> {usuario?.tipoUsuario || 'No especificado'}</p>
        <p><strong>Zona de cobertura:</strong> Cali - Sur</p>
        <p><strong>Horario disponible:</strong> Lunes a Viernes, 8:00am - 6:00pm</p>
        <p><strong>Contacto:</strong> 300 000 0000</p>

        <div style={{ marginTop: '10px' }}>
          <strong>Estado:</strong> 
          <label style={{ marginLeft: '10px' }}>
            <input type="checkbox" checked={estado} onChange={cambiarEstado} />
            {estado ? ' Disponible' : ' Ocupado'}
          </label>
        </div>
      </div>

      <div style={{ marginTop: '20px' }}>
        <h4>📈 Estadísticas</h4>
        <p>Servicios realizados: {estadisticas.serviciosRealizados}</p>
        <p>Calificación promedio: ⭐ {estadisticas.calificacion}</p>
        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
          {estadisticas.trabajosDestacados.map((img, i) => (
            <img key={i} src={img} alt="Trabajo" style={{ width: '60px', borderRadius: '10px' }} />
          ))}
        </div>
      </div>

      <div style={{ marginTop: '30px', textAlign: 'center' }}>
        <button
          onClick={onVerSolicitudes}
          style={{ padding: '10px 20px', backgroundColor: '#ff6600', color: 'white', border: 'none', borderRadius: '10px', marginRight: '10px' }}
        >
          Ver solicitudes recibidas
        </button>

        <button
          onClick={() => {
            localStorage.clear();
            onLogout();
          }}
          style={{ padding: '10px 20px', backgroundColor: '#d32f2f', color: 'white', border: 'none', borderRadius: '10px' }}
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
};

export default PerfilExperto;
