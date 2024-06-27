import { ApiMaster } from "../../infraestructure/api.master";
import { IRequestFileData, IVoucher } from "../../models/i.pay";
import { IResponse } from "../../models/i.response";
import { DATABASE, RESPONSE_OBJECT } from "../../utilities/constants";

export class UploadVoucherController extends ApiMaster<IRequestFileData>{

    readonly METHOD = 'POST';
    readonly PATH = '/api/voucher';

    async get(body: IRequestFileData): Promise<IResponse> {
        body.date = new Date();
        if (body.voucher.size === 0 ){
            return { ...RESPONSE_OBJECT[200], data: {status: 100 , message : 'Se debe adjuntar un archivo'} };
        }
        const routeSaveVoucher = `vouchers/${body.idResidentials}/${body.email}/${body.date.getTime()}.${body.voucher.name.split('.').pop()}`;
        const response = await this.storage.uploadFile(body.voucher.data, body.voucher.mimetype, routeSaveVoucher);
        const _body: IVoucher = {
            idResidentials: body.idResidentials,
            email: body.email,
            date: new Date(body.date),
            verify: false,
            url: response
        };
        await this.database.set<IVoucher>( DATABASE.voucher , _body );
        return { ...RESPONSE_OBJECT[200] , data: {status: 200 , message : 'Voucher subido correctamente'} };
    }

}   