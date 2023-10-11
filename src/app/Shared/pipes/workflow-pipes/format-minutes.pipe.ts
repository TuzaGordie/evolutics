import { Pipe, PipeTransform } from '@angular/core';

// pipe to convert minutes into readable string of days hours and mins
@Pipe({
    name: 'formatMinutes'
})
export class FormatMinutesPipe implements PipeTransform{
    transform(minutes: number): string {
        const mins = minutes % 60;
        const hourDays = Math.floor(minutes / 60);
        const hours = hourDays % 24;
        const days = Math.floor(hourDays / 24)

        const daysLabel = `day${days != 1 ? 's' : ''}`;
        const hoursLabel = `hour${hours != 1 ? 's' : ''}`;
        const minsLabel = `min${mins != 1 ? 's' : ''}`;

        let result = days ? `${days} ${daysLabel}, ` : '';
        result += hours ? `${hours} ${hoursLabel}, ` : '';
        
        return `${result}${mins} ${minsLabel}`;
    }
}