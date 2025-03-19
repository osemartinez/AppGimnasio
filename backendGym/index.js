const express = require('express')
const cors = require('cors')
const app = express()

const Clases = require('./Models/Clases')
const Reservas = require('./Models/Reservas')
const Roles = require('./Models/Roles')
const Usuarios = require('./Models/Usuarios')


app.use(express.json())
app.use(cors())


//METODOS HTTP

//login

app.post('/login', async (req, res) => {
  try {
    const { correoElectronico, contrasena } = req.body;

    const usuario = await Usuarios.findOne({ where: { correoElectronico } });

    
    if (!usuario) {
      return res.status(400).json({ message: 'Credenciales incorrectas' });
    }

   
    if (usuario.estado !== 'activo') {
      return res.status(403).json({ message: 'Usuario inactivo. No puedes iniciar sesión.' });
    }

 
    if (usuario.contrasena === contrasena) {
      res.status(200).json({
        message: 'Login exitoso',
        usuario: {
          id_usuario: usuario.id_usuario,
          nombre: usuario.nombre,
          correoElectronico: usuario.correoElectronico,
          estado: usuario.estado,
          id_rol: usuario.id_rol
        }
      });
    } else {
      res.status(400).json({ message: 'Credenciales incorrectas' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error en el proceso de login' });
  }
});

//METODOS PARA USUARIOS

app.get('/usuarios', async (req, res) => {

    try {
      const usuarios = await Usuarios.findAll();
      res.status(200).json(usuarios);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los usuarios' });
    }
  });
  
  app.post('/usuarios', async (req, res) => {
    try {
      const usuario = await Usuarios.create(req.body);
      res.status(200).json(usuario);  
    } catch (error) {
      res.status(500).json({ error: 'Error al crear el usuario' });
    }
  });

 
  app.put('/usuarios/:id', async (req, res) => {
    try {
      const { nombre, correoElectronico, telefono, estado, id_rol } = req.body;
  
      // Creamos un objeto con los campos que vienen en el cuerpo
      let updatedUser = { nombre, correoElectronico, telefono, estado, id_rol };
       
      // Actualizamos el usuario con los datos proporcionados
      const [updated] = await Usuarios.update(updatedUser, {
        where: { id_usuario: req.params.id }
      });
  
      if (updated) {
        res.status(200).json({ mensaje: 'Datos del usuario actualizados' });
      } else {
        res.status(404).json({ message: 'Usuario no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar el usuario' });
    }
  });

  
  // METODOS CLASES

  app.get('/clases', async (req, res) => {
    try {
      const clases = await Clases.findAll();
      res.status(200).json(clases);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener las clases' });
    }
  });
  
  app.post('/clases', async (req, res) => {
    try {
      const clase = await Clases.create(req.body);
      res.status(200).json(clase);  
    } catch (error) {
      res.status(500).json({ error: 'Error al crear la clase' });
    }
  });
  
  app.put('/clases/:id', async (req, res) => {

    try {
      const [updated] = await Clases.update(req.body, {
        where: { id_clase: req.params.id }
      });
  
      if (updated) {
        res.status(200).json({mensaje: 'Registro actualizado', updated});
      } else {
        res.status(404).json({ message: 'Clase no encontrada' });
      }

    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar la clase' });
    }
  });
  
  
  
  // METODOS RESERVAS

  app.get('/reservas', async (req, res) => {
    try {
      const reservas = await Reservas.findAll();
      res.status(200).json(reservas);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener las reservas' });
    }
  });
  
/*
  app.post('/reservas', async (req, res) => {
    try {
      // Busca la clase a la que se quiere hacer la reserva
      const clase = await Clases.findOne({ 
        where: { id_clase: req.body.id_clase } });
  
      if (!clase) {
        return res.status(404).json({ message: 'Clase no encontrada' });
      }
  
      // Cuenta las reservas actuales para esta clase
      const reservas = await Reservas.count({ where: { id_clase: req.body.id_clase, estado: 'reservado' } });
  
      // Verifica si hay cupos disponibles
      if (reservas < clase.cuposMaximos) {
        // Si hay cupos disponibles, crear la reserva
        const reserva = await Reservas.create(req.body);
        res.status(200).json(reserva); 
      } else {
        res.status(400).json({ message: 'No hay cupos disponibles para esta clase' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al crear la reserva' });
    }
  }); */

app.post('/reservas', async (req, res) => {
  try {
    const { id_clase, id_usuario } = req.body;

    // Verificar si el usuario ya tiene una reserva para la misma clase
    const existeReserva = await Reservas.findOne({
      where: { id_clase, id_usuario, estado: 'reservado' },
    });

    if (existeReserva) {
      return res.status(400).json({ message: 'Ya has reservado esta clase.' });
    }

    // Verificar si hay cupos disponibles
    const clase = await Clases.findOne({ where: { id_clase } });
    if (!clase) {
      return res.status(404).json({ message: 'Clase no encontrada' });
    }

    const reservas = await Reservas.count({ where: { id_clase, estado: 'reservado' } });
    if (reservas >= clase.cuposMaximos) {
      return res.status(400).json({ message: 'No hay cupos disponibles para esta clase' });
    }

    // Crear la nueva reserva
    const reserva = await Reservas.create(req.body);
    res.status(200).json(reserva);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la reserva' });
  }
});
/*
app.post('/reservas', async (req, res) => {
  try {
    // Asumimos que el cuerpo de la solicitud contiene id_clase e id_usuario.
    const { id_clase, id_usuario } = req.body;

    // Crear la nueva reserva (sin validación por ahora)
    const nuevaReserva = await Reservas.create({
      id_clase,
      id_usuario,
      estado: 'reservado', // Estado por defecto
      fechaReserva: new Date().toISOString(), // Fecha de la reserva
    });

    // Respondemos con la nueva reserva creada
    res.status(200).json(nuevaReserva);
  } catch (error) {
    console.error("Error al crear la reserva", error);
    res.status(500).json({ error: 'Error al crear la reserva' });
  }
}); */

  
  app.put('/reservas/:id', async (req, res) => {

    try {
      const [updated] = await Reservas.update(req.body, {
        where: { id_reserva: req.params.id }
      });
  
      if (updated) {
        res.status(200).json({mensaje: 'Registro actualizado', updated});
      } else {
        res.status(404).json({ message: 'Reserva no encontrada' });
      }

    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar la reserva' });
    }
  });


  app.delete('/reservas/:id', async (req, res) => {
    try {
      // Buscar la reserva que se quiere eliminar
      const reserva = await Reservas.findOne({ where: { id_reserva: req.params.id } });
  
      if (!reserva) {
        return res.status(404).json({ message: 'Reserva no encontrada' });
      }
  
      // Eliminar la reserva
      await reserva.destroy();
  
      // Responder con éxito
      res.status(200).json({ message: 'Reserva eliminada' });
  
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar la reserva' });
    }
  });





app.listen(5000, ()=>{
    console.log('Ejecutando en puerto 5000')
})


/*
  //innecesario
  app.put('/usuarios/estado/:id', async (req, res) => {
    try {
      const { estado } = req.body;
  
      // Solo actualizamos el estado a activo o inactivo
      const [updated] = await Usuarios.update(
        { estado }, 
        { where: { id_usuario: req.params.id } }
      );
  
      if (updated) {
        res.status(200).json({ mensaje: `Usuario ${estado}` });
      } else {
        res.status(404).json({ message: 'Usuario no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar el estado del usuario' });
    }
  });

  // es necesario este mtodo o podemos actualizar con el metodo anterior y cambiar solo el estado?.
  app.delete('/clases/:id', async (req, res) => {
    try {
      const deleted = await Clases.destroy({
        where: { id_clase: req.params.id }
      });
  
      if (deleted) {
        res.status(200).json({ message: 'Clase eliminada' });
      } else {
        res.status(404).json({ message: 'Clase no encontrada' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar la clase' });
    }
  });

  /*este no esta funcionando bien, incrementa el numero de cupos maximos y solo debemos 
  app.delete('/reservas/:id', async (req, res) => {
    try {
      const reserva = await Reservas.findOne({ where: { id_reserva: req.params.id } });
  
      if (!reserva) {
        return res.status(404).json({ message: 'Reserva no encontrada' });
      }

      await reserva.destroy();
  
      // primero busca la clase asociada a la reserva, luego actualizamos los cupos de la clase,

      const clase = await Clases.findOne({ where: { id_clase: reserva.id_clase } });
      if (clase) {
        await Clases.update({ cuposMaximos: clase.cuposMaximos - 1 }, { 
          where: { id_clase: clase.id_clase } });
      }
  
      res.status(200).json({ message: 'Reserva eliminada y cupo restaurado' });

    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar la reserva' });
    }
  }); 
*/