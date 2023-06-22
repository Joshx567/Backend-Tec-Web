import { Body,Controller,Delete,Get,Param,Post, Put } from '@nestjs/common';
import { CreateNota } from './dto/create-nota.dto';
import { NotaService } from './notas.service';
import { UpdateNota } from './dto/update-nota.dto';

@Controller('notas')
export class NotasController {
    constructor(private notasService:NotaService){

    }
    @Get('')
    findAll(){
        return this.notasService.findAll();
    }
    @Get(':id')
    findOne(@Param('id')id:number){
        return this.notasService.findOne(+id);

    }
    @Get('/materia/:id')
    findMateria(@Param('id')id:number){
        return this.notasService.findMateria(+id);
    }


    @Get('/estudiante/:idmateria/:idestudiante')
    findByStudentAndMateria(@Param('idmateria')idMateria:number, @Param('idestudiante')idEstudiante:number){
        return this.notasService.findByStudentAndMateria(+idMateria, +idEstudiante);
    }
    @Post('')
    create(@Body()createNota:CreateNota){
        return this.notasService.create(createNota);
    }
    @Put(':id')
    update(@Param('id')id:number,@Body() updateNota:UpdateNota){
        return this.notasService.update(+id,updateNota);     
    }
    @Delete(':id')
    remove(@Param('id')id:number){
        return this.notasService.remove(+id);
    }
}
