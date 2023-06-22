import { Module } from '@nestjs/common';
import { MateriasController } from './materias.controller';
import { MateriaService } from './materias.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Materia } from './entities/materia.entity';

@Module({
  controllers: [MateriasController],
  providers:[MateriaService],
  imports:[TypeOrmModule.forFeature([Materia])],
  exports:[MateriaService]
})
export class MateriasModule {}
