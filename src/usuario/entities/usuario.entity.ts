import{Column,Entity,PrimaryGeneratedColumn,OneToMany,JoinTable,ManyToMany, BeforeInsert, BeforeUpdate, OneToOne}from 'typeorm';
import { RolEntity } from 'src/rol/entities/rol.entity';
import { hash } from 'bcryptjs';
import { Estudiante } from 'src/estudiantes/entities/estudiante.entity';

//@Entity({name:'usuario'})
@Entity()
export class UsuarioEntity{
    @PrimaryGeneratedColumn('increment')
    id: number;
    @Column({type:'varchar',length: 50,nullable:true})
    nombre:string;
    @Column({type:'varchar',length: 50,nullable:false,unique:true})
    nombreUsuario:string;
    @Column({type:'varchar',length: 50,nullable:false,unique:true})
    email:string;
    @Column({type:'varchar',nullable:false})
    password:string;
    //@ManyToMany(type=>RolEntity,rol=>rol.usuarios,{eager:true})
    @ManyToMany(()=>RolEntity,(rol)=>rol.usuarios,{eager:true})
    @JoinTable({
        name:'usuario_rol',
        joinColumn:{name:'usuario_id'},
        inverseJoinColumn:{name:'rol_id'}
    })
    roles:RolEntity[];
    
    @OneToOne(() => Estudiante, estudiante => estudiante.usuario) // Define the relationship with Student entity
    estudiante: Estudiante;

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword(){
        if(!this.password) return;
        this.password = await hash(this.password, 10);
    }
}