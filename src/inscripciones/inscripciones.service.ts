import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateInscripcion } from './dto/create-inscripcion.dto';
import { Inscripcion } from './entities/inscripcion.entity';
import { InjectRepository } from '@nestjs/typeorm';
import{Repository}from 'typeorm';
import { UpdateEstudiante } from 'src/estudiantes/dto/update-estudiante.dto';
import { UpdateInscripcion } from './dto/update-inscripcion.dto';
import { EstudianteService } from 'src/estudiantes/estudiantes.service';
import { MateriaService } from 'src/materias/materias.service';
import { promises } from 'dns';
import { MessageDto } from 'src/common/message.dto';
@Injectable()
export class InscripcionService{
    constructor(@InjectRepository(Inscripcion)private InscripcionRepository:Repository<Inscripcion>,
    private estudianteService: EstudianteService,
        private materiaService : MateriaService,){}

    async create(createInscripcion:CreateInscripcion){
        const estudiante =await this.estudianteService.findOne(createInscripcion.carnet)
        const materia = await this.materiaService.findOne(createInscripcion.id_materia)
        if(!estudiante){
            throw new NotFoundException('No se ha encontrado a un estudiante con ese carnet')
        }
        if(!materia){
            throw new NotFoundException('No se ha encontrado a una materia con esa sigla')
        }
        if(await this.checkIfEstudianteExists(materia.id, estudiante.carnet)){
            throw new BadRequestException(new MessageDto('Este estudiante ya esta inscrito a la materia'));
        }
        const inscripcion  =new Inscripcion();
        inscripcion.fecha_inscripcion = createInscripcion.fecha_inscripcion;
        //console.log(inscripcion.fecha_inscripcion)
        inscripcion.materia = materia;
        inscripcion.estudiante = estudiante;
        return this.InscripcionRepository.save(inscripcion);
    }
    findAll(){
        return  this.InscripcionRepository.find({
            relations:['materia','estudiante']
          });
    }
    findOne(id:number){
        return this.InscripcionRepository.findOneBy({id:id});
    }

    async checkIfEstudianteExists(idMateria: number, idEstudiante:number) {
        console.log(idMateria)
        console.log(idEstudiante)
        const result = this.InscripcionRepository.createQueryBuilder('inscripcion')
        //.select('materia','estudiante')
        .leftJoin('inscripcion.materia', 'materia')
        .leftJoin('inscripcion.estudiante', 'estudiante')
        .where('materia.id = :idMateria', { idMateria })
        .andWhere('estudiante.carnet = :idEstudiante', { idEstudiante})
        .getCount();
        const hasData = await result > 0; // If the count is greater than 0, it means there is data
        console.log( await result)
        return hasData;
      }

    findMateria(id:number){
        return this.InscripcionRepository.createQueryBuilder('nota')
        //.select('materia','estudiante')
        .leftJoinAndSelect('nota.materia', 'materia')
        .leftJoinAndSelect('nota.estudiante', 'estudiante')
        .where('materia.id = :id', { id })
        .getMany();
        
        /*find({
            where: {
              materia.id : id,
            },relations: ['materia','estudiante']
          });*/
    }
    update(id:number,updateInscripcion:UpdateInscripcion){
        return this.InscripcionRepository.update({id:id}, {
            //fecha_inscripcion:updateInscripcion.fecha_inscripcion
        });
    }
    remove(id:number){
        return this.InscripcionRepository.delete(id);
    }

}