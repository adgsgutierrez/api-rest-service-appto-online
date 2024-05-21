import { ILogin } from "./i.auth";
import { IResidentials } from "./i.residential";

export interface IBasicDataUser {
    name: string;
    email: string;
}

export interface IUserRegister extends IBasicDataUser {
    residential: IResidentials;
    tower: string;
    number: number;
    password: string;
    validatePassword: string;
}

export interface IUserPreRegister extends IUserRegister{
    validateEmail: boolean;
    validateAccessAdministrator: boolean;
}

export interface IUserLogin{
    user: string;
    password: string;
}

export interface IUserLoginData extends ILogin , Partial<IBasicDataUser> {}
