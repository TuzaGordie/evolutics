import { Pipe, PipeTransform } from "@angular/core";
import { ITiming } from "./workflow.interface";


@Pipe({
    name: 'timing'
})
export class TimingPipe implements PipeTransform {
    transform(value: ITiming) {
        if(!value){return ''}
        const time  = `${value.hour}:${value.minute}:${value.second}`
        const date = `${value.dayOfMonth}-${value.monthValue}-${value.year}`
        return `${time} ${date}` ;
    }

}