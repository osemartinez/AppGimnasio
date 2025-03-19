export interface Reserva {
    id_reserva?: number;  
    estado: "reservado" | "cancelado"; 
    fechaReserva?: string;  
    id_clase: number;    
    id_usuario: number;   
    
  
  }