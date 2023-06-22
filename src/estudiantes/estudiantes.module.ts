import { Module } from '@nestjs/common';
import { EstudiantesController } from './estudiantes.controller';
import { EstudianteService } from './estudiantes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Estudiante } from './entities/estudiante.entity';
import { AuthModule } from 'src/auth/auth.module';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { AuthRepository } from 'src/auth/auth.repository';

@Module({
  controllers: [EstudiantesController],
  providers:[EstudianteService],
  imports:[TypeOrmModule.forFeature([Estudiante]), AuthModule, UsuarioModule],
  exports:[EstudianteService]
})
export class EstudiantesModule {}
