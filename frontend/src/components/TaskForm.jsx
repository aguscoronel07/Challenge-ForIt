import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

export default function TaskForm() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const URL = 'http://localhost:3000/api/tasks';
  
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  
  useEffect(() => {
    if (id) {
      axios.get(`${URL}/${id}`)
        .then(res => {
          const tarea = res.data;
          setValue('nombre', tarea.nombre);
          setValue('descripcion', tarea.descripcion);
          setValue('fecha', tarea.fecha.split('T')[0]); 
          setValue('estado', tarea.estado);
        })
        .catch(err => console.error('Error al cargar tarea:', err));
    }
  }, [id, setValue]);

  const onSubmit = async (data) => {
    try {
      if (id) {
        await axios.put(`${URL}/${id}`, data);
      } else {
        await axios.post(URL, data);
      }
      navigate('/');
    } catch (error) {
      console.error('Error al guardar tarea:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h3>{id ? 'Editar Tarea' : 'Crear Nueva Tarea'}</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="nombre">Nombre</label>
          <input
            id="nombre"
            className="form-control"
            {...register('nombre', { required: 'Este campo es obligatorio' })}
          />
          {errors.nombre && <p className="text-danger">{errors.nombre.message}</p>}
        </div>

        <div className="mb-3">
          <label htmlFor="descripcion">Descripción</label>
          <input
            id="descripcion"
            className="form-control"
            {...register('descripcion', { required: 'Este campo es obligatorio' })}
          />
          {errors.descripcion && <p className="text-danger">{errors.descripcion.message}</p>}
        </div>

        <div className="mb-3">
          <label htmlFor="fecha">Fecha</label>
          <input
            type="date"
            id="fecha"
            className="form-control"
            {...register('fecha', { required: 'Este campo es obligatorio' })}
          />
          {errors.fecha && <p className="text-danger">{errors.fecha.message}</p>}
        </div>

        <div className="mb-3">
          <label htmlFor="estado">Estado</label>
          <select
            id="estado"
            className="form-control"
            {...register('estado', { required: 'Este campo es obligatorio' })}
          >
            <option value="Pendiente">Pendiente</option>
            <option value="En progreso">En progreso</option>
            <option value="Completada">Completada</option>
          </select>
          {errors.estado && <p className="text-danger">{errors.estado.message}</p>}
        </div>

        <button type="submit" className="btn btn-success me-2">
          {id ? 'Actualizar' : 'Crear'}
        </button>
        <button type="button" className="btn btn-secondary" onClick={() => navigate('/')}>
          Cancelar
        </button>
      </form>
    </div>
  );
}
