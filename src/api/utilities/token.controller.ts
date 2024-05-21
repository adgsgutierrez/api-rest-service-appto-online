import { IToken } from "../../models/i.auth";
import { IResponse } from "../../models/i.response";
import { DATABASE, KEYS, RESPONSE_OBJECT } from "../../utilities/constants";
import { ApiMaster } from "../../infraestructure/api.master";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

export class TokenController extends ApiMaster<IToken> {

    readonly METHOD = 'POST';
    readonly PATH = '/api/utilities/token';
    readonly SECURE = false;

/**
 * Esta función de TypeScript es un método asincrónico que maneja la autenticación comparando el
 * cliente y los valores secretos del cliente con los almacenados en una base de datos, generando un
 * token JWT si la comparación es exitosa.
 * @param body - El método `get` que proporcionaste es una función asincrónica que toma un parámetro
 * `body` de tipo `{ [key: string]: any; }` y devuelve una `Promesa` de tipo `IResponse`.
 * @returns El método `get` devuelve una Promesa que se resuelve en un objeto `IResponse`. Dependiendo
 * de las condiciones que se cumplan en el bloque try, devolverá diferentes respuestas:
 */
    async get(body: IToken): Promise<IResponse> {
        try{
            const client = await this.database.getWithId<IToken>( DATABASE.userAuth , body.serial );
            const _cClient = await bcrypt.compare(body.client , client.client);
            const _cSecret = await bcrypt.compare(body.client_secret , client.client_secret);
            if(_cSecret && _cClient) {
                const _payload = Buffer.from(JSON.stringify(body)).toString('base64')
                const token = jwt.sign( { uuid: _payload } , KEYS.auth.secret as string , { expiresIn: KEYS.auth.expire , encoding: 'utf8' , algorithm: "HS512" });
                return Promise.resolve({ ...RESPONSE_OBJECT[200] , data: { type: 'Bearer' ,  token , expire: KEYS.auth.expire } });
            }
            return Promise.resolve({ ...RESPONSE_OBJECT[401] });
        } catch ( _err ) {
            return Promise.resolve({ ...RESPONSE_OBJECT[500] , data: _err });
        }
    }

/**
 * La función "validar" en TypeScript se utiliza para verificar y validar un token para la
 * autenticación.
 * @param {string} [token] - El parámetro `token` es una cadena que debe contener un token JWT con el
 * prefijo 'Bearer'. Esta función valida el token decodificandolo, verificando su autenticidad y
 * comparándolo con la información del cliente almacenada en la base de datos. Si el token es válido y
 * coincide con los detalles del cliente, la función devuelve "verdadero".
 * @returns La función `validar` devuelve una Promesa que se resuelve en un valor booleano. La función
 * primero verifica si el token comienza con 'Portador'. Si no es así, devuelve falso inmediatamente.
 */
    async validate( token: string = '' ): Promise<boolean> {
        if (token.indexOf('Bearer ') === -1 ){ return false; }
        try{
            const _token = token.replace('Bearer ', '');
            const _payload: {uuid: string} = jwt.verify(_token , KEYS.auth.secret as string) as { uuid: ''};
            const _strClient = Buffer.from(_payload.uuid, 'base64').toString('ascii');
            const _vefiryToken: IToken = JSON.parse(_strClient) as IToken;
            const client = await this.database.getWithId<IToken>( DATABASE.userAuth , _vefiryToken.serial );
            const _cClient = await bcrypt.compare(_vefiryToken.client , client.client);
            const _cSecret = await bcrypt.compare(_vefiryToken.client_secret , client.client_secret);
            return (_cSecret && _cClient);
        } catch (_err) {
            console.error(_err);
        }
        return false;
    }
}