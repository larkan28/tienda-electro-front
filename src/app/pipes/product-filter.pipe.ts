import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'productFilter',
  standalone: true
})
export class ProductFilterPipe implements PipeTransform {

  transform(products: any[], filters: any[]): any[] {
    if (!products || !filters)
      return products;
    
    return products.filter(p => {
      for (const item of filters) {
        var value = item.value;

        if (!value || !p[item.property])
          continue;

        var result = true;

        switch (item.operation) {
          case '>=': result = (p[item.property] >= value); break;
          case '<=': result = (p[item.property] <= value); break;
          default: result = (p[item.property] == value); break;
        }

        if (!result)
          return false;
      }

      return true;
    });
  }
}
