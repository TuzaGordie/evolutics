import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'truncateTo',
})
export class TruncateToPipe implements PipeTransform{
    transform(word: string, chars: number) {
        const ellipses = word?.length > chars ? '...' : '';
        return word?.substring(0, chars) + ellipses
    }
}