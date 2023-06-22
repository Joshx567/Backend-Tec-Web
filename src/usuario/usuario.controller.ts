import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UsuarioService } from './usuario.service'; 
import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';

@Controller('usuario')
export class UsuarioController {
    constructor(private readonly usuarioService: UsuarioService) {}

    @Get()
    getAll() {
        return this.usuarioService.getAll();
    }

    @Get("/:id")
    getOne(@Param('id')id:number) {
        return this.usuarioService.getOne(id);
    }
    @UsePipes(new ValidationPipe({whitelist: true}))
    @Post()
    create(@Body() dto: CreateUsuarioDto) {
        return this.usuarioService.create(dto);
    }
}
