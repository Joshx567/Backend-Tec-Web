import { Module } from '@nestjs/common';
import { InscripcionesController } from './inscripciones.controller';
import { InscripcionService } from './inscripciones.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inscripcion } from './entities/inscripcion.entity';
import { EstudiantesModule } from 'src/estudiantes/estudiantes.module';
import { MateriasModule } from 'src/materias/materias.module';

@Module({
  controllers: [InscripcionesController],
  providers:[InscripcionService],
  imports:[TypeOrmModule.forFeature([Inscripcion]),EstudiantesModule,MateriasModule],
  exports: [InscripcionService]
})
export class InscripcionesModule {}

