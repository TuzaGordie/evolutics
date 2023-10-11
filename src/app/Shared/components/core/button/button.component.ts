import {Component, HostListener, Input, OnInit} from '@angular/core';
import {
  faArrowLeft,
  faArrowRight,
  faCheck,
  faClone,
  faCogs,
  faEdit,
  faEye,
  faFile,
  faHistory,
  faPen,
  faPlay,
  faPlus,
  faSave,
  faSearch, faSlidersH,
  faTrash,
  faUpload
} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  faEye = faEye;
  faPlus = faPlus;
  faClone = faClone;
  faSearch = faSearch;
  faCheck = faCheck;
  faFile = faFile;
  faSave = faSave;
  faEdit = faEdit;
  faUpload = faUpload;
  faPlay = faPlay;
  faPen = faPen;
  faTrash = faTrash;
  faArrowRight = faArrowRight;
  faArrowLeft = faArrowLeft;
  @Input() buttonType: string = '';
  @Input() text: string = '';
  @Input() disabled:boolean;
  faHistory = faHistory;
  faSlidersH = faSlidersH;
  faCogs = faCogs;

  constructor() {}

  ngOnInit(): void {}}


