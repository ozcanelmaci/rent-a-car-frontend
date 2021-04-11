import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  carUpdateForm : FormGroup;
  brandUpdateForm : FormGroup;
  colorUpdateForm : FormGroup;

  car:Car;
  brand:Brand;
  color:Color;

  controllerForCar:String = ""
  controllerForBrand:String = ""
  controllerForColor:String = ""

  constructor(
    private formBuilder: FormBuilder,
    private carService: CarService,
    private brandService: BrandService,
    private colorService: ColorService,
    private toastrService: ToastrService,
    private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.assignExistedValues();
  }

  createCarUpdateForm() {
    this.carUpdateForm = this.formBuilder.group({
      id: [this.car.id, Validators.required],
      brandId: [this.car.brandId, Validators.required],
      colorId: [this.car.colorId, Validators.required],
      modelYear: [this.car.modelYear, Validators.required],
      dailyPrice: [this.car.dailyPrice, Validators.required],
      description: [this.car.description, Validators.required],
    });
  }

  createBrandUpdateForm() {
    this.carUpdateForm = this.formBuilder.group({
      id: [this.brand.id, Validators.required],
      brandName: [this.brand.name, Validators.required]
    });
  }

  createColorUpdateForm() {
    this.carUpdateForm = this.formBuilder.group({
      id: [this.color.id, Validators.required],
      colorName: [this.color.name, Validators.required]
    });
  }

  assignExistedValues(){
    this.activatedRoute.params.subscribe(params=>{
      if(params["carId"]){
        this.getCarToBeUpdated(params["carId"])
      }
      else if(params["brandId"]){
        this.getBrandToBeUpdated(params["brandId"])
      }
      else if(params["colorId"]){
        this.getColorToBeUpdated(params["colorId"])
      }
      
    })
  }

  getCarToBeUpdated(id:number){
    this.carService.getCarById(id).subscribe(response => {this.car = response.data
      this.createCarUpdateForm();
      this.controllerForCar = "true";
      console.log(this.car.description)})
  }

  getBrandToBeUpdated(id:number){
    this.brandService.getBrandById(id).subscribe(response => {this.brand = response.data
      this.createBrandUpdateForm();
      this.controllerForBrand = "true";
      console.log(this.brand.name)})
  }

  getColorToBeUpdated(id:number){
    this.colorService.getColorById(id).subscribe(response => {this.color = response.data
      this.createColorUpdateForm();
      this.controllerForColor = "true";
      console.log(this.color.name)})
  }

  updateCar() {
    if (this.carUpdateForm.valid) {
      let carModel = Object.assign({}, this.carUpdateForm.value);
      this.carService.update(carModel).subscribe(
        (response) => {
          console.log(response);
          this.toastrService.success(response.message, 'Başarılı');
        },
        (responseError) => {
          if (responseError.error.Errors.length > 0) {
            for (let i = 0; i < responseError.error.Errors.length; i++) {
              this.toastrService.error(
                responseError.error.Errors[i].ErrorMessage,
                'Doğrulama hatası'
              );
            }
          }
        }
      );
    } else {
      this.toastrService.error('Formunuz eksik', 'Dikkat!!!');
    }
  }

  updateBrand() {
    if (this.brandUpdateForm.valid) {
      let brandModel = Object.assign({}, this.brandUpdateForm.value);
      this.brandService.update(brandModel).subscribe(
        (response) => {
          console.log(response);
          this.toastrService.success(response.message, 'Başarılı');
        },
        (responseError) => {
          if (responseError.error.Errors.length > 0) {
            for (let i = 0; i < responseError.error.Errors.length; i++) {
              this.toastrService.error(
                responseError.error.Errors[i].ErrorMessage,
                'Doğrulama hatası'
              );
            }
          }
        }
      );
    } else {
      this.toastrService.error('Formunuz eksik', 'Dikkat!!!');
    }
  }

  updateColor() {
    if (this.colorUpdateForm.valid) {
      let colorModel = Object.assign({}, this.colorUpdateForm.value);
      this.colorService.update(colorModel).subscribe(
        (response) => {
          console.log(response);
          this.toastrService.success(response.message, 'Başarılı');
        },
        (responseError) => {
          if (responseError.error.Errors.length > 0) {
            for (let i = 0; i < responseError.error.Errors.length; i++) {
              this.toastrService.error(
                responseError.error.Errors[i].ErrorMessage,
                'Doğrulama hatası'
              );
            }
          }
        }
      );
    } else {
      this.toastrService.error('Formunuz eksik', 'Dikkat!!!');
    }
  }
}