import { IRequestCreateLocations, IResidentialLocation } from "../../models/i.locations";
import { IResponse } from "../../models/i.response";
import { DATABASE, RESPONSE_OBJECT } from "../../utilities/constants";
import { ApiMaster } from "../api.master";

export class CreateLocationsController extends ApiMaster<IRequestCreateLocations> {

    readonly METHOD = 'POST';
    readonly PATH = '/api/location';

/**
 * La función recupera de forma asincrónica una ubicación residencial de una base de datos, la
 * actualiza con una nueva ubicación y devuelve los datos de ubicación actualizados.
 * @param {IRequestCreateLocations} _body - El parámetro `_body` en la función `get` representa el
 * objeto del cuerpo de la solicitud de tipo `IRequestCreateLocations`. Probablemente contenga
 * información necesaria para recuperar y actualizar datos de ubicación residencial en la base de
 * datos.
 * @returns El método `get` devuelve una Promesa que se resuelve en un objeto con un código de estado
 * de 200 y una propiedad `data` que contiene la lista actualizada de ubicaciones para la propiedad
 * residencial especificada en la entrada `_body`.
 */
    async get(_body: IRequestCreateLocations): Promise<IResponse> {
        const response = await this.database.getWithId<IResidentialLocation>( DATABASE.residential, _body.idResidential);
        if( !response.hasOwnProperty('location')){
            response['location'] = [];
        }
        response.location.push(_body.location);
        await this.database.setWithId(DATABASE.residential , _body.idResidential , response );
        return { ...RESPONSE_OBJECT[200] ,  data: response.location };
    }

}