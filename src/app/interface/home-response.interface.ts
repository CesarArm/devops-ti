export interface HomeResponse {
  estado: string,
  mensaje: string,
  resultado: {
    genero:string,
    nombres:string,
    apellido_paterno:string,
    apellido_materno:string,
    fecha_nacimiento:string
  }
}
