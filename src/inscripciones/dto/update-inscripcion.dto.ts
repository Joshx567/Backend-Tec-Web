import{PartialType}from '@nestjs/mapped-types';
import { CreateInscripcion } from './create-inscripcion.dto';
export class UpdateInscripcion extends PartialType(CreateInscripcion){
    carnet:number;
    sigla: string;
    fecha_inscripcion: string;
}