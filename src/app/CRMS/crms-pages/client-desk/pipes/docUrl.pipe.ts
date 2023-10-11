import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "docUrl"
})
export class DocUrlPipe implements PipeTransform{
  
  transform(doc: any, baseURL: string) {
    if (!doc || !baseURL) return "";
    return `${baseURL}/${doc?.docKey}/${doc?.fileName}`;
  }
}