import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateNota } from './dto/create-nota.dto';
import { Nota } from './entities/nota.entity';
import { InjectRepository } from '@nestjs/typeorm';
import{Repository}from 'typeorm';
import { UpdateNota } from './dto/update-nota.dto';
import { Estudiante } from 'src/estudiantes/entities/estudiante.entity';
import { Materia } from 'src/materias/entities/materia.entity';
import { from } from 'rxjs';
import { EstudianteService } from 'src/estudiantes/estudiantes.service';
import { MateriaService } from 'src/materias/materias.service';
import { InscripcionService } from 'src/inscripciones/inscripciones.service';
import { MessageDto } from 'src/common/message.dto';

@Injectable()
export class NotaService{
    constructor(
        @InjectRepository(Nota)private NotaRepository:Repository<Nota>,
        private estudianteService: EstudianteService,
        private materiaService : MateriaService,
        private inscripcionService: InscripcionService
        //@InjectRepository(Estudiante)private EstudianteRepository:Repository<Estudiante>,
        //@InjectRepository(Materia)private MateriaRepository:Repository<Materia>,
        ){}
 
    async create(createNota:CreateNota){
        const estudiante =await this.estudianteService.findOne(createNota.carnet)
        const materia = await this.materiaService.findOne(createNota.id_materia)
        if(!estudiante){
            throw new NotFoundException('No se ha encontrado a un estudiante con ese carnet')
        }
        if(!materia){
            throw new NotFoundException('No se ha encontrado a una materia con esa sigla')
        }
        if(!await this.inscripcionService.checkIfEstudianteExists(materia.id, estudiante.carnet)){
          throw new BadRequestException(new MessageDto('Este estudiante NO está inscrito a la materia'));
        }
        const newNota  =new Nota();
        newNota.calificacion = createNota.calificacion;
        newNota.evaluacion = createNota.evaluacion;
        newNota.gestion = createNota.gestion;
        newNota.materia = materia;
        newNota.estudiante = estudiante;
        return this.NotaRepository.save(newNota);
    }
    findAll(){
          return  this.NotaRepository.find({
            relations:['materia','estudiante']
          });
    }
    findOne(id:number){
        return this.NotaRepository.findOne({
            where: {
              id,
            },relations: ['materia','estudiante']
          });;
    }
    findMateria(id:number){
        return this.NotaRepository.createQueryBuilder('nota')
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
    findByStudentAndMateria(idMateria:number, idStudent: number){
        return this.NotaRepository.createQueryBuilder('nota')
        //.select('materia','estudiante')
        .leftJoin('nota.materia', 'materia')
        .leftJoin('nota.estudiante', 'estudiante')
        .where('materia.id = :idMateria', { idMateria })
        .andWhere('estudiante.carnet = :idStudent', { idStudent})
        .getMany();
        
        /*find({
            where: {
              materia.id : id,
            },relations: ['materia','estudiante']
          });*/
    }
    update(id:number,updateNota:UpdateNota){
       /* return this.NotaRepository.update({id:id}, {
            
            carnet:updateNota.carnet,
            sigla:updateNota.id_materia,
            gestion:updateNota.gestion,
            evaluacion:updateNota.evaluacion,
            calificacion:updateNota.calificacion
        });*/
    }
    remove(id:number){
        return this.NotaRepository.delete(id);
    }
}