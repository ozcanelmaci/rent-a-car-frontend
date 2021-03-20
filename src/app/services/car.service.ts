import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  apiUrl = 'https://localhost:44377/api/';
  
  constructor(private httpClient: HttpClient) { }

  getCars():Observable<ListResponseModel<Car>> {
    let newPath = this.apiUrl + "cars/getcardetails"
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsByBrandId(brandId:number):Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl +"cars/getcardetailsbybrandid?id="+brandId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath)
  }

  getCarsByCarId(carId:number):Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl +"cars/getcardetailsbycarid?id="+carId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath)
  }

  getCarsByColor(colorId:number):Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + "cars/getcardetailsbycolorid?id="+colorId
    return this.httpClient.get<ListResponseModel<Car>>(newPath)
  }
}
