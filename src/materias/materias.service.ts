import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateMateria } from './dto/create-materia.dto';
import { Materia } from './entities/materia.entity';
import { InjectRepository } from '@nestjs/typeorm';
import{ILike, Repository}from 'typeorm';
import { UpdateMateria } from './dto/update-materia.dto';
import { MessageDto } from 'src/common/message.dto';

@Injectable()
export class MateriaService{
    constructor(@InjectRepository(Materia)private MateriaRepository:Repository<Materia>){}
    async create(createMateria:CreateMateria){
      //const {nombreUsuario, email} = createMateria;
      const exists = await this.MateriaRepository.findOne({where:[{sigla: createMateria.sigla}]});
      if(exists)throw new BadRequestException(new MessageDto('esa materia ya existe'));
      return this.MateriaRepository.save(createMateria);
    }
    findAll(){
          return  this.MateriaRepository.find({
            relations:['nota','inscripcion']
          });
    }

    findByStudent(id:number){
      return this.MateriaRepository.createQueryBuilder('materia')
        //.select('materia','estudiante')
        .leftJoin('materia.inscripcion', 'inscripcion')
        .where('inscripcion.estudiante.carnet = :id', { id })
        .getMany();
    }

    findOne(id:number){
        return this.MateriaRepository.findOne({
            where: {
              id,
            },relations: ['nota', 'inscripcion']
          });
    }
    findFiltro(cadena: string){
      return  this.MateriaRepository.find({   
        relations:['nota','inscripcion'],
        where: {
          nombre: ILike(`${cadena}%`),
        }
      });
    }
    async checkIfSiglaExists(fieldName: string, value: any): Promise<boolean> {
      const item = await this.MateriaRepository.findOne({ where: { [fieldName]: value } });
      return !!item;
    }
    update(sigla:string,updateMateria:UpdateMateria){
        return this.MateriaRepository.update({sigla:sigla}, {
            sigla:updateMateria.sigla,
            nombre:updateMateria.nombre,
            descripcion:updateMateria.descripcion,
            //departamento:updateMateria.departamento
        });
    }
    remove(sigla:string){
        return this.MateriaRepository.delete(sigla);
    }
    
}