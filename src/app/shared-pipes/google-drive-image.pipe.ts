
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'imageSrc'
})
export class ImageSrcPipe implements PipeTransform {
    transform(value: string | null | undefined): string {
        if (!value) {
            return 'assets/default.png'; 
        }
        if (value.startsWith('http')) {
            return value;
        }
        return `https://lh3.googleusercontent.com/d/${value}`; 
    }
}
