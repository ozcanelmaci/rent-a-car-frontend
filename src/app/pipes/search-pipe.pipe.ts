import { Pipe, PipeTransform } from '@angular/core';
import { Car } from '../models/car';

@Pipe({
  name: 'searchPipe'
})
export class SearchPipePipe implements PipeTransform {

  transform(value: Car[], searchText: string): Car[] {
    searchText = searchText? searchText.toLocaleLowerCase() : ""
    return searchText?value.filter((p:Car)=>p.brandName.toLocaleLowerCase().indexOf(searchText)!==-1):value;
  }

}
