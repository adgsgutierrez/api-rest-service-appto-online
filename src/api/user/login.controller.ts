import { IResponse } from "../../models/i.response";
import { RESPONSE_OBJECT } from "../../utilities/constants";
import { ApiMaster } from "../api.master";

export class LoginController extends ApiMaster {

    readonly METHOD = 'POST';
    readonly PATH = '/api/user/login';

    async get(body: { [key: string]: any; }): Promise<IResponse> {
        return Promise.resolve({ ...RESPONSE_OBJECT[200] })
    }
    
}