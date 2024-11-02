export enum Role {
    USER = 'USER',
    ADMIN = 'ADMIN',
    SUPER_ADMIN = 'SUPER_ADMIN'
}


export type User = {
    id: string;
    userName: string;
    email : string;
    password : string;
    role: Role
}

export interface IAuthenticated {
    user: User
    token: string
}