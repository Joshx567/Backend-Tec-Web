import { UsuarioEntity } from '../../usuario/entities/usuario.entity';
import { RolNombre } from '../rol.enum';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

//@Entity({name: 'rol'})
@Entity()
export class RolEntity{
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({type:'varchar',length: 50,nullable:false,unique:true}) 
    rolNombre: RolNombre;

    //ManyToMany(type => UsuarioEntity, usuario => usuario.roles)
    @ManyToMany(()=>UsuarioEntity,(usuario)=>usuario.roles)
    usuarios: UsuarioEntity[];
}