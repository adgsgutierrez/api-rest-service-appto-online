import { ILoadReserva, IReserveRequest } from "../../models/i.locations";
import { IResponse } from "../../models/i.response";
import { DATABASE, RESPONSE_OBJECT } from "../../utilities/constants";
import { ApiMaster } from "../api.master";

export class CreateReserveLocationController extends ApiMaster<IReserveRequest>{

    readonly METHOD = 'POST';
    readonly PATH = '/api/location/reserve';

/**
 * La función "get" establece de forma asincrónica una solicitud de reserva en la base de datos y
 * devuelve un objeto de respuesta con un código de estado de 200.
 * @param {IReserveRequest} body - El parámetro `body` en el método `get` es de tipo `IReserveRequest`,
 * que es el objeto del cuerpo de la solicitud que contiene datos relacionados con una reserva.
 * @returns Se devuelve un objeto de respuesta con un código de estado de 200.
 */
    async get(body: IReserveRequest): Promise<IResponse> {
        const load: ILoadReserva = body as ILoadReserva;
        load.aprobe = false;
        load.userAprobe = '';
        await this.database.set(DATABASE.reserve , load);
        return { ...RESPONSE_OBJECT[200] }
    }

}