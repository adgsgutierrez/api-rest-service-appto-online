export interface IResidential {
    address: string;
    name: string;
    lat: number;
    long: number;
    nameAdministrator: string;
    email: string;
    phone: string;
    localPhone: string;
}

export interface IResidentials extends IResidential {
    id: string;
}