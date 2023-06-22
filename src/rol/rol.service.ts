
//import{MessageDto}from'./../common/message.dto';
import{RolEntity}from'./entities/rol.entity';
import{RolRepository}from'./rol.repository';
import{BadRequestException,Injectable,NotFoundException}from'@nestjs/common';
import{InjectRepository}from'@nestjs/typeorm';
import{CreateRolDto} from'./dto/create-rol.dto';
import { MessageDto } from 'src/common/message.dto';
import { RolNombre } from './rol.enum';
import { FindOperator } from 'typeorm';
//import{RolNombre}from'./rol.enum';
@Injectable()
export class RolService {
    constructor(
        @InjectRepository(RolEntity)
        private readonly rolRepository:RolRepository
    ){}
    async getAll():Promise<RolEntity[]>{
        const roles=await this.rolRepository.find();
        if(!roles.length)throw new NotFoundException(new MessageDto('no hay roles en la lista'));
      return roles;
    }
    async create(dto:CreateRolDto):Promise<any>{
        const exists =await this.rolRepository.findOne({where: {rolNombre  : dto.rolNombre as RolNombre | FindOperator<RolNombre>}})
        if(exists) throw new BadRequestException(new MessageDto('ese rol ya existe'));
     await this.rolRepository.save(dto as RolEntity);
     //return new MessageDto('rol creado'); 

    }
}
