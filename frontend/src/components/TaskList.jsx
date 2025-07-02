import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskItem from './TaskItem';
import { useNavigate } from 'react-router-dom';

export default function TaskList() {
  const [tareas, setTareas] = useState([]);
  const [modo, setModo] = useState('lista');  
  const [tareaSeleccionada, setTareaSeleccionada] = useState(null);
  const URL = 'http://localhost:3000/api/tasks';
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTareas = async () => {
      try {
        const res = await axios.get(URL);
        setTareas(res.data);
      } catch (error) {
        console.error('Error al obtener tareas:', error);
      }
    };
    fetchTareas();
  }, []);

  const verDetalle = async (id) => {
    try {
      const res = await axios.get(`${URL}/${id}`);
      setTareaSeleccionada(res.data);
      setModo('detalle');
    } catch (error) {
      console.error('Error al obtener detalle:', error);
    }
  };

  const eliminarTarea = async (id) => {
    try {
      await axios.delete(`${URL}/${id}`);
      setTareas(tareas.filter(t => t.id !== id));
    } catch (error) {
      console.error('Error al eliminar tarea:', error);
    }
  };

  const volverListado = () => {
    setModo('lista');
    setTareaSeleccionada(null);
  };

  if (modo === 'detalle' && tareaSeleccionada) {
    return (
      <div className="container mt-4">
        <h3>Detalle de la tarea</h3>
        <table className="table table-bordered w-50 mx-auto">
          <tbody>
            <tr><th>ID</th><td>{tareaSeleccionada.id}</td></tr>
            <tr><th>Nombre</th><td>{tareaSeleccionada.nombre}</td></tr>
            <tr><th>Descripción</th><td>{tareaSeleccionada.descripcion}</td></tr>
            <tr><th>Fecha</th><td>{new Date(tareaSeleccionada.fecha).toLocaleDateString()}</td></tr>
            <tr><th>Estado</th><td>{tareaSeleccionada.estado}</td></tr>
          </tbody>
        </table>
        <div className="text-center mt-3">
          <button className="btn btn-secondary" onClick={volverListado}>Volver al listado</button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h3>Lista de Tareas</h3>
      <button 
        className="btn btn-primary mb-3"
        onClick={() => navigate('/tasks/new')}
      >
        Agregar Tarea
      </button>
      <table className="table table-striped table-hover mt-3">
        <thead className="table-dark">
          <tr>
            <th>ID</th><th>Nombre</th><th>Descripción</th><th>Fecha</th><th>Estado</th><th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tareas.length > 0 ? (
            tareas.map((tarea) => (
              <TaskItem
                key={tarea.id}
                tarea={tarea}
                eliminarTarea={eliminarTarea}
                handleVerDetalle={verDetalle}
              />
            ))
          ) : (
            <tr><td colSpan="6" className="text-center">No hay tareas para mostrar</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
