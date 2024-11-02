import { IsNotEmpty, IsString } from "class-validator";

export class loginDto {

    @IsString()
    @IsNotEmpty()
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    readonly password: string;
}