import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEntity } from './entities/usuario.entity';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { RolEntity } from 'src/rol/entities/rol.entity';
import { UsuarioRepository } from './usuario.repository';

@Module({
    imports: [TypeOrmModule.forFeature([UsuarioEntity, RolEntity])],
    providers: [UsuarioService],
    controllers: [UsuarioController],
    exports: []
  })
export class UsuarioModule {}
