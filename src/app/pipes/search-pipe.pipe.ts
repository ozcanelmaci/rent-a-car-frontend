import { Pipe, PipeTransform } from '@angular/core';
import { CarDetail } from '../models/car-detail';

@Pipe({
  name: 'searchPipe'
})
export class SearchPipePipe implements PipeTransform {

  transform(value: CarDetail[], searchText: string): CarDetail[] {
    searchText = searchText? searchText.toLocaleLowerCase() : ""
    return searchText?value.filter((p:CarDetail)=>p.brandName.toLocaleLowerCase().indexOf(searchText)!==-1):value;
  }

}
