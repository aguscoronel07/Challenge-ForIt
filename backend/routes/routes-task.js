import express from 'express';
import taskService from '../services/services-task.js'

const router = express.Router()

router.get("/", async(req,res) => {
    try{
        const tareas = await taskService.getAllTasks();
        res.json(tareas);
    } catch (error) {
        console.error("Error al obtener las tareas:", error);
    }
})


router.get("/:id", async (req, res) => {
  try {
    const tarea = await taskService.getTaskById(req.params.id);
    res.json(tarea);
  } catch (error) {
    console.error("Error al obtener la tarea:", error);
  }
});



router.post("/", async(req,res)=> {
        try{
            const nuevaTarea = await taskService.addTask(req.body);
            res.json(nuevaTarea);
        } catch (error) {
            console.error("Error al crear la tarea:", error);
        }
})

router.put("/:id",async(req,res) => {
    try{
        const tareaAct = await taskService.updateTask(req.params.id, req.body);
        res.json(tareaAct);
    } catch (error) {
        console.error("Error al actualizar la tarea:", error);
    }
})

router.delete("/:id", async(req,res)=> {
    try{
        const tareaElim = await taskService.deleteTask(req.params.id);
        res.json(tareaElim);
    } catch (error) {
        console.error("Error al eliminar la tarea:", error);
    }
})

export default router