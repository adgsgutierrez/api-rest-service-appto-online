import { IResidential } from "../../models/i.residential";
import { IResponse } from "../../models/i.response";
import { DATABASE, RESPONSE_OBJECT } from "../../utilities/constants";
import { ApiMaster } from "../../infraestructure/api.master";

export class CreateResidentialController extends ApiMaster<IResidential> {

    readonly METHOD = 'POST';
    readonly PATH = '/api/residential';

/**
 * Esta función de TypeScript guarda de forma asincrónica datos residenciales en una base de datos y
 * devuelve un objeto de respuesta.
 * @param {IResidential} _body - El parámetro `_body` en la función `get` es de tipo `IResidential`,
 * que probablemente sea una interfaz o tipo que define la estructura de datos esperada para
 * propiedades residenciales. Se utiliza como datos que se establecerán en la base de datos.
 * @returns El método `get` devuelve una Promesa que se resuelve en un objeto `IResponse`. El objeto
 * `IResponse` contiene un código de estado y datos.
 */
    async get(_body: IResidential ): Promise<IResponse> {
        try{
            const resp = await this.database.set( DATABASE.residential , _body );
            return { ...RESPONSE_OBJECT[200] , data: resp }
        } catch ( _err ) {
            return Promise.resolve({ ...RESPONSE_OBJECT[500] , data: _err });
        }
    }
}
