import { IsEnum } from "class-validator";
import { RolNombre } from "../rol.enum";

export class CreateRolDto{
    @IsEnum(RolNombre,{message: 'Solo hay rol user o admin'})
    rolNombre: string;

    
}