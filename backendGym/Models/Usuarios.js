const { DataTypes } = require("sequelize");
const sequelize = require('../db/Connection')
const Roles = require('../Models/Roles')


const Usuarios = sequelize.define('usuarios',{

  id_usuario: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING(100),
  
  },
  correoElectronico: {
    type: DataTypes.STRING(100),
  
  },
  contrasena: {
    type: DataTypes.STRING(255),
   
  },
  telefono: {
    type: DataTypes.STRING(20),
    
  },
  estado: {
    type: DataTypes.ENUM('activo', 'inactivo'),
    defaultValue: 'activo',
  },
  fechaRegistro: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  id_rol: {
    type: DataTypes.INTEGER,
    references: {
      model: Roles,
      key: 'id_rol',
    },
  },
    
      

},
    {
        tableName:'usuarios',
        timestamps:false
    }


);

//decimos que hay una relación en la que un registro de una tabla (usuarios)
// pertenece a un registro en otra tabla (roles)

Usuarios.belongsTo(Roles, { foreignKey: 'id_rol' });

module.exports = Usuarios;