import React, { useState } from "react";
import { useNavigate } from "react-router";
import Users from '../../components/Users/users'
import Movies from '../../components/Movies/movies'
import Reviews from '../../components/Reviews/reviews'
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
    <div className="container mt-4">
            <header className="mb-4">
                <div className="d-flex justify-content-between align-items-center">
                    <h1 className="text-primary">Bienvenido al Administrador</h1>
                    <button className="btn btn-danger" onClick={handleLogout}>
                        Cerrar Sesión
                    </button>
                </div>
            </header>

            <nav>
                <ul className="nav nav-tabs mb-4">
                    <li className="nav-item">
                        <button
                            className={`nav-link ${activeTab === 'users' ? 'active' : ''}`}
                            onClick={() => setActiveTab('users')}
                        >
                            Usuarios
                        </button>
                    </li>
                    <li className="nav-item">
                        <button
                            className={`nav-link ${activeTab === 'movies' ? 'active' : ''}`}
                            onClick={() => setActiveTab('movies')}
                        >
                            Películas
                        </button>
                    </li>
                    <li className="nav-item">
                        <button
                            className={`nav-link ${activeTab === 'reviews' ? 'active' : ''}`}
                            onClick={() => setActiveTab('reviews')}
                        >
                            Reseñas
                        </button>
                    </li>
                </ul>
            </nav>

            <div>
                {activeTab === 'users' && (
                    <div className="card shadow-sm p-4">
                        <h2 className="text-secondary">Gestión de Usuarios</h2>
                        <Users />
                    </div>
                )}
                {activeTab === 'movies' && (
                    <div className="card shadow-sm p-4">
                        <h2 className="text-secondary">Gestión de Películas</h2>
                        <Movies />
                    </div>
                )}
                {activeTab === 'reviews' && (
                    <div className="card shadow-sm p-4">
                        <h2 className="text-secondary">Gestión de Reseñas</h2>
                        <Reviews />
                    </div>
                )}
            </div>
        </div>
  )
};

export default Admin;
