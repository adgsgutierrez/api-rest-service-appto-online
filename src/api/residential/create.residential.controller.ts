import { IResidential } from "../../models/i.residential";
import { IResponse } from "../../models/i.response";
import { DATABASE, RESPONSE_OBJECT } from "../../utilities/constants";
import { ApiMaster } from "../api.master";

export class CreateResidentialController extends ApiMaster<IResidential> {

    readonly METHOD = 'POST';
    readonly PATH = '/api/residential';

    async get(_body: IResidential ): Promise<IResponse> {
        try{
            const resp = await this.database.set( DATABASE.residential , _body );
            return { ...RESPONSE_OBJECT[200] , data: resp }
        } catch ( _err ) {
            return Promise.resolve({ ...RESPONSE_OBJECT[500] , data: _err });
        }
    }
}
