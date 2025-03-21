
export interface Clase {
    id_clase?: number;
    nombre: string;
    descripcion: string;
    horaInicio: string; 
    horaFin: string; 
    cuposMaximos: number;
    estado: 'activo' | 'inactivo';
    instructorNombre: string;
  }