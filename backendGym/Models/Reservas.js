const { DataTypes } = require("sequelize");
const sequelize = require('../db/Connection')
const Usuarios = require('./Usuarios');  
const Clases = require('./Clases');  


const Reservas = sequelize.define('reservas',{

    id_reserva: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      estado: {
        type: DataTypes.ENUM('reservado', 'cancelado'),
        defaultValue: 'reservado',
      },
      fechaReserva: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },

      id_usuario: {
        type: DataTypes.INTEGER,
        references: {
          model: Usuarios,
          key: 'id_usuario',
        },
      },

      id_clase: {
        type: DataTypes.INTEGER,
        references: {
          model: Clases,
          key: 'id_clase',
        },
      },
   

},
    {
        tableName:'reservas',
        timestamps:false
    }


);

//cada reserva va a estar relacionada con un usuario y con una clase especifica.

Reservas.belongsTo(Usuarios, { foreignKey: 'id_usuario' });
Reservas.belongsTo(Clases, { foreignKey: 'id_clase' });

module.exports = Reservas;