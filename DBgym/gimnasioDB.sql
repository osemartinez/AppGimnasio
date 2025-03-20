
create database fitnessStudio;

use fitnessStudio;

#los nombres de los campos relacionados, en tabla ppl y secundaria deben llamarse igual.
CREATE TABLE roles (
    id_rol INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50)
);

CREATE TABLE eventos (
    id_evento INT AUTO_INCREMENT PRIMARY KEY,
    descripcion VARCHAR(300)
);

#crud 
CREATE TABLE usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    correoElectronico VARCHAR(100),
    contrasena VARCHAR(255),
    telefono VARCHAR(20),
    estado ENUM('activo', 'inactivo') DEFAULT 'activo',
    fechaRegistro DATE,
    id_rol INT,    
    FOREIGN KEY (id_rol) REFERENCES roles(id_rol)
);

INSERT INTO usuarios (nombre, correoElectronico, contrasena, telefono, estado, fechaRegistro, id_rol) 
VALUES 
('Leo', 'leo@gmail.com', '123','34343434', 'inactivo', '2025-03-02','2');


#interaccion en funcionalidades
CREATE TABLE clases (
    id_clase INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    descripcion VARCHAR(200),
    horaInicio DATE,
    horaFin DATE,
    cuposMaximos INT,
    estado ENUM('activo', 'inactivo') DEFAULT 'activo',
    instructorNombre VARCHAR(100)
);

#interaccion en funcionalidades
#nombre relacionados deben llamarse igual
CREATE TABLE reservas (
    id_reserva INT AUTO_INCREMENT PRIMARY KEY,
    estado ENUM('reservado', 'cancelado') DEFAULT 'reservado',
    fechaReserva DATE,
    id_usuario INT,
    id_clase INT,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE CASCADE,
    FOREIGN KEY (id_clase) REFERENCES clases(id_clase) ON DELETE CASCADE
    #UNIQUE(id_usuario, id_clase)
);

select * from roles;

INSERT INTO roles (nombre) VALUES ('administrador');
INSERT INTO roles (nombre) VALUES ('cliente');

select * from usuarios;
select * from clases;
select * from reservas;
describe reservas;



delete from reservas where id_reserva = 42;

update usuarios set nombre='ivan', correoElectronico= 'ivan@gmail.com', id_rol= 1, estado='activo' where id_usuario=4;
update usuarios set estado='activo' where id_usuario=8;
update clases set estado='activo' where id_clase=10;
select * from usuario;
delete from usuarios where id_rol = 2;

ALTER TABLE clases 
MODIFY horaInicio VARCHAR(10),
MODIFY horaFin VARCHAR(10);

describe clases;