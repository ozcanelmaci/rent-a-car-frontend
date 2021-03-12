import { Customer } from "./customer";
import { ResponseModel } from "./responseModel";

export interface RentalResponseModel extends ResponseModel{
    data:Customer[]
}