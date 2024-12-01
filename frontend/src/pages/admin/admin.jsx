import React, { useState } from "react";
import { useNavigate } from "react-router";
import Users from '../../components/Users/users'
import Movies from '../../components/Movies/movies'

const Admin = () => {

  const [activeTab, setActiveTab] = useState('users')
  const navigate = useNavigate()

  const handleLogout = () => {
    if (window.confirm('¿Estás seguro de que deseas cerrar sesión?')) {
    localStorage.removeItem('TOKEN')
    localStorage.removeItem('user')
    navigate('/')
    }
  }

  return (
    <div>
      <header>
        <h1>Bienvenido al Administrador</h1>
        <button onClick={handleLogout}>Cerrar Sesión</button>
      </header>
      <nav>
        <button onClick={() => setActiveTab('users')}>Usuarios</button>
        <button onClick={() => setActiveTab('movies')}>Películas</button>
        <button onClick={() => setActiveTab('reviews')}>Reseñas</button>
      </nav>
      <div>
        {activeTab === 'users' && <Users />}
        {activeTab === 'movies' && <Movies />}
        {/*activeTab === 'reviews' && <Reviews />} */}
      </div>
    </div>
  );
};

export default Admin;
