import '../prototypes/prototypes';
export class RouteItem {
  _: string;
  __: string;
  pub: string;
  constructor(base: string, parentPub: string = '', ...params: string[]) {
    // console.log(params);
    this._ = base + (params?.length ? '/:' + params.join('/:') : '');
    this.__ = base;
    this.pub = parentPub + '/' + base;
  }
}
export class AppRouteBase extends RouteItem {
  constructor(base: string, parentPub: string = '', ...params: string[]) {
    super(base, parentPub, ...params);
    this.all = new RouteItem('all', this.pub);
    this.clone = new RouteItem('clone', this.pub, 'id');
    this.create = new CreateRoute('create', this.pub);
    this.edit = new RouteItem('edit', this.pub, 'id');
    this.find = new FindRoute('find', this.pub);
    this.index = new RouteItem('index', this.pub);
    this.overview = new RouteItem('overview', this.pub);
    this.show = new RouteItem('show', this.pub, 'id');
    this.start = new RouteItem('start', this.pub);
  }
  all: RouteItem;
  clone: RouteItem;
  create: CreateRoute;
  edit: RouteItem;
  find: FindRoute;
  index: RouteItem;
  overview: RouteItem;
  show: RouteItem;
  start: RouteItem;

  //#region funcs
  routeIdPipe(route: string, prtID: string): string {
    return route ? route + '/' + prtID : null;
  }
  routeIdTitlePipe(route: string, id: string, title?: string): string {
    return route + '/' + id + '/' + this.routeNamer(title);
  }
  routePIdIdTitlePipe(
    route: string,
    parentID: string,
    id: string,
    title?: string
  ): string {
    return route + '/' + parentID + '/' + id + '/' + this.routeNamer(title);
  }
  routePidSidIdTitlePipe(
    route: string,
    parentID: string,
    subID: string,
    id: string,
    title?: string
  ): string {
    return (
      route +
      '/' +
      parentID +
      '/' +
      subID +
      '/' +
      id +
      '/' +
      this.routeNamer(title)
    );
  }
  routeNamer(title?: string) {
    return title
      ? title
          .substr(0, 30)
          .unChar('/')
          .trim()
          .toLowerCase()
          .split(' ')
          .filter((x) => x)
          .join('-')
      : '';
  }
  //#endregion
}

class CreateRoute extends RouteItem {
  corporate = new RouteItem('corporate', this.pub);
  group = new RouteItem('group', this.pub);
  individual = new RouteItem('individual', this.pub);
  provider = new CreateProviderRoute('provider', this.pub);
}
class CreateProviderRoute extends RouteItem {
  index = new RouteItem('index', this.pub);
}
class FindRoute extends RouteItem {
  searchList = new RouteItem('search-list', this.pub);
}
