import { Injectable } from '@nestjs/common';
import { CreateEstudiante } from './dto/create-estudiante.dto';
import { Estudiante } from './entities/estudiante.entity';
import { InjectRepository } from '@nestjs/typeorm';
import{ILike, Repository, getRepository}from 'typeorm';
import { UpdateEstudiante } from './dto/update-estudiante.dto';
import { UsuarioEntity } from 'src/usuario/entities/usuario.entity';
import { UsuarioRepository } from 'src/usuario/usuario.repository';
import { AuthRepository } from 'src/auth/auth.repository';
import { AuthService } from 'src/auth/auth.service';
import { NuevoUsuarioDto } from 'src/auth/dto/nuevo-usuario.dto';
import { RolNombre } from 'src/rol/rol.enum';
@Injectable()
export class EstudianteService{
    constructor(@InjectRepository(UsuarioEntity)
    private readonly authRepository: AuthRepository,
    private authService: AuthService,
    @InjectRepository(Estudiante)private EstudianteRepository:Repository<Estudiante>){}

    async create(createEstudiante:CreateEstudiante){
      
      const user = this.authRepository.create();
      user.nombreUsuario = await this.generateCredentials(createEstudiante.nombre_completo, createEstudiante.celular); 
      user.password = await this.generateCredentials(createEstudiante.nombre_completo, createEstudiante.celular); 
      user.nombre = createEstudiante.nombre_completo;
      user.email = createEstudiante.email;
      const dtoUser: NuevoUsuarioDto = new NuevoUsuarioDto();
      dtoUser.nombre = createEstudiante.nombre_completo;
      dtoUser.email = createEstudiante.email;
      dtoUser.nombreUsuario = user.nombreUsuario;
      dtoUser.password = user.password;
      const student = this.EstudianteRepository.create(createEstudiante); // Create a new Student instance
      student.usuario = user; // Link the student with the user

      await this.authService.createEstudiante(user/*, student*/); // Save the user to the database
      return this.EstudianteRepository.save(student); // Save the student to the database
          //return this.EstudianteRepository.save(createEstudiante);
    }

    async generateCredentials(nombre_completo: string, celular:number): Promise<string>{
        const nombre = nombre_completo.split(" ")[0];
        let credencial = nombre.toLowerCase() + celular;
        
        return credencial;
    }

    findAll(){
          return  this.EstudianteRepository.find(      
          );
    }
    findOne(carnet:number){
        return this.EstudianteRepository.findOne({
            where: {
              carnet,
            },relations: ['nota', 'inscripcion']
          });
    }
    findFiltro(cadena: string){
      return  this.EstudianteRepository.find({
        relations:['nota','inscripcion'],
        where: {
          nombre_completo: ILike(`${cadena}%`),
        }
      });
    }
    update(carnet:number,updateEstudiante:UpdateEstudiante){
        return this.EstudianteRepository.update({carnet:carnet}, {
          //  carnet:updateEstudiante.carnet,
            nombre_completo:updateEstudiante.nombre_completo,
            //celular:updateEstudiante.celular,
            email: updateEstudiante.email,
            fecha_nacimiento:updateEstudiante.fecha_nacimiento
        });
    }
    remove(carnet:number){
        return this.EstudianteRepository.delete(carnet);
    }
}