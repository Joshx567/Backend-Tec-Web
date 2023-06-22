import { IsEmail } from "class-validator";

export class CreateEstudiante {
  //  carnet:number;
    nombre_completo: string;
    celular: number;
    @IsEmail()
    email: string;
    fecha_nacimiento: string;
}