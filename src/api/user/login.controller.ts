import { IQueryOptions } from "../../models/i.database";
import { IResponse } from "../../models/i.response";
import { IUserLogin, IUserLoginData, IUserPreRegister } from "../../models/i.user";
import { DATABASE, RESPONSE_OBJECT } from "../../utilities/constants";
import { ApiMaster } from "../../infraestructure/api.master";

export class LoginController extends ApiMaster<IUserLogin> {

    readonly METHOD = 'POST';
    readonly PATH = '/api/user/login';

    async get( body: IUserLogin): Promise<IResponse> {
        const queries: IQueryOptions[] = [];
        queries.push({ key: 'email', compare: '==', value: body.user });
        queries.push({ key: 'password', compare: '==', value: body.password });
        const response = await this.database.search<IUserPreRegister>( DATABASE.usersTower , queries);
        const data: IUserLoginData = { login: false, message: '' }
        if(response.length !== 1) {
            data.message = 'El usuario y/o clave son incorrectos';
            return Promise.resolve({ ...RESPONSE_OBJECT[200] , data });
        }
        if (!response[0].validateEmail){
            data.message = 'Revisa tu bandeja de correo y valida tu acceso';
            return Promise.resolve({ ...RESPONSE_OBJECT[200] , data });
        }
        if (!response[0].validateAccessAdministrator){
            data.message = 'Comunícate con la administración para que te conceda el acceso a la aplicación';
            return Promise.resolve({ ...RESPONSE_OBJECT[200] , data });
        }
        data.login = true;
        data.message = 'Ok';
        data.name = response[0].name;
        data.email = response[0].email;
        return Promise.resolve({ ...RESPONSE_OBJECT[200] , data });
    }
    
}