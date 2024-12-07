import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'status'
})
export class StatusPipe implements PipeTransform {
  transform(value: string): string {
    switch(value) {
      case 'Pending':
        return 'รอดำเนินการ';
      case 'Confirmed':
        return 'ยืนยันแล้ว';
      case 'Cancelled':
        return 'ยกเลิก';
      default:
        return value;
    }
  }
}