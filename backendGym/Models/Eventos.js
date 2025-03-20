

const { DataTypes } = require("sequelize");
const sequelize = require('../db/Connection')


const Eventos = sequelize.define('eventos',{

    id_evento: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      
      descripcion: {
        type: DataTypes.STRING(300),
        
      }
      

},
    {
        tableName:'eventos',
        timestamps:false
    }


);

module.exports = Eventos;