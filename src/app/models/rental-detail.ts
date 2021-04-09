import { Rental } from "./rental";

export interface RentalDetail extends Rental{
    id:number;
    brandName:string;
    customerFirstName:string;
    customerLastName:string;
}