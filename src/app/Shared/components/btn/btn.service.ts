import { Injectable } from '@angular/core';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import {
  faArrowLeft,
  faArrowRight,
  faCheck,
  faClone,
  faCogs,
  faDownload,
  faEdit,
  faEye,
  faFile,
  faFileExport,
  faFileImport,
  faHistory,
  faListAlt,
  faLock,
  faMoneyCheck,
  faPen,
  faPenFancy,
  faPlus,
  faRecycle,
  faSave,
  faSearch,
  faSlidersH,
  faTrash,
  faUnlock,faFilter,
  faUpload,
  faUserShield,
  faHome,
} from '@fortawesome/free-solid-svg-icons';
import { IconType } from '../../models/index.model';

@Injectable({
  providedIn: 'root',
})
export class BtnService {
  constructor() {}
  getIcon = (iconType: IconType) => {
    let icon,iconString,iconPosition= 'left';
    switch (iconType) {
      case 'add':
        icon = faPlus;
        break;
      case 'adjust':
        icon = faSlidersH;
        break;
      case 'cash':
        icon = faMoneyCheck;
        break;
      case 'checked':
        icon = faCheck;
        break;
      case 'checklist':
        icon = faListAlt;
        break;
      case 'clone':
        icon = faClone;
        break;
      case 'close':
        iconString = 'fa fa-close';
        break;
      case 'cogs':
        icon = faCogs;
        break;
      case 'delete':
        icon = faTrash;
        break;
      case 'download':
        icon = faDownload;
        break;
      case 'edit':
        icon = faEdit;
        break;
      case 'export':
        icon = faFileExport;
        break;
      case 'file':
        icon = faFile;
        break;
      case 'filter':
        icon = faFilter;
        break;
      case 'generate':
        icon = faPenFancy;
        break;
      case 'guard' || 'access':
        icon = faUserShield;
        break;
      case 'history':
        icon = faHistory;
        break;
      case 'home':
        icon = faHome;
        break;
      case 'import':
        icon = faFileImport;
        break;
      case 'lock':
        icon = faLock;
        break;
      case 'next':
        icon = faArrowRight;
        iconPosition = 'right';
        break;
      case 'pen':
        icon = faPen;
        break;
      case 'post':
        icon = faPaperPlane;
        break;
      case 'previous':
        icon = faArrowLeft;
        break;
      case 'renew':
        icon = faRecycle;
        break;
      case 'save':
        icon = faSave;
        break;
      case 'search':
        icon = faSearch;
        break;
      case 'show' || 'view':
        icon = faEye;
        break;
      case 'upload':
        icon = faUpload;
        break;
      case 'unlock':
        icon = faUnlock;
        break;
      default:
        icon = null;
        break;
    }
    return { icon, iconPosition, iconString };
  };
}
