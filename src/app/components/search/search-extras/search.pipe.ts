import { Pipe, PipeTransform } from '@angular/core';
import { AppService } from 'src/app/Services/app.service';
import { ESystem } from 'src/app/Shared/models/index.model';

@Pipe({
  name: 'systemColourCode',
})
export class SystemColourCodePipe implements PipeTransform {
  transform(system: ESystem): string {
    return this.appS.systemMetadataMap.get(system)?.colourCode;
  }
  constructor(public appS: AppService) {}
}

@Pipe({
  name: 'systemLink',
})
export class SystemLinkPipe implements PipeTransform {
  transform(system: ESystem, link: string): string {
    if (link.trim()[0] != '/') {
      // console.log('parent.systemLink', parent.systemLink);
      link =
        (this.appS.systemMetadataMap.get(system)?.appRoute.pub || '') +
        '/' +
        link.trim();
    }
    return link;
  }
  constructor(public appS: AppService) {}
}
