import{Column,Entity,PrimaryGeneratedColumn,OneToMany, OneToOne, JoinColumn}from 'typeorm';
import { Nota } from 'src/notas/entities/nota.entity';
import { Inscripcion } from 'src/inscripciones/entities/inscripcion.entity';
import { UsuarioEntity } from 'src/usuario/entities/usuario.entity';
@Entity()
export class Estudiante{
    @PrimaryGeneratedColumn()
    carnet:number;
    @Column()
    nombre_completo:string;
    @Column()
    celular:number;
    @Column({type:'varchar',length: 50,nullable:false,unique:true})
    email:string;
    @Column({type:'date'})
    fecha_nacimiento:string;
    @OneToMany(()=>Nota,(nota)=>nota.estudiante)
    nota:Nota[]
    @OneToMany(()=>Inscripcion,(inscripcion)=>inscripcion.estudiante)
    inscripcion:Inscripcion[]

    @OneToOne(() => UsuarioEntity, usuario => usuario.estudiante, { cascade: true }) // Define the relationship with User entity and enable cascading
    @JoinColumn()
    usuario: UsuarioEntity;
}