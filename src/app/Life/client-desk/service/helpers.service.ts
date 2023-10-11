import { Injectable } from '@angular/core';
import { IDocument } from 'src/app/Reusables/reusable-pages/document-list/document.interface';

@Injectable({
  providedIn: 'root',
})
export class HelpersService {
  constructor() {}

  stripTime(dateString: string) {
    return dateString.split('T')[0];
  }

  getAge(dateString: string) {
    if (!dateString) return null;
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  extractPassportURL(documents: IDocument[], baseURL: string) {
    if (Array.isArray(documents)) {
      // find a document whose fileName is a picture (jpeg, jpg, png, gif) && which has a docKey property
      const document = documents.sort2('createdOn',true).reverse().find((doc) => doc.docSubCat == 'PP');
      return document
        ? baseURL + '/' + document.docKey + '/' + document.name
        : '';
    } else {
      return '';
    }
  }

  isPictureFormat(fileName: string) {
    if (!fileName) return false;
    const PICTURE_FORMATS = ['.jpg', '.jpeg', '.png', '.gif'];
    return PICTURE_FORMATS.some((format) => fileName.endsWith(format));
  }

  getStatusColour(status: string) {
    let colour;
    switch (status) {
      case 'A':
        colour = 'success';
        break;
      case 'D':
        colour = 'danger';
        break;
      case 'P':
        colour = 'warning';
        break;
      default:
        colour = 'secondary';
    }

    return colour;
  }

  RELATIONSHIP_TYPES = [
    {
      code: 'BR',
      description: 'Brother',
    },
    {
      code: 'SI',
      description: 'Sister',
    },
    {
      code: 'FA',
      description: 'Father',
    },
    {
      code: 'MO',
      description: 'Mother',
    },
    {
      code: 'SO',
      description: 'Son',
    },
    {
      code: 'DA',
      description: 'Daughter',
    },
    {
      code: 'RE',
      description: 'Relation',
    },
    {
      code: 'FR',
      description: 'Friend',
    },
    {
      code: 'SP',
      description: 'Spouse',
    },
    {
      code: 'CH',
      description: 'Child',
    },
    {
      code: 'SB',
      description: 'Sibling',
    },
    {
      code: 'PA',
      description: 'Parent',
    },
  ];

  TITLES = ['Mr.', 'Mrs.', 'Miss', 'Dr.', 'Prof.', 'Chief', 'Lolo'];

  SOCIAL_MEDIA_PLATFORMS = [
    'FACEBOOK',
    'TWITTER',
    'YOUTUBE',
    'LINKEDIN',
    'WHATSAPP',
    'INSTAGRAM',
  ];

  getIdType(text: string) {
    if (text?.toLowerCase().includes('driver')) return 'D';
    if (text?.toLowerCase().includes('international')) return 'I';
    if (text?.toLowerCase().includes('passport')) return 'I';
    if (text?.toLowerCase().includes('employer')) return 'E';
    if (text?.toLowerCase().includes('national')) return 'N';
    return text; // default case
  }
}
