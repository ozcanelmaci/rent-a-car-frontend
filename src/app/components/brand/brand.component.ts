import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {
  brands: Brand[] = [];
  currentBrand:Brand;
  searchBrandName="";
  selectedBrandId:number;

  constructor(private brandService:BrandService) {}

  ngOnInit(): void {
    this.getBrands();
    this.selectedBrandId = 1;
  }

  getBrands() {
    this.brandService.getBrands().subscribe(response=>{
      this.brands = response.data
    })
  }

  setCurrentBrand(brand:Brand){
    this.currentBrand = brand;
  }

  setCurrentBrandId(brandId:number){
    this.selectedBrandId = brandId;
  }

  getCurrentBrandClass(brandId:number){
    if(brandId == this.selectedBrandId){
      return "list-group-item active"
    }else{
      return "list-group-item"
    }
  }
}
