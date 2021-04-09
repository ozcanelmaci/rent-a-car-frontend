import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Rental } from 'src/app/models/rental';
import { CarDetailService } from 'src/app/services/car-detail.service';
import { PaymentService } from 'src/app/services/payment.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  paymentForm : FormGroup;
  rental:Rental;
  cost:number;

  constructor(private formBuilder:FormBuilder, private paymentService:PaymentService, private toastrService:ToastrService
    ,private rentalService:RentalService, private carDetailService:CarDetailService) { }

  ngOnInit(): void {
    this.createPaymentForm();
    this.rental = this.rentalService.getCurrentRental();
    this.calculateCost();
  }

  createPaymentForm(){
      this.paymentForm = this.formBuilder.group({
        customerName:["",Validators.required],
        cardNumber:["",Validators.required],
        expDate:["",Validators.required],
        cvv:["",Validators.required],
        nameOnTheCard:["",Validators.required]
      })
  }

  add(){
    // //if(validate()) yapıcam sonra
    // if(this.paymentForm.valid){
    //   let paymentModel = Object.assign({},this.paymentForm.value) 
    //   this.paymentService.add().subscribe(response=>{
    //     console.log(response)
    //     this.toastrService.success(response.message,"Başarılı")
    //   },responseError=>{
    //     if(responseError.error.Errors.length>0){
    //       for (let i = 0; i < responseError.error.Errors.length; i++) {
    //         this.toastrService.error(responseError.error.Errors[i].ErrorMessage,"Doğrulama hatası")
    //       }
    //     }
    //   })
    // }else{
    //   this.toastrService.error("Formunuz eksik","Dikkat!!!")
    // }
    //yardımcı kodlar for controlling the card
    // let paymentModel = Object.assign({},this.paymentForm.value)
    // console.log(paymentModel.expDate.substring(0,2))
    // console.log(parseInt(paymentModel.expDate,10))
    
    this.rentalService.add(this.rental).subscribe(response=>{
      console.log(response)
      this.toastrService.success(response.message,"Başarılı")
    })
    
  }

  //validate()fonksiyonu yaparım buraya 

  calculateCost(){
    console.log(this.rental);
    let numberOfDay = (this.rental.returnDate.getTime() - this.rental.rentDate.getTime() ) / (1000*60*60*24);
    let carId = this.rental.carId;
    let dailyPrice : number;
    this.carDetailService.getCarDetailsByCarId(carId).subscribe(response => {dailyPrice = response.data[0].dailyPrice
      this.cost = numberOfDay * dailyPrice;
      console.log(dailyPrice);
      console.log(numberOfDay);
      console.log(this.cost);
    });
  }
}
