
import { Body, Controller, HttpStatus, Post, Response } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService ){}

    /**
     * Handles user login by authenticating the provided credentials.
     * @param user - The login data transfer object containing user credentials.
     * @returns A promise resolving with the authentication response or throws an error if authentication fails.
    */
    @Post('login')
    async login(@Response() res, @Body() user: loginDto) {        
        try {
            const response  = await this.authService.authenticate(user);
            
            return res.status(HttpStatus.OK).json({ response });
        } catch (error) {
            return res.status(HttpStatus.UNAUTHORIZED).json({ error: error.message });
        }
        
    }
}
