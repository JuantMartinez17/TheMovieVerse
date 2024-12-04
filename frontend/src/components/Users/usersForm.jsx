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
            axios.patch(`https://programacionwebii-production.up.railway.app/users/${id}`, data)
                .then((response) => {
                    handleUpdateUser(response.data);
                    handleCloseModal();
                    alert(`Usuario actualizado correctamente, id: ${id}`);
                })
                .catch((error) => {
                    console.error('Error al actualizar el usuario', error);
                });
        } else {
            axios.post('https://programacionwebii-production.up.railway.app/users', data)
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
        <form onSubmit={handleSubmit(onSubmit)} className="needs-validation" noValidate>
    <div className="row g-3">
        <div className="col-md-6">
            <label className="form-label">Nombre de usuario</label>
            <Controller
                control={control}
                name="username"
                render={({ field }) => (
                    <input
                        type="text"
                        className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                        placeholder="Ingrese el nombre de usuario"
                        {...field}
                    />
                )}
            />
            {errors.username && <div className="invalid-feedback">{errors.username.message}</div>}
        </div>

        <div className="col-md-6">
            <label className="form-label">Correo electrónico</label>
            <Controller
                control={control}
                name="email"
                render={({ field }) => (
                    <input
                        type="email"
                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                        placeholder="Ingrese el correo electrónico"
                        {...field}
                    />
                )}
            />
            {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
        </div>

        <div className="col-md-6">
            <label className="form-label">Contraseña</label>
            <Controller
                control={control}
                name="password"
                render={({ field }) => (
                    <input
                        type="password"
                        className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                        placeholder="Ingrese la contraseña"
                        {...field}
                    />
                )}
            />
            {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
        </div>

        <div className="col-md-6">
            <label className="form-label">Rol</label>
            <Controller
                control={control}
                name="role"
                render={({ field }) => (
                    <select
                        className={`form-select ${errors.role ? 'is-invalid' : ''}`}
                        {...field}
                    >
                        <option value="">Seleccione un rol</option>
                        <option value="admin">Administrador</option>
                        <option value="user">Usuario</option>
                    </select>
                )}
            />
            {errors.role && <div className="invalid-feedback">{errors.role.message}</div>}
        </div>
    </div>

    <div className="d-flex justify-content-between mt-3">
        <button
            type="button"
            className="btn btn-secondary me-2"
            onClick={handleCloseModal}
        >
            Cancelar
        </button>
        <button type="submit" className="btn btn-success">
            {id ? 'Actualizar' : 'Crear'}
        </button>
    </div>
</form>


    );
}

export default UserForm;