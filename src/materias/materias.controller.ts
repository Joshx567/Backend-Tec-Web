import { Body,Controller,Delete,Get,Param,Post, Put, UseGuards } from '@nestjs/common';
import { CreateMateria } from './dto/create-materia.dto';
import { MateriaService } from './materias.service';
import { UpdateMateria } from './dto/update-materia.dto';
import { RolDecorator } from 'src/decorators/rol.decorator';
import { RolNombre } from 'src/rol/rol.enum';
import { RolesGuard } from 'src/guards/rol.guard';
import { JwtAuthGuard } from 'src/guards/jwt.guard';

@Controller('materias')
export class MateriasController {
    constructor(private materiaService:MateriaService){}

    @RolDecorator(RolNombre.ADMIN, RolNombre.TEACHER)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('')
    findAll(){
        return this.materiaService.findAll();
    }
    @RolDecorator(RolNombre.ADMIN, RolNombre.TEACHER)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get(':id')
    findOne(@Param('id')id:number){
        return this.materiaService.findOne(id);
    }

    @RolDecorator(RolNombre.ADMIN, RolNombre.TEACHER)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('/filtro/:cadena')
    findFiltro(@Param('cadena')cadena:string){
        return this.materiaService.findFiltro(cadena);
    }

    @RolDecorator(RolNombre.ADMIN, RolNombre.TEACHER, RolNombre.STUDENT)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('/estudiante/:id')
    findByEstudiante(@Param('id')id:number){
        return this.materiaService.findByStudent(id);
    }


    @RolDecorator(RolNombre.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post('')
    create(@Body()createMateria:CreateMateria){
        //const itemExists = await this.materiaService.checkIfSiglaExists('sigla', value);
        return this.materiaService.create(createMateria);
    }

    @RolDecorator(RolNombre.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put(':sigla')
    update(@Param('sigla')sigla:string,@Body() updateMateria:UpdateMateria){
        return this.materiaService.update(sigla,updateMateria);     
    }

    @RolDecorator(RolNombre.ADMIN)  
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete(':sigla')
    remove(@Param('sigla')sigla:string){
        return this.materiaService.remove(sigla);
    }
}
