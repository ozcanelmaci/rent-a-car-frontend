import { Component, OnInit } from '@angular/core';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css']
})
export class ColorComponent implements OnInit {
  colors: Color[] = [];
  currentColor:Color;
  searchColorName="";
  selectedColorId:number;
  
  constructor(private colorService:ColorService) {}

  ngOnInit(): void {
    this.getColors();
    this.selectedColorId = 1;
  }

  getColors() {
    this.colorService.getColors().subscribe(response=>{
      this.colors = response.data
    })
  }

  setCurrentColor(color:Color){
    this.currentColor = color
  }

  getCurrentColorClass(colorId:number){
    if(colorId == this.selectedColorId){
      return "list-group-item active"
    }else{
      return "list-group-item"
    }
  }
}
