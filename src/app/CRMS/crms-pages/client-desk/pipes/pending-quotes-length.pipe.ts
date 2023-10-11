import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'pendingQuotesLength'
})
export class PendingQuotesLengthPipe implements PipeTransform{
    transform(arr: any[], busLine: string){
        return arr?.filter(item => item.busLine === busLine)?.length
    }
}