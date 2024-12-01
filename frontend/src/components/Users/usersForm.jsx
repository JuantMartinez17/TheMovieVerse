import React, { useEffect } from "react"
import { useForm, Controller } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import axios from 'axios'

const userSchema = yup.object().shape({
    username: yup.string().required('El nombre de usuario es requerido'),
    email: yup.string().email('El email no es válido').required('El email es requerido'),
    password: yup.string().required('La contraseña es requerida'),
    role: yup.string().required('El rol es requerido')
})

const UserForm = ({ id, handleCloseModal, user, handleUpdateUser }) => {
    const { control, handleSubmit, setValue, reset, formState: { errors } } = useForm({
        resolver: yupResolver(userSchema)
    })

    useEffect(() => {
        if (user) {
            setValue('username', user.username);
            setValue('email', user.email);
            setValue('password', user.password);
            setValue('role', user.role);
        } else {
            reset();
        }
    }, [user, setValue, reset]);

    const onSubmit = (data) => {
        if (id) {
            axios.patch(`http://localhost:3000/users/${id}`, data)
                .then((response) => {
                    handleUpdateUser(response.data);
                    handleCloseModal();
                    alert(`Usuario actualizado correctamente, id: ${id}`);
                })
                .catch((error) => {
                    console.error('Error al actualizar el usuario', error);
                });
        } else {
            axios.post('http://localhost:3000/users', data)
                .then((response) => {
                    handleUpdateUser(response.data);
                    handleCloseModal();
                    alert('Usuario creado correctamente');
                })
                .catch((error) => {
                    console.error('Error al crear el usuario', error);
                });
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
                <label>Nombre de usuario</label>
                <Controller
                    control={control}
                    name="username"
                    render={({ field }) => <input type="text" className={`form-control ${errors.username ? 'is-invalid' : ''}`} {...field} />}
                />
                <div className="invalid-feedback">{errors.username?.message}</div>
            </div>

            <div className="form-group">
                <label>Correo electrónico</label>
                <Controller
                    control={control}
                    name="email"
                    render={({ field }) => <input type="email" className={`form-control ${errors.email ? 'is-invalid' : ''}`} {...field} />}
                />
                <div className="invalid-feedback">{errors.email?.message}</div>
            </div>

            <div className="form-group">
                <label>Contraseña</label>
                <Controller
                    control={control}
                    name="password"
                    render={({ field }) => <input type="password" className={`form-control ${errors.password ? 'is-invalid' : ''}`} {...field} />}
                />
                <div className="invalid-feedback">{errors.password?.message}</div>
            </div>

            <div className="form-group">
                <label>Rol</label>
                <Controller
                    control={control}
                    name="role"
                    render={({ field }) => (
                        <select className={`form-control form-select ${errors.role ? 'is-invalid' : ''}`} {...field}>
                            <option value="">Seleccione un rol</option>
                            <option value="admin">Administrador</option>
                            <option value="user">Usuario</option>
                        </select>
                    )}
                />
                <div className="invalid-feedback">{errors.role?.message}</div>
            </div>

            <br />
            <button type="submit" className="btn btn-success">{id ? 'Actualizar' : 'Crear'}</button>
        </form>
    );
}

export default UserForm;