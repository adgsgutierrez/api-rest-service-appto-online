import { IResidentials } from "./i.residential";

export interface IUserRegister {
    name: string;
    email: string;
    residential: IResidentials;
    tower: string;
    number: number;
    password: string;
    validatePassword: string;
}

export interface IUserPreRegister extends IUserRegister{
    validateEmail: boolean;
    validatePhone: boolean;
    tokenActivate: string;
}