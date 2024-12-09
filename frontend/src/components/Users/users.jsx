import React, { useEffect, useState } from "react";
import UserForm from './usersForm';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [currentUserId, setCurrentUserId] = useState(null);
    const [userToEdit, setUserToEdit] = useState(null);

    const fetchUsers = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users`, {
                method: "GET",
            });
            if (!response.ok) {
                throw new Error('Error al cargar usuarios');
            }
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleEdit = (userId) => {
        const user = users.find((user) => user.userId === userId);
        setUserToEdit(user);
        setCurrentUserId(userId);
        setIsFormOpen(true);
    };

    const handleDelete = async (userId) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${userId}`, {
                    method: "DELETE",
                });
                if (!response.ok) {
                    throw new Error('Error al eliminar el usuario');
                }
                setUsers(users.filter((user) => user.userId !== userId));
            } catch (error) {
                setError(error.message);
            }
        }
    };

    const handleCloseForm = () => {
        setIsFormOpen(false);
        setCurrentUserId(null);
        setUserToEdit(null);
    };

    const handleRefresh = () => {
        fetchUsers();
    };

    const handleAddUser = () => {
        setIsFormOpen(true);
        setUserToEdit(null);
    };

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>Error al cargar usuarios</p>;

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2 className="text-secondary">Usuarios</h2>
                <button className="btn btn-success" onClick={handleAddUser}>
                    <i className="bi bi-plus-lg me-1"></i> Agregar Usuario
                </button>
            </div>

            {isFormOpen && (
                <div className="mb-4">
                    <UserForm
                        id={currentUserId}
                        handleCloseModal={handleCloseForm}
                        user={userToEdit}
                        handleRefresh={handleRefresh}
                    />
                </div>
            )}

            <div className="table-responsive">
                <table className="table table-striped table-hover table-bordered align-middle">
                    <thead className="table-dark">
                        <tr>
                            <th scope="col">Username</th>
                            <th scope="col">Email</th>
                            <th scope="col" style={{ width: '15%' }}>Password</th>
                            <th scope="col">Role</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length > 0 ? (
                            users.map(user => (
                                <tr key={user.userId}>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td className="text-truncate text-nowrap" style={{ maxWidth: '150px' }}>
                                        {user.password}
                                    </td>
                                    <td>{user.role}</td>
                                    <td>
                                        <button
                                            className="btn btn-primary btn-sm me-2"
                                            onClick={() => handleEdit(user.userId)}
                                        >
                                            <i className="bi bi-pencil-fill"></i> Editar
                                        </button>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => handleDelete(user.userId)}
                                        >
                                            <i className="bi bi-trash-fill"></i> Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center">
                                    No hay usuarios disponibles.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Users;
