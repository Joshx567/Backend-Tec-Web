import { Body,Controller,Delete,Get,Param,Post, Put, UseGuards } from '@nestjs/common';
import { CreateEstudiante } from './dto/create-estudiante.dto';
import { EstudianteService } from './estudiantes.service';
import { UpdateEstudiante } from './dto/update-estudiante.dto';
import { RolDecorator } from 'src/decorators/rol.decorator';
import { RolNombre } from 'src/rol/rol.enum';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { RolesGuard } from 'src/guards/rol.guard';

@Controller('estudiantes')
export class EstudiantesController {
    constructor(private estudianteService:EstudianteService){

    }

    @RolDecorator(RolNombre.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('')
    findAll(){
        return this.estudianteService.findAll();
    }

    @RolDecorator(RolNombre.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get(':carnet')
    findOne(@Param('carnet')carnet:number){
        return this.estudianteService.findOne(+carnet);

    }

    @RolDecorator(RolNombre.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('/filtro/:cadena')
    findFiltro(@Param('cadena')cadena:string){
        return this.estudianteService.findFiltro(cadena);

    }

    @RolDecorator(RolNombre.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post('')
    create(@Body()createEstudiante:CreateEstudiante){
        return this.estudianteService.create(createEstudiante);
    }

        
    @RolDecorator(RolNombre.ADMIN, RolNombre.STUDENT)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put(':carnet')
    update(@Param('carnet')carnet:number,@Body() updateEstudiante:UpdateEstudiante){
        return this.estudianteService.update(+carnet,updateEstudiante);     
    }

    @RolDecorator(RolNombre.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete(':carnet')
    remove(@Param('carnet')carnet:number){
        return this.estudianteService.remove(+carnet);
    }
}
