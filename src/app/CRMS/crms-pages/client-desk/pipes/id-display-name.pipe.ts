import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "idDisplayName"
})
export class IdDisplayNamePipe implements PipeTransform{

  transform(idType: string): string{
    switch(idType){
      case "D": return "Driver's License";
      case "I": return "International Passport";
      case "E": return "Employer";
      case "N": return "National ID";
      default: return idType;
    }
  }
}