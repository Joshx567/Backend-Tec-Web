import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RolEntity } from 'src/rol/entities/rol.entity';
import { RolRepository } from 'src/rol/rol.repository';
import { UsuarioEntity } from 'src/usuario/entities/usuario.entity';
import { UsuarioRepository } from 'src/usuario/usuario.repository';
import { NuevoUsuarioDto } from './dto/nuevo-usuario.dto';
import { AuthRepository } from './auth.repository';
import { RolNombre } from 'src/rol/rol.enum';
import { LoginUsuarioDto } from './dto/login.dto';
import { MessageDto } from 'src/common/message.dto';
import { compare } from 'bcryptjs';
import { PayLoadinterface } from './payload.interface';
import { JwtService } from '@nestjs/jwt';
import { TokenDto } from './dto/token.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(RolEntity)
        private readonly rolRepository: RolRepository,
        @InjectRepository(UsuarioEntity)
        private readonly authRepository: AuthRepository,
        private readonly jwtService: JwtService
    ){}

    async getAll(): Promise<UsuarioEntity[]> {
        const usuarios = await this.authRepository.find();
     //   if(!usuarios.lenght)throw new NotFoundException(new MessageDto('no hay usuarios en la lista'))
        return usuarios;

    }
    /*async createEstudiante(dto: NuevoUsuarioDto): Promise<any>{
        const{nombreUsuario,email} = dto
        const exists = await this.authRepository.findOne({where:[{nombreUsuario: nombreUsuario}, {email: email}]});
        const rolStudent = await this.rolRepository.findOne({where:{rolNombre:RolNombre.STUDENT}});
     const admin =this.authRepository.create(dto);
     admin.roles=[rolStudent];
     await this.authRepository.save(admin);  


        
      return new MessageDto("Creado");  
    }*/
    async createEstudiante(user/*, estudiante*/): Promise<any>{
        //const{nombreUsuario,email} = user
        //const exists = await this.authRepository.findOne({where:[{nombreUsuario: nombreUsuario}, {email: email}]});
        const rolStudent = await this.rolRepository.findOne({where:{rolNombre:RolNombre.STUDENT}});
        //const admin =this.authRepository.create(dto);
        user.roles=[rolStudent];
        //user.estudiante = estudiante;
        await this.authRepository.save(user);  


        
      return new MessageDto("Creado");  
    }


    async login (dto:LoginUsuarioDto): Promise<any>{
        const {nombreUsuario} = dto;
        const usuario = await this.authRepository.findOne({where:[{nombreUsuario:nombreUsuario}, {email:nombreUsuario}]})
        if (!usuario) return new UnauthorizedException (new MessageDto("El usuario no existe"));
        const passwordOK = await compare(dto.password, usuario.password);
        if(!passwordOK) return new UnauthorizedException (new MessageDto("contraseña equivocada"));
        const payload: PayLoadinterface = {
            id: usuario.id,
            nombreUsuario: usuario.nombreUsuario,
            email: usuario.email,
            roles: usuario.roles.map(rol => rol.rolNombre as RolNombre) 
        }
        const token = await this.jwtService.sign(payload);
        return {token};
    }

    async refresh (dto: TokenDto) : Promise<any>{
        const usuario = await this.jwtService.decode(dto.token);
        const payload : PayLoadinterface ={
            id: usuario['id'],
            nombreUsuario: usuario['nombreUsuario'],
            email:usuario['email'],
            roles: usuario['roles']
        }
        const token = await this.jwtService.sign(payload);
        return {token};
    }
}
