import { Pipe, PipeTransform } from '@angular/core';

// @Pipe({ name: 'filesize' })
// export class FileSizePipe implements PipeTransform {
//   transform(size: number, extension: string = 'MB') {
//     return (size / (1024 * 1024)).toFixed(2) + extension;
//   }
// }

@Pipe({ name: 'availability' })
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
