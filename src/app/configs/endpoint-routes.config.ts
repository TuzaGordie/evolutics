export class EPRouteItem {
  _: string;
  __: string;
  pub: string;
  constructor(base: string, parentPub: string = "", params: string = "") {
    this._ = base + params;
    this.__ = base;
    this.pub = (base ? parentPub + base : parentPub) + "/";
  }
}
export class EPRouteBase extends EPRouteItem {
  constructor(base: string, parentPub: string = "", params: string = "") {
    super(base, parentPub, params);
    this.all = new EPRouteItem("all", this.pub);
    this.new = new EPRouteItem("new", this.pub);
    this.edit = new EPRouteItem("edit", this.pub);
    this.get = new EPRouteItem("get", this.pub);
    this.delete = new EPRouteItem("delete", this.pub);
  }
  new: EPRouteItem;
  all: EPRouteItem;
  edit: EPRouteItem;
  get: EPRouteItem;
  delete: EPRouteItem;
}
