import { Pipe, PipeTransform } from '@angular/core';
import { Brand } from '../models/brand';

@Pipe({
  name: 'brandSearchPipe'
})
export class BrandSearchPipePipe implements PipeTransform {

  transform(value: Brand[], searchText: string): Brand[] {
    searchText = searchText? searchText.toLocaleLowerCase() : ""
    return searchText?value.filter((p:Brand)=>p.name.toLocaleLowerCase().indexOf(searchText)!==-1):value;
  }

}
