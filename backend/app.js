import express from 'express';
import cors from 'cors';
import db from './db/db.js';
import tasksRouter from './routes/routes-task.js'; 
import Task from './models/model-task.js'; 

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/tasks', tasksRouter);

async function DBInit() {
  await db.sync({ force: true });

  await Task.bulkCreate([
    {
      nombre: 'Estudiar Express',
      descripcion: 'Repasar rutas y controladores',
      fecha: '2025-07-02',
      estado: 'Pendiente',
    },
    {
      nombre: 'Hacer el frontend',
      descripcion: 'React + Vite',
      fecha: '2025-07-03',
      estado: 'Pendiente',
    }
  ]);
}

DBInit().then(() => {
  app.listen(3000, () => {
    console.log('Servidor escuchando en http://localhost:3000/api/tasks');
  });
});
