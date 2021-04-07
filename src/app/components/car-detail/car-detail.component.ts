import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { Rental } from 'src/app/models/rental';
import { CarDetailService } from 'src/app/services/car-detail.service';
import { RentalService } from 'src/app/services/rental.service';
import {FormGroup, FormControl} from '@angular/forms';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {
  cars: Car[] = [];
  carImages: CarImage[] = [];
  flag:boolean;
  rentals: Rental[] = [];
  selectedRentDate:Date;
  selectedReturnDate:Date;
  controller:string = "";


  range = new FormGroup({
  start: new FormControl(),
  end: new FormControl()
  });

  constructor(private carDetailService : CarDetailService, private activatedRoute:ActivatedRoute,
    private toastrService:ToastrService, private rentalService:RentalService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["carId"]){
        this.getCarDetailsByCarId(params["carId"])
        this.getCarImagesByCarId(params["carId"])
        this.getRentalsByCarId(params["carId"])
        //this.isSelectedAndValidOrNot(params["carId"])
      }
    })
  }

  isSelectedAndValidOrNot(carId:number){
    this.flag = true;
    this.controller = "";
    let selectedDates = Object.assign({},this.range.value);
    let rentDate = selectedDates.start;
    let returnDate = selectedDates.end;

    // this.selectedRentDate = selectedDates.start;
    // this.selectedReturnDate = selectedDates.end;
    console.log(rentDate);
    console.log(returnDate);

    if(rentDate == null){
      this.toastrService.error("Eksik bilgi","Kiralama başlangıç tarihi seçmediniz");
      this.flag = false;
    }
    if(returnDate == null){
      this.toastrService.error("Eksik bilgi","Kiralama bitiş tarihi seçmediniz");
      this.flag = false;
    }
    if(this.flag){
      this.selectedRentDate = selectedDates.start;
      this.selectedReturnDate = selectedDates.end;
      this.flag = this.dateIsValidOrNot(carId);
    }
  }

  dateIsValidOrNot(carId:number){
    console.log(this.rentals)
    console.log(this.rentals.length);

    for (let index = 0; index < this.rentals.length; index++) {
      console.log("loop a girdi");
      
      const rent = this.rentals[index];
      if(rent.returnDate == null){
        this.toastrService.info("Araç başka bir müşteri tarafından kullanımda!!!");
        return false;
      }
      else if(this.selectedRentDate.getTime() < this.parseDate(rent.returnDate).getTime()){
        this.toastrService.info("Bu aracı " + this.parseDate(rent.returnDate) + " tarihinden itibaren kiralayabilirsiniz!!!");
        return false;
      }
      else if(this.selectedReturnDate <= this.selectedRentDate){
        this.toastrService.error("Kiralama bitiş tarihi, başlangıç tarihinden önce veya aynı olamaz!!!");
        return false;
      }
    }
    this.toastrService.success("Ödeme sayfasına gitmek için 'Ödeme Yap' butonuna basınız!!!");
    this.controller = "true";
    return true;
  }
  parseDate(input:any) {
    var parts = input.match(/(\d+)/g);
    // new Date(year, month [, date [, hours[, minutes[, seconds[, ms]]]]])
    return new Date(parts[0], parts[1]-1, parts[2]); // months are 0-based
  }

  getCarDetailsByCarId(carId:number){
    this.carDetailService.getCarDetailsByCarId(carId).subscribe(response => {this.cars = response.data})
  }

  getCarImagesByCarId(carId:number){
    this.carDetailService.getCarImagesByCarId(carId).subscribe(response => {this.carImages = response.data})
  }

  getRentalsByCarId(carId:number){
    this.rentalService.getRentalsByCarId(carId).subscribe(response => {this.rentals = response.data
      console.log(response.data)
      console.log(this.rentals)})
  }
}
