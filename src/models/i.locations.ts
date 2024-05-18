import { IResidentials } from "./i.residential";

export interface IRequestLocations {
    idResidential: string;
}

export interface ILocations {
    name: string;
    open: Date;
    close: Date;
    days: string[];
    active: boolean;
}

export interface IRequestCreateLocations {
    idResidential: string;
    location : ILocations;
}

export interface IResidentialLocation extends IResidentials{
    location : ILocations[];
}