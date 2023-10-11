import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelpersService {

  constructor() { }

  getStatusColour(workflowStatus: string){
    switch(workflowStatus){
      case "Active": return "red";
      case "Terminated": return "red";
      case "Closed": return "green";
      default: return "gray"
    }
  }
  getSLALevelColour(slaLevel: string){
    switch(slaLevel){
      case "Y": return "yellow";
      case "G": return "green";
      case "B": return "black";
      case "R": return "red";
      default: return "gray"
    }
  }
}
