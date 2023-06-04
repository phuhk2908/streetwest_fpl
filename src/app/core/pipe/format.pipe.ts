import { Pipe, PipeTransform } from "@angular/core";
@Pipe({ name: 'vnd' })
export class VndPipe implements PipeTransform {
    transform(value: any, ...args: any[]) {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value)
    }
}