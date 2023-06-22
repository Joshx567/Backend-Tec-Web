import { Body,Controller,Delete,Get,Param,Post, Put } from '@nestjs/common';
import { CreateInscripcion } from './dto/create-inscripcion.dto';
import { InscripcionService } from './inscripciones.service';
import { UpdateInscripcion } from './dto/update-inscripcion.dto';

@Controller('inscripciones')
export class InscripcionesController {
    constructor(private inscripcionService:InscripcionService){

    }
    @Get('')
    findAll(){
        return this.inscripcionService.findAll();
    }
    @Get(':id')
    findOne(@Param('id')id:number){
        return this.inscripcionService.findOne(+id);
    }
    @Get('/materia/:id')
    findMateria(@Param('id')id:number){
        return this.inscripcionService.findMateria(+id);
    }
    @Post('')
    create(@Body()createInscripcion:CreateInscripcion){
        return this.inscripcionService.create(createInscripcion);
    }
    @Put(':id')
    update(@Param('id')id:number,@Body() updateInscripcion:UpdateInscripcion){
        return this.inscripcionService.update(+id,updateInscripcion);     
    }
    @Delete(':id')
    remove(@Param('id')id:number){
        return this.inscripcionService.remove(+id);
    }
}
