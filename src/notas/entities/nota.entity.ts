import{Column,Entity,PrimaryGeneratedColumn,ManyToOne}from 'typeorm';
import { Materia } from 'src/materias/entities/materia.entity';
import { Estudiante } from 'src/estudiantes/entities/estudiante.entity';
@Entity()
export class Nota{
    @PrimaryGeneratedColumn()
    id:number;
   // @Column()  //En las relaciones falta como definir la forgein key capaz con el many to one se defina, pero veo que se define un objeto entero de materia o estudiante, no solo el carnet o la sigla
   //carnet:number;
    //@Column()
    //id_materia:number;
    //sigla:string;
    @Column()
    gestion:string;
    @Column()
    evaluacion:string;
    @Column()
    calificacion:number;
    @ManyToOne(()=>Materia,(materia)=>materia.nota)
    materia:Materia;
    @ManyToOne(()=>Estudiante,(estudiante)=>estudiante.nota)
    estudiante:Estudiante;
    //newNota: Promise<Estudiante>;

}