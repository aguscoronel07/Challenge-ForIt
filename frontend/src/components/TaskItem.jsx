import { useNavigate } from 'react-router-dom';

export default function TaskItem({ tarea, eliminarTarea, handleVerDetalle }) {
  const navigate = useNavigate();

  return (
    <tr>
      <td>{tarea.id}</td>
      <td>{tarea.nombre}</td>
      <td>{tarea.descripcion}</td>
      <td>{new Date(tarea.fecha).toLocaleDateString()}</td>
      <td>{tarea.estado}</td>
      <td>
        <button
          className="btn btn-sm btn-info me-2"
          onClick={() => handleVerDetalle(tarea.id)}
        >
          Ver detalle
        </button>
        <button
          className="btn btn-sm btn-warning me-2"
          onClick={() => navigate(`/tasks/${tarea.id}/edit`)}
        >
          Editar
        </button>
        <button
          className="btn btn-sm btn-danger"
          onClick={() => eliminarTarea && eliminarTarea(tarea.id)}
        >
          Eliminar
        </button>
      </td>
    </tr>
  );
}
