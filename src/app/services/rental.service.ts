import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';
import { RentalDetail } from '../models/rental-detail';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class RentalService {
  apiUrl = 'https://localhost:44377/api/';
  currentRental:Rental;
  
  constructor(private httpClient: HttpClient) { }

  getRentals():Observable<ListResponseModel<RentalDetail>> {
    let newPath = this.apiUrl + "rentals/GetRentalDetails"
    return this.httpClient.get<ListResponseModel<RentalDetail>>(newPath);
  }

  getRentalsByCarId(carId:number):Observable<ListResponseModel<Rental>> {
    let newPath = this.apiUrl + "rentals/GetByCarId?carId=" + carId;
    return this.httpClient.get<ListResponseModel<Rental>>(newPath);
  }

  setCurrentRental(rental:Rental){
    this.currentRental = rental;
    console.log(this.currentRental);
  }

  getCurrentRental(){
    return this.currentRental;
  }

  add(rental:Rental):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + "rentals",rental)
  }
}
