const { DataTypes } = require("sequelize");
const sequelize = require('../db/Connection')


const Roles = sequelize.define('roles',{

    id_rol: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nombre: {
        type: DataTypes.STRING(50),
        
      }
      

},
    {
        tableName:'roles',
        timestamps:false
    }


);

module.exports = Roles;