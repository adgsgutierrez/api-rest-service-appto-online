import { ApiMaster } from "../../infraestructure/api.master";
import { IRequestLocations } from "../../models/i.locations";
import { DATABASE, RESPONSE_OBJECT } from "../../utilities/constants";
import { IResponse } from "../../models/i.response";
import { INotification } from "../../models/i.notification";
import { IQueryOptions } from "../../models/i.database";

export class LisNotificationController extends ApiMaster<IRequestLocations> {

    readonly METHOD = 'GET';
    readonly PATH = '/api/notification/:idResidential';

/**
 * La función recupera ubicaciones residenciales de una base de datos basada en una identificación
 * determinada y devuelve solo las ubicaciones activas.
 * @param {IRequestLocations} _body - El parámetro `_body` en la función `get` representa el objeto del
 * cuerpo de la solicitud de tipo `IRequestLocations`. Probablemente contenga información necesaria
 * para recuperar una ubicación residencial específica de la base de datos, como la propiedad
 * "idResidential" utilizada para identificar la ubicación a recuperar.
 * @returns una Promesa que se resuelve en un objeto con un código de estado de 200 y una propiedad de
 * datos. La propiedad de datos contiene una serie de ubicaciones residenciales que tienen la propiedad
 * "activa" establecida en verdadero.
 */
    async get(_body: IRequestLocations): Promise<IResponse> {
        const queries: IQueryOptions[] = [];
        queries.push({ key: 'idResidential', compare: '==', value: _body.idResidential });
        queries.push({ key: 'active', compare: '==', value: true });
        const listNotifications: INotification[] = await this.database.search( DATABASE.notification , queries);
        return { ...RESPONSE_OBJECT[200] , data: listNotifications };
    }

}