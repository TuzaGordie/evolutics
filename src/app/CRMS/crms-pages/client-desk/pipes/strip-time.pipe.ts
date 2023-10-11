import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'stripTime'
})
export class StripTimePipe implements PipeTransform{
  
  transform(dateString: string): string {
    return dateString ? dateString.split('T')[0] : "";
  } 
}