import { Injectable } from '@angular/core';

@Injectable()
export class ClientHelpersService {
  TITLES = [
    "Mr.", "Mrs.", "Miss", "Dr.", "Prof.", "Chief", "Lolo",
  ]
  
  RELATIONSHIP_TYPES = [
    {
      code : "BR",
      description: "Brother",
    },
    {
      code: "SI",
      description: "Sister",
    },
    {
      code: "FA",
      description: "Father", 
    },
    {
      code: "MO",
      description: "Mother", 
    },
    {
      code: "SO",
      description: "Son",
    },
    {
      code: "DA",
      description: "Daughter",
    },
    {
      code: "RE",
      description: "Relation",
    },
    {
      code: "FR",
      description: "Friend",
    }
  ]
  
  constructor() { }
  
  getIdType(text: string){
    if (text.toLowerCase().includes('driver')) return 'D';
    if (text.toLowerCase().includes('international')) return 'I';
    if (text.toLowerCase().includes('employer')) return 'E';
    if (text.toLowerCase().includes('national')) return 'N';
    return text; // default case
  }

  stripTime(dateString: string): string {
    return dateString.split('T')[0]
  }
}
