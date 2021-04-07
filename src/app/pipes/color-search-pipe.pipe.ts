import { Pipe, PipeTransform } from '@angular/core';
import { Color } from '../models/color';

@Pipe({
  name: 'colorSearchPipe'
})
export class ColorSearchPipePipe implements PipeTransform {

  transform(value: Color[], searchText: string): Color[] {
    searchText = searchText? searchText.toLocaleLowerCase() : ""
    return searchText?value.filter((p:Color)=>p.name.toLocaleLowerCase().indexOf(searchText)!==-1):value;
  }

}
