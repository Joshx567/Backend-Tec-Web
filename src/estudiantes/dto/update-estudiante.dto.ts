import{PartialType}from '@nestjs/mapped-types';
import { CreateEstudiante } from './create-estudiante.dto';
import { IsEmail } from 'class-validator';
export class UpdateEstudiante extends PartialType(CreateEstudiante){
    nombre_completo: string;
    celular: number;
    @IsEmail()
    email: string;
    fecha_nacimiento: string;
    
}