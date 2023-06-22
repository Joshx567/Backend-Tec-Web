import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MateriasModule } from './materias/materias.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotasModule } from './notas/notas.module';
import { EstudiantesModule } from './estudiantes/estudiantes.module';
import { InscripcionesModule } from './inscripciones/inscripciones.module';
import { UsuarioModule } from './usuario/usuario.module';
import { RolModule } from './rol/rol.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
  ConfigModule.forRoot({
    envFilePath: '.env',
    isGlobal:true
  }),
  TypeOrmModule.forRoot({type: 'mysql',
  host: 'db4free.net',//loalhost
  port: 3306,
  username: 'tecweb',//root
  password: 'tec12345',//12345678
  database: 'ucbfinal',//proyfinaltecweb
  synchronize: true,
  autoLoadEntities:true 
}),EstudiantesModule,MateriasModule,NotasModule,InscripcionesModule, UsuarioModule, RolModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
