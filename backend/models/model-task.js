import sequelize from "../db/db.js";
import {Model, DataTypes} from 'sequelize'

class Task extends Model {}

Task.init({
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre:{
        type: DataTypes.STRING,
       allowNull: false,
    },
    descripcion:{
        type: DataTypes.STRING,
        allowNull: false

    },
    fecha:{
        type: DataTypes.DATE,
        allowNull: false
    },
    estado:{
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Pendiente"
    }
},
{
    sequelize,
    modelName: "Tarea",
    tableName: "Tareas",
    timestamps: false
})

export default Task;