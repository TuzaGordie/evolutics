import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'stripTime'
})
export class StripTimePipe implements PipeTransform{
    transform(value: string): string {
        return value?.split('T')[0]
    }
}