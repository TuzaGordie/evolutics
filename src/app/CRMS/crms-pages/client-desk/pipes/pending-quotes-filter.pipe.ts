import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'pendingQuotesFilter'
})
export class PendingQuotesFilterPipe implements PipeTransform{
    transform(arr: any[], busLine: string){
        return arr?.filter(item => item.busLine === busLine)
    }
}