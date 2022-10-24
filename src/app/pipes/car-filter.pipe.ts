import { Pipe, PipeTransform } from '@angular/core';
import { Car } from 'src/models/CarModel/car';

@Pipe({
  name: 'carFilter'
})
export class CarFilterPipe implements PipeTransform {

  transform(value: any[], filterText:string): any[] {
    filterText =filterText ? filterText.toLocaleLowerCase():"";
    if(!filterText) return value;

    return value.filter(c=>{
      return Object.keys(c).some(key=>{
        return String(c[key]).toLocaleLowerCase().includes(filterText.toLocaleLowerCase());
      });
    });
  }

}
