
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { AuthRepository } from '../auth.repository'
import { UsuarioEntity } from 'src/usuario/entities/usuario.entity'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport/dist'
import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator'
import { InjectRepository } from '@nestjs/typeorm'
import { JWT_SECRET } from 'src/config/constants'
import { PayLoadinterface } from '../payload.interface'
import { UnauthorizedException } from '@nestjs/common'
import { MessageDto } from 'src/common/message.dto'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(
        @InjectRepository(UsuarioEntity)
        private readonly authRepository: AuthRepository,
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService
    )
    
    {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get(JWT_SECRET)
        });    
    }

    async validate(payload: PayLoadinterface)
    {
        const {nombreUsuario, email} = payload;
        const usuario = await this.authRepository.findOne({where: [{nombreUsuario:nombreUsuario}, {email:email}]});
        if(!usuario) return new UnauthorizedException (new MessageDto("Credenciales incorrectas"))
        return payload;
    }

}