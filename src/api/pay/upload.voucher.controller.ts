import { ApiMaster } from "../../infraestructure/api.master";
import { IRequestFileData } from "../../models/i.pay";
import { IResponse } from "../../models/i.response";
import { RESPONSE_OBJECT } from "../../utilities/constants";

export class UploadVoucherController extends ApiMaster<IRequestFileData>{

    readonly METHOD = 'Post';
    readonly PATH = '/api/voucher';

    async get(body: IRequestFileData): Promise<IResponse> {
        console.log(body);
        return { ...RESPONSE_OBJECT[200] };
    }

}