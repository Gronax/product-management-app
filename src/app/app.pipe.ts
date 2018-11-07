import {
  Pipe,
  PipeTransform
} from '@angular/core';

// @Pipe({ name: 'filesize' })
// export class FileSizePipe implements PipeTransform {
//   transform(size: number, extension: string = 'MB') {
//     return (size / (1024 * 1024)).toFixed(2) + extension;
//   }
// }

@Pipe({
  name: 'availability'
})
export class AvailabilityPipe implements PipeTransform {
  transform(value: boolean) {
    let result: string;
    switch (value) {
      case true:
        result = 'Available';
        break;
      case false:
        result = 'Not Available';
        break;
      default:
        result = '[Unknown]';
        break;
    }
    return result;
  }
}

@Pipe({
  name: 'category'
})
export class CategoryPipe implements PipeTransform {
  transform(value: string) {
    let result: string;
    switch (value) {
      case '100001':
        result = 'Coffee';
        break;
      case '100002':
        result = 'Beverages';
        break;
      case '100003':
        result = 'Vegetables';
        break;
      case '100004':
        result = 'Fruits';
        break;
      case '100005':
        result = 'Dairy';
        break;
      case '100006':
        result = 'Bakery';
        break;
      default:
        result = '[Unknown]';
        break;
    }
    return result;
  }
}
