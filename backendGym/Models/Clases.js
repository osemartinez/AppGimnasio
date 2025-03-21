
const { DataTypes } = require("sequelize");
const sequelize = require('../db/Connection')


const Clases = sequelize.define('clases',{

  id_clase: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  nombre: {
    type: DataTypes.STRING(100),
    
  },

  descripcion: {
    type: DataTypes.STRING(200),
   
  },

  horaInicio: {
    type: DataTypes.STRING(10),

    
  },

  horaFin: {
    type: DataTypes.STRING(10),
    
  },

  cuposMaximos: {
    type: DataTypes.INTEGER,
    
  },

  estado: {
    type: DataTypes.ENUM('activo', 'inactivo'),
    defaultValue: 'activo',
  },

  instructorNombre: {
    type: DataTypes.STRING(100),
    
  },
    

},
    {
        tableName:'clases',
        timestamps:false
    }


);

module.exports = Clases;