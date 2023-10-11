import { IDocMetadata } from 'src/app/Shared/models/index.model';

export class Log<T = any> {
  id: string;
  title: string;
  time: number;
  payload: T;
  isSuccess: boolean;
  route: string;
  endpoint: string;
  files: IFileData[];
  constructor(
    payload: T,
    files: File[] = [],
    isSuccess: boolean,
    route: string,
    endpoint: string
  ) {
    files = files || [];
    if (payload instanceof FormData) {
      this.payload = null;
      (payload as FormData).forEach((kvp) => {
        if (!(!kvp || kvp == undefined || kvp == null))
          if (kvp instanceof File) {
            files.push(kvp);
          } else {
            this.payload = { ...this.payload, ...JSON.parse(kvp) };
          }
      });
    } else {
      this.payload = payload;
    }
    this.isSuccess = isSuccess;
    // this.title = title;
    this.route = route;
    this.endpoint = endpoint;
    this.files = files?.map((f) => ({
      title: f.name,
      size: f.size,
      type: f.type,
    }));
    this.time = Date.now();
    this.id = 'id' + Math.round(Math.random() * 1000000);
  }
}
interface IFileData {
  title: string;
  size: number;
  type: string;
}
