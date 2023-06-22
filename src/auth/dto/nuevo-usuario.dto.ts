import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class NuevoUsuarioDto{
    
    @IsString()
    @MaxLength(40, {message: 'nombre: longitud maxima de 10'})
    nombre: string;

    @IsNotEmpty({message: 'el nombre de usuario no puede estar vacio'})
    @MaxLength(40, {message: 'nombre de usuario: longitud maxima de 10'})
    nombreUsuario: string;

    @IsEmail()
    email: string;

    @IsNotEmpty({message: 'la contrasenia del usuario no puede estar vacia'})
    password: string;
}