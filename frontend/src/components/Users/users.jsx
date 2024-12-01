import React, { useEffect, useState } from "react"
import UserForm from './usersForm'

const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [currentUserId, setCurrentUserId] = useState(null);
    const [userToEdit, setUserToEdit] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://localhost:3000/users', {
                    method: "GET"
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
                const response = await fetch(`http://localhost:3000/users/${userId}`, {
                    method: "DELETE"
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

    const handleUpdateUser = (updatedUser) => {
        setUsers((prevUsers) => 
            prevUsers.map((user) => 
                user.userId === updatedUser.userId ? updatedUser : user
            )
        );
    };

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>Error al cargar usuarios</p>;

    return (
        <div className="container mt-4">
            <h2>Usuarios</h2>
            <button className="btn btn-success mb-3" onClick={() => setIsFormOpen(true)}>
                Agregar Usuario
            </button>

            {isFormOpen && (
                <UserForm 
                    id={currentUserId} 
                    handleCloseModal={handleCloseForm} 
                    user={userToEdit} 
                    handleUpdateUser={handleUpdateUser}
                />
            )}

            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Password</th>
                        <th>Role</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.userId}>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.password}</td>
                            <td>{user.role}</td>
                            <td>
                                <button className="btn btn-primary btn-sm me-2" onClick={() => handleEdit(user.userId)}>Editar</button>
                                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(user.userId)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Users;