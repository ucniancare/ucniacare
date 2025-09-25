import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'truncate'
})
export class TruncatePipe implements PipeTransform {
    transform(value: string, limit = 110, trail = '...'): string {
        if (!value) return '';
      
        if (value.length > limit) {
            let truncated = value.substring(0, limit);      
            truncated = truncated.trimEnd();
            return truncated + trail;
        }
      
        return value;
    }
}
