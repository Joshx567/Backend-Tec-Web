import{Column,Entity,PrimaryGeneratedColumn,ManyToOne}from 'typeorm';
import { Materia } from 'src/materias/entities/materia.entity';
import { Estudiante } from 'src/estudiantes/entities/estudiante.entity';

@Entity()
export class Inscripcion{
    @PrimaryGeneratedColumn()
    id:number;
    @Column({type:'date'})
    fecha_inscripcion:string;
    @ManyToOne(()=>Materia,(materia)=>materia.inscripcion)
    materia:Materia;
    @ManyToOne(()=>Estudiante,(estudiante)=>estudiante.inscripcion)
    estudiante:Estudiante;
}