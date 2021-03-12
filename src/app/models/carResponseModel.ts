import { Car } from "./car";
import { ResponseModel } from "./responseModel";

export interface RentalResponseModel extends ResponseModel{
    data:Car[]
}