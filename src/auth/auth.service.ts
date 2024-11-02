import { Injectable, NotFoundException } from '@nestjs/common';
import { IAuthenticated, Role, User } from './interface/role';
import { faker, simpleFaker } from '@faker-js/faker';
import { LoginDto } from './dto/login.dto';
import { sign } from 'jsonwebtoken';
import { RegisterDto } from './dto/register.dto';


@Injectable()
export class AuthService {

    constructor(){}


    users: User[] =[
        {
            id: simpleFaker.string.uuid(),
            userName: faker.person.fullName(),
            email :  faker.internet.email(),
            password : "user123",
            role: Role.USER
        },
        {
            id: simpleFaker.string.uuid(),
            userName: faker.person.fullName(),
            email :  faker.internet.email(),
            password : "admin123",
            role: Role.ADMIN
        },
        {
            id: simpleFaker.string.uuid(),
            userName: "aa",
            email :  "aa@aa.com",
            password : "superadmin123",
            role: Role.SUPER_ADMIN
        }
    ]
    
    /**
     * Validates a user by checking if the given username and password
     * match a user in the users array.
     * 
     * @param userName The username to validate.
     * @param password The password to validate.
     * @returns A promise that resolves with the validated user or null if no user is found.
    */
    async validateUser(email: string, password: string): Promise<User> {        
        const user = this.users.find(user => user.email === email && user.password === password);
        return user;
    }

    /**
     * Registers a new user to the user array.
     * @param user The user to register.
     * @returns The registered user.
    */
    async register(user: RegisterDto): Promise<User> {
        const registerUser: User = {
            id: simpleFaker.string.uuid(),
            ...user,
            role: Role.USER
        }
        this.users.push(registerUser);
        return registerUser;
    }

    /**
     * Logs in a user and returns a JSON web token that can be used
     * to authenticate the user.
     * @param user The user to log in.
     * @returns A promise that resolves with an object containing the user and
     * a JSON web token.
    */
    async login(user: User): Promise<IAuthenticated> {
        const token = sign({ ...user, iat: Math.floor(Date.now() / 1000) }, process.env.JWT_SECRET);
        return {
            user,
            token
        }
    }

    /**
     * Authenticates a user and returns a JSON web token that can be used
     * to authenticate the user.
     * @param login The user to authenticate.
     * @returns A promise that resolves with an object containing the user and
     * a JSON web token.
     * @throws {NotFoundException} if the user is not found or the password is invalid.
    */
    async authenticate(login: LoginDto): Promise<IAuthenticated> {
        const user = await this.validateUser(login.email, login.password);
        if (!user) {
            throw new NotFoundException('Invalid credentials');
        }
        return this.login(user);
    }

    /**
     * Logs out a user.
     * @returns A promise that resolves with a boolean indicating
     * if the logout was successful.
    */
    async logout(): Promise<boolean> {
        return true;
    }

}
