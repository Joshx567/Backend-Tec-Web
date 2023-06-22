import { Module } from '@nestjs/common';
import { NotasController } from './notas.controller';
import { NotaService } from './notas.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Nota } from './entities/nota.entity';

import { EstudiantesModule } from 'src/estudiantes/estudiantes.module';
import { MateriasModule } from 'src/materias/materias.module';
import { InscripcionesModule } from 'src/inscripciones/inscripciones.module';

@Module({
  controllers: [NotasController],
  providers:[NotaService],
  imports:[TypeOrmModule.forFeature([Nota]),EstudiantesModule,MateriasModule,InscripcionesModule]
})
export class NotasModule {}
