import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'slaLevelColour'
})
export class SlaLevelColourPipe implements PipeTransform{
    transform(slaLevel: string): string {
        switch(slaLevel){
            case 'G': return 'green';
            case 'R': return 'red';
            case 'B': return 'black';
            case 'Y': return 'yellow';
            default: return '';
        }
    }
}