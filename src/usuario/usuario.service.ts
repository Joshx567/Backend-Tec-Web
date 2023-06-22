
import{ BadRequestException,Injectable,InternalServerErrorException,NotFoundException } from '@nestjs/common';
import{ InjectRepository } from '@nestjs/typeorm';
import { RolEntity } from 'src/rol/entities/rol.entity';
import { RolRepository } from 'src/rol/rol.repository';
import { UsuarioEntity } from './entities/usuario.entity';
import { UsuarioRepository } from './usuario.repository';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { MessageDto } from 'src/common/message.dto';
import { RolNombre } from 'src/rol/rol.enum';

@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository(RolEntity)
        private readonly rolRepository: RolRepository,
        @InjectRepository(UsuarioEntity)
        private readonly usuarioRepositoty: UsuarioRepository
    ){}
    async getAll(): Promise<UsuarioEntity[]> {
        const usuarios = await this.usuarioRepositoty.find({
            relations:['estudiante']
          });
     //   if(!usuarios.lenght)throw new NotFoundException(new MessageDto('no hay usuarios en la lista'))
        return usuarios;

    }

    getOne(id:number){
        return this.usuarioRepositoty.findOne({
            where: {
              id,
            },relations: ['estudiante']
          });;
    }
    async create(dto: CreateUsuarioDto): Promise<any>{
        const {nombreUsuario, email} = dto;
        const exists = await this.usuarioRepositoty.findOne({where:[{nombreUsuario: nombreUsuario}, {email: email}]});
      if(exists)throw new BadRequestException(new MessageDto('ese usuario ya existe'));
        const rolAdmin = await this.rolRepository.findOne({where:{rolNombre: RolNombre.ADMIN}});
        const rolStudent = await this.rolRepository.findOne({where:{rolNombre: RolNombre.STUDENT}});
        const rolTeacher = await this.rolRepository.findOne({where:{rolNombre: RolNombre.TEACHER}});
        if(!rolAdmin||!rolStudent||!rolTeacher)throw new InternalServerErrorException(new MessageDto('los roles aun no se han creado'));
     const admin = this.usuarioRepositoty.create(dto);
     admin.roles=[rolAdmin,rolStudent,rolTeacher];
     await this.usuarioRepositoty.save(admin);


        
      //  return new MessageDto("admin creado");  
    }
}
