import { IQueryOptions } from "../../models/i.database";
import { IResponse } from "../../models/i.response";
import { IUserLogin, IUserLoginData, IUserPreRegister } from "../../models/i.user";
import { DATABASE, RESPONSE_OBJECT } from "../../utilities/constants";
import { ApiMaster } from "../../infraestructure/api.master";

export class LoginController extends ApiMaster<IUserLogin> {

    readonly METHOD = 'POST';
    readonly PATH = '/api/user/login';

/**
 * La función `get` en TypeScript verifica las credenciales de inicio de sesión del usuario y devuelve
 * una respuesta basada en los resultados de la validación.
 * @param {IUserLogin} body - La función `get` que proporcionó es una función asincrónica que toma un
 * parámetro `body` de tipo `IUserLogin`. El parámetro "cuerpo" parece contener información de inicio
 * de sesión del usuario, como correo electrónico y contraseña.
 * @returns El método `get` devuelve una Promesa que se resuelve en un objeto con un código de estado
 * de 200 y un objeto de datos que contiene información sobre el estado de inicio de sesión del
 * usuario. El objeto de datos incluye propiedades como `login` (un valor booleano que indica si el
 * inicio de sesión fue exitoso), `message` (un mensaje relacionado con el estado de inicio de sesión),
 * `name` (el nombre del usuario) y `email` (el
 */
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