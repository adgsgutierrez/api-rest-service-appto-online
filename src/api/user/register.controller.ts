import { IQueryOptions } from "../../models/i.database";
import { IResponse } from "../../models/i.response";
import { IUserPreRegister, IUserRegister } from "../../models/i.user";
import { DATABASE, RESPONSE_OBJECT } from "../../utilities/constants";
import { BASE64 } from "../../utilities/utils";
import { ApiMaster } from "../../infraestructure/api.master";
import { v4 as uuidv4 } from 'uuid';

export class RegisterUserController extends ApiMaster<IUserRegister> {

    readonly METHOD = 'POST';
    readonly PATH = '/api/user/register';

/**
 * Esta función de TypeScript registra de forma asincrónica a un usuario, guarda su información en una
 * base de datos, envía un correo electrónico de activación y devuelve un objeto de respuesta.
 * @param _body - Se espera que el parámetro `_body` en la función `get` sea un objeto con pares
 * clave-valor que representen datos de registro del usuario. Luego, estos datos se utilizan para crear
 * un nuevo objeto de usuario `_user` con propiedades adicionales como `validateEmail`, `validatePhone`
 * y `tokenActivate`. El `_usuario
 * @returns El método `get` devuelve una Promesa que se resuelve en un objeto con un código de estado y
 * datos. Si la operación es exitosa, devuelve un código de estado de 200 junto con los datos del
 * usuario cargados en la base de datos y la respuesta del envío de un correo electrónico de
 * activación. Si hay un error, devuelve un código de estado de 500 junto con los datos del error.
 */
    async get(_body: IUserRegister): Promise<IResponse> {
        try{
            const uuid = uuidv4();
            const _strTokenUuid = BASE64.encode(uuid);
            const _user: IUserPreRegister = { ..._body , validateEmail: false, validateAccessAdministrator: false };
            const queries: IQueryOptions[] = [];
            queries.push({ key: 'email', compare: '==', value: _user.email });
            const response = await this.database.search<IUserPreRegister>( DATABASE.usersTower , queries);
            if ( response.length != 0) {
                return { ...RESPONSE_OBJECT[200] , data: { status: 200 } };
            }
            const resp = await this.database.setWithId( DATABASE.usersTower , uuid , _user );
            const destiny = `${_user.name} <${_user.email}>`;
            const responseSendMail = await this.mail.sendMail( destiny , 'Activación de Cuenta' , 'register' , { token: _strTokenUuid } ) as { accepted: string[] };
            return { ...RESPONSE_OBJECT[200] , data: { userload: resp, mail: responseSendMail.accepted , status: 100 } };
        } catch ( _err ) {
            return Promise.resolve({ ...RESPONSE_OBJECT[500] , data: _err });
        }
    }
}
