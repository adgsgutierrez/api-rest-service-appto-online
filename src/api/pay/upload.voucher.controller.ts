import { ApiMaster } from "../../infraestructure/api.master";
import { IRequestFileData } from "../../models/i.pay";
import { IResponse } from "../../models/i.response";
import { RESPONSE_OBJECT } from "../../utilities/constants";

export class UploadVoucherController extends ApiMaster<IRequestFileData>{

    readonly METHOD = 'POST';
    readonly PATH = '/api/voucher';

    async get(body: IRequestFileData): Promise<IResponse> {
        if (body.voucher.size === 0 ){
            return { ...RESPONSE_OBJECT[200], data: {status: 100 , message : 'Se debe adjuntar un archivo'} };
        }
        
        return { ...RESPONSE_OBJECT[200] };
    }

}