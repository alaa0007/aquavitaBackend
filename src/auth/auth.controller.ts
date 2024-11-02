
import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService ){}

    /**
     * Handles user login by authenticating the provided credentials.
     * @param user - The login data transfer object containing user credentials.
     * @returns A promise resolving with the authentication response or throws an error if authentication fails.
    */
    @Post('login')
    async login(@Res() res: Response, @Body() user: LoginDto) {        
        try {
            const response  = await this.authService.authenticate(user);   
            return res.status(HttpStatus.OK).json({ response });
        } catch (error) {
            return res.status(HttpStatus.UNAUTHORIZED).json({ error: error.message });
        }
        
    }

    @Post('register')
    async register(@Res() res: Response, @Body() user: RegisterDto) {        
        try {
            const response  = await this.authService.register(user);   
            return res.status(HttpStatus.OK).json({ response });
        } catch (error) {
            return res.status(HttpStatus.UNAUTHORIZED).json({ error: error.message });
        }
    }
}
