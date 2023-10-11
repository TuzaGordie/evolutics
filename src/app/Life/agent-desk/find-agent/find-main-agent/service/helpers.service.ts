import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelpersService {

  constructor() { }

  getStatusColour(agentStatus: string){
    switch(agentStatus){
      case "A": return "#2ecc71"; //lemon green
      case "I": return "orange";
      case "T": return "red";
      case "R": return "blue";
      case "S": return "black";
      default: return "gray";
    }
  }
}
