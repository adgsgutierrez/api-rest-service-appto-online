import { IResidential } from "./i.residential";
import { IBasicDataUser } from "./i.user";

export interface IParkingReserve {
    type: 'M' | 'C';
    plate: string;
    dateInitial: Date;
    dateEnd: Date;
    user: IBasicDataUser;
    idResidential: string | IResidential;
}