import { IsNotEmpty, IsString } from "class-validator";
import { Role } from "../interface/role";

export class ProfileDto{

    @IsString()
    @IsNotEmpty()
    readonly id: string;

    @IsString()
    @IsNotEmpty()
    readonly userUUID: string;

    @IsString()
    @IsNotEmpty()
    readonly userName: string;

    @IsString()
    @IsNotEmpty()
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    readonly password: string;

    @IsString()
    @IsNotEmpty()
    readonly role: Role;

    @IsString()
    @IsNotEmpty()
    readonly image: string;

    @IsString()
    @IsNotEmpty()
    readonly lastLogin: string;
    
    @IsString()
    @IsNotEmpty()
    readonly createdAt: string;

    @IsString()
    @IsNotEmpty()
    readonly updatedAt: string;


}