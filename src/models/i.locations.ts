import { IResidentials } from "./i.residential";
import { IBasicDataUser } from "./i.user";

export interface IRequestLocations {
    idResidential: string;
}

export interface ILocations {
    name: string;
    open: Date;
    close: Date;
    days: string[];
    active: boolean;
    timeForLocation: number;
}

export interface IRequestCreateLocations extends IRequestLocations{
    location : ILocations;
}

export interface IResidentialLocation extends IResidentials{
    location : ILocations[];
}

export interface IReserveRequest extends IRequestLocations {
    location:{
        name: string;
        occasion: string;
        start: Date;
        end: Date;
    };
    user: IBasicDataUser
}

export interface ILoadReserva extends IReserveRequest {
    aprobe: boolean;
    dateAprobe: Date;
    userAprobe: string;
}

export interface IMeReserve extends IRequestLocations , IBasicDataUser {}