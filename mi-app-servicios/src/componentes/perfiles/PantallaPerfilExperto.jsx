import React, { useState, useEffect } from 'react';

const PantallaPerfilExperto = ({ onVerSolicitudes, onLogout }) => {
  const [estado, setEstado] = useState(true);
  const [usuario, setUsuario] = useState({});
  const [editando, setEditando] = useState(false);

  const [form, setForm] = useState({
    nombre: '',
    servicio: '',
    zona: 'Cali - Sur',
    contacto: '300 000 0000'
  });

  useEffect(() => {
    try {
      const data = localStorage.getItem('usuario');
      if (data) {
        const user = JSON.parse(data);
        setUsuario(user);
        setForm({
          nombre: user.nombre || '',
          servicio: user.tipoUsuario || '',
          zona: 'Cali - Sur',
          contacto: '300 000 0000'
        });
      }
    } catch (e) {
      console.error('Error leyendo usuario:', e);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const guardarCambios = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`https://backend-nowservices.onrender.com/api/auth/${usuario._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(form)
      });

      const actualizado = await res.json();
      localStorage.setItem('usuario', JSON.stringify(actualizado));
      setUsuario(actualizado);
      setEditando(false);
    } catch (error) {
      console.error('Error actualizando perfil:', error);
    }
  };

  return (
    <div style={{ backgroundColor: '#1e318a', minHeight: '100vh', color: 'white', padding: '20px' }}>
      <h2 style={{ textAlign: 'center' }}>Perfil del Experto</h2>

      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <img src="https://randomuser.me/api/portraits/men/75.jpg" alt="Foto" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
        {editando ? (
          <input
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            style={{
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '5px',
              color: '#1e318a',
              marginTop: '10px'
            }}
          />
        ) : (
          <h3>{usuario.nombre || 'Nombre no disponible'}</h3>
        )}
        <p>{usuario?.correo}</p>
      </div>

      <div style={{ backgroundColor: 'white', borderRadius: '15px', padding: '15px', color: '#1e318a' }}>
        <p><strong>Servicio:</strong> {editando ? (
          <input name="servicio" value={form.servicio} onChange={handleChange} style={estiloInput} />
        ) : form.servicio}</p>

        <p><strong>Zona de cobertura:</strong> {editando ? (
          <input name="zona" value={form.zona} onChange={handleChange} style={estiloInput} />
        ) : form.zona}</p>

        <p><strong>Horario disponible:</strong> Lunes a Viernes, 8:00am - 6:00pm</p>

        <p><strong>Contacto:</strong> {editando ? (
          <input name="contacto" value={form.contacto} onChange={handleChange} style={estiloInput} />
        ) : form.contacto}</p>

        <div style={{ marginTop: '10px' }}>
          <strong>Estado:</strong>
          <label style={{ marginLeft: '10px' }}>
            <input type="checkbox" checked={estado} onChange={() => setEstado(!estado)} />
            {estado ? ' Disponible' : ' Ocupado'}
          </label>
        </div>
      </div>

      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        {editando ? (
          <>
            <button onClick={guardarCambios} style={botonGuardar}>Guardar</button>
            <button onClick={() => setEditando(false)} style={botonCancelar}>Cancelar</button>
          </>
        ) : (
          <button onClick={() => setEditando(true)} style={botonEditar}>Editar perfil</button>
        )}
      </div>

      <div style={{ marginTop: '30px' }}>
        <h4>📈 Estadísticas</h4>
        <p>Servicios realizados: 12</p>
        <p>Calificación promedio: ⭐ 4.7</p>
        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
          {[1, 2, 3].map(i => (
            <img key={i} src="https://via.placeholder.com/60" alt="Trabajo" style={{ width: '60px', borderRadius: '10px' }} />
          ))}
        </div>
      </div>

      <div style={{ marginTop: '30px', textAlign: 'center' }}>
        <button onClick={onVerSolicitudes} style={{ padding: '10px 20px', marginRight: '10px' }}>
          Ver solicitudes recibidas
        </button>
        <button onClick={() => {
          localStorage.clear();
          onLogout();
        }} style={{ padding: '10px 20px', backgroundColor: '#d32f2f', color: 'white' }}>
          Cerrar sesión
        </button>
      </div>
    </div>
  );
};

const estiloInput = {
  padding: '8px',
  width: '100%',
  border: '1px solid #ccc',
  borderRadius: '5px',
  marginBottom: '10px',
  color: '#1e318a'
};

const botonGuardar = {
  padding: '10px 20px',
  backgroundColor: '#28a745',
  color: 'white',
  border: 'none',
  borderRadius: '10px',
  marginRight: '10px'
};

const botonCancelar = {
  padding: '10px 20px',
  backgroundColor: '#6c757d',
  color: 'white',
  border: 'none',
  borderRadius: '10px'
};

const botonEditar = {
  padding: '10px 20px',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '10px'
};

export default PantallaPerfilExperto;



