declare global {
  interface String {
    stripChar(character?: string): string;
    lastStripChar(character?: string): string;
    unChar(character?: string, replacement?: string): string;
  }
  interface Array<T> {
    merge(): T;
    sort2(field: string, isString?: boolean, reverse?: boolean): T[];
  }
  interface Function {
    clone: any;
  }
}
// declare interface String {
//   stripSlash(): string;
//   lastStripSlash(): string;
//   unStrip(): string;
// }
//#region  string */
String.prototype.stripChar = function (this: string, character = '/') {
  return (this + '').replace(character, '');
};
String.prototype.lastStripChar = function (this: string, character = '/') {
  return this[this?.length - 1] == character
    ? this.slice(0, this.length - 1)
    : this;
};
String.prototype.unChar = function (
  this: string,
  character = '/',
  replacement = ''
) {
  let te = '';
  for (let i = 0; i < this.length; i++) {
    const e = this[i];
    te += e != character ? e : '';
  }
  return te.split(character).join(replacement);
};
//#endregion

//#region  array */
Array.prototype.merge = function <T>(this: Array<T>) {
  let r = '';
  for (const i of this) {
    r += i;
  }
  return r;
};
Array.prototype.sort2 = function <T>(
  this: Array<T>,
  field: string,
  isString: boolean = false,
  reverse: boolean = false
) {
  if (reverse) {
    return isString
      ? this.sort((b, a) => sortAlphaNum(a[field], b[field]))
      : this.sort((b, a) => (a[field] || 0) - (b[field] || 0));
  } else {
    return isString
      ? this.sort((a, b) => sortAlphaNum(a[field], b[field]))
      : this.sort((a, b) => (a[field] || 0) - (b[field] || 0));
  }
};
var reA = /[^a-zA-Z]/g;
var reN = /[^0-9]/g;

function sortAlphaNum(a, b) {
  var aA = a?.replace(reA, '');
  var bA = b?.replace(reA, '');
  if (aA === bA) {
    var aN = parseInt(a?.replace(reN, ''), 10);
    var bN = parseInt(b?.replace(reN, ''), 10);
    return aN === bN ? 0 : aN > bN ? 1 : -1;
  } else {
    return aA > bA ? 1 : -1;
  }
}
//#endregion

//#region Function
Function.prototype.clone = function () {
  var that = this;
  var temp = function temporary() {
    return that.apply(this, arguments);
  };
  for (var key in this) {
    if (this.hasOwnProperty(key)) {
      temp[key] = this[key];
    }
  }
  return temp;
};
//#endregion
export {};
