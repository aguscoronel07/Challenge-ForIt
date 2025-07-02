import Task from '../models/model-task.js';



//Traigo todas las tareas
async function getAllTasks(){
    return await Task.findAll()
}

//Creo una nueva tarea 
async function addTask(data){
    const tarea = await Task.create(data);
    return tarea
}

//Actualizo una tarea que ya existe
async function updateTask(id, data){
    const tarea = await Task.findByPk(id);
    if (!tarea) {
        throw new Error('Tarea no encontrada');
    }
    await tarea.update(data);
    return tarea;
}


//Muestro una tarea especifica
async function getTaskById(id) {
  const tarea = await Task.findByPk(id);
  if (!tarea) {
    throw new Error('Tarea no encontrada');
  }
  return tarea;
}

//Elimino una tarea

async function deleteTask(id){
    const tarea = await Task.findByPk(id);
    if (!tarea) {
        throw new Error('Tarea no encontrada');
    }
    await tarea.destroy();
    return tarea;
}

export default{
    getAllTasks,
    addTask,
    updateTask,
    deleteTask,
    getTaskById
}   