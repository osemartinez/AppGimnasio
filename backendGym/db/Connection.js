const {Sequelize} = require ('sequelize')


const sequelize = new Sequelize(
    'fitnessStudio',
    'root',
    'root',
    {
        host:'localhost',
        port:3306,
        dialect:'mysql'
    }
)

sequelize.authenticate()
.then(()=> console.log('Conexión establecida correctamente'))
.catch(err => console.log ('Error en la conexión ' + err))


module.exports=sequelize