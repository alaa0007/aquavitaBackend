import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class RegisterDto{

    @IsString()
    @IsNotEmpty()
    readonly userName: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    readonly password: string;

}