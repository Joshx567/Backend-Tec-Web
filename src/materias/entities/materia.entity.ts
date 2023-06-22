import{Column,Entity,PrimaryGeneratedColumn,OneToMany,ManyToMany}from 'typeorm';
import { Nota } from 'src/notas/entities/nota.entity';
import { Inscripcion } from 'src/inscripciones/entities/inscripcion.entity';

@Entity()
export class Materia{
    @PrimaryGeneratedColumn()
    id:number;
    @Column({type:'varchar',length: 50,nullable:false,unique:true})
    sigla:string;
    @Column()
    nombre:string;
    @Column()
    descripcion:string;
    @OneToMany(()=>Nota,(nota)=>nota.materia)
    nota:Nota[]
    @OneToMany(()=>Inscripcion,(inscripcion)=>inscripcion.materia)
    inscripcion:Inscripcion[]
}