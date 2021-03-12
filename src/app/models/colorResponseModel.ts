import { Color } from "./color";
import { ResponseModel } from "./responseModel";

export interface RentalResponseModel extends ResponseModel{
    data:Color[]
}