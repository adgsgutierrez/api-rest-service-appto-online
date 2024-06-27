import { ApiMaster } from "../../infraestructure/api.master";
import { INotification } from "../../models/i.notification";
import { DATABASE, RESPONSE_OBJECT } from "../../utilities/constants";
import { IResponse } from "../../models/i.response";

export class CreateNotificationController extends ApiMaster<INotification> {

    readonly METHOD = 'POST';
    readonly PATH = '/api/notification/:idResidential';

    async get(_body: INotification): Promise<IResponse> {
        if (!_body.file) {
            return { ...RESPONSE_OBJECT[200], data: { status: 100, message: 'Se debe adjuntar un archivo' } };
        }
        if (_body.file.size === 0) {
            return { ...RESPONSE_OBJECT[200], data: { status: 100, message: 'Se debe adjuntar un archivo' } };
        }
        if (_body.file.name.split('.').pop() !== 'pdf') {
            return { ...RESPONSE_OBJECT[200], data: { status: 100, message: 'Se debe adjuntar un archivo un archivo pdf' } };
        }
        const date = new Date();
        const routeSaveNotification = `notification/${_body.idResidential}/${date.getTime()}.${_body.file.name.split('.').pop()}`;
        const response = await this.storage.uploadFile(_body.file.data, _body.file.mimetype, routeSaveNotification);
        const _bodyNotification: Partial<INotification> = {
            name: _body.name,
            active: true,
            idResidential: _body.idResidential,
            url: response,
            dateUpload: date
        };
        await this.database.set<INotification>(DATABASE.notification, _bodyNotification as INotification);
        return { ...RESPONSE_OBJECT[200] };
    }
}