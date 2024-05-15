export interface IToken {
    serial: string;
    client: string;
    client_secret: string;
}

export interface IValidate {
    id: string;
}

export interface ILogin {
    login: boolean;
    message: string;
}