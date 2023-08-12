import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterList'
})
export class FilterListPipe implements PipeTransform {

  transform(list: any[], itemId: string): any[] {
    if (!list || !itemId) {
      return list;
    }
    return list.filter(item => {
      if (item && item._id) {
        return item._id === itemId;
      } else if (item && item.id) {
        return item.id === itemId;
      }
      return true; // if neither _id nor id exist on the item, don't filter it out
    });
  }
}
