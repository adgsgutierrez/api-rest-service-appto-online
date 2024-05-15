import { IValidate } from "../../models/i.auth";
import { IResponse } from "../../models/i.response";
import { IUserPreRegister } from "../../models/i.user";
import { DATABASE, RESPONSE_OBJECT } from "../../utilities/constants";
import { ApiMaster } from "../api.master";

export class ValidateUserController extends ApiMaster<IValidate> {

    readonly METHOD = 'GET';
    readonly PATH = '/api/user/validate';

/**
 * Esta función de TypeScript procesa una solicitud para activar una cuenta de usuario actualizando el
 * estado de validación del usuario y el estado de activación del token en una base de datos.
 * @param body - El método `get` en el fragmento de código proporcionado es una función asincrónica que
 * toma un parámetro `body` de tipo `{ [clave: cadena]: cualquiera; }`. La función realiza los
 * siguientes pasos:
 * @returns El método `get` devuelve una Promesa que se resuelve en un objeto con un código de estado
 * de 200 y un objeto de datos que contiene el nombre, el correo electrónico y el estado isActive de un
 * usuario después de actualizar sus propiedades `validateEmail` y `tokenActivate` en la base de datos.
 * .
 */
    async get(body: IValidate): Promise<IResponse> {
        const uuid = (Buffer.from(body.id, 'base64')).toString();
        const _user = await this.database.getWithId<IUserPreRegister>( DATABASE.usersTower , uuid);
        _user.validateEmail = true;
        await this.database.setWithId<IUserPreRegister>(DATABASE.usersTower , uuid , _user);
        const _userPost = await this.database.getWithId<IUserPreRegister>( DATABASE.usersTower , uuid);
        return Promise.resolve( { ...RESPONSE_OBJECT[200] , data: { name: _userPost.name, email: _userPost.email } });
    }

}