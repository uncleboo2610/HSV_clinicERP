import { Body, Controller, Post } from '@nestjs/common';
import { AuthDto } from 'src/auth/dtos/auth.dto';
import { AuthService } from 'src/auth/services/auth/auth.service';

@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService
    ) {}

    @Post('login')
    logIn(
        @Body() logInDto: AuthDto
    ) {
        return this.authService.logIn(logInDto.username, logInDto.password);
    }
}
