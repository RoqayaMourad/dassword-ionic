export class HelperService {

  static generate_otp() {
    return this.getRandomInt(100000, 999999);
  }

  static getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


  static timestamp() {
    return parseInt((Date.now() / 1000) as any);
  }

  static formate_name(s: string) {
    return s ? s.replace(/_/g, " ") : s;
  }


  static makeid(length = 16) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() *
        charactersLength));
    }
    return result;
  }

  static makePass(length = 18) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*(){}[]';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() *
        charactersLength));
    }
    return result;
  }

  static object_equals(x, y) {
    if (x === y) return true;
    // if both x and y are null or undefined and exactly the same

    if (!(x instanceof Object) || !(y instanceof Object)) return false;
    // if they are not strictly equal, they both need to be Objects

    if (x.constructor !== y.constructor) return false;
    // they must have the exact same prototype chain, the closest we can do is
    // test there constructor.

    for (var p in x) {
      if (!x.hasOwnProperty(p)) continue;
      // other properties were tested using x.constructor === y.constructor

      if (!y.hasOwnProperty(p)) return false;
      // allows to compare x[ p ] and y[ p ] when set to undefined

      if (x[p] === y[p]) continue;
      // if they have the same strict value or identity then they are equal

      if (typeof (x[p]) !== "object") return false;
      // Numbers, Strings, Functions, Booleans must be strictly equal

      if (!this.object_equals(x[p], y[p])) return false;
      // Objects and Arrays must be tested recursively
    }

    for (p in y)
      if (y.hasOwnProperty(p) && !x.hasOwnProperty(p))
        return false;
    // allows x[ p ] to be set to undefined

    return true;
  }

  static getIcon(url: string) {
    url = HelperService.withHttps(url)
    return `https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${url}&size=256`
  }

  static getHostName(url: string) {
    url = HelperService.withHttps(url);
    return new URL(url).hostname;

  }

  static withHttps(url: string) {
    return url.replace(/^(?:(.*:)?\/\/)?(.*)/i, (match, schemma, nonSchemmaUrl) => schemma ? match : `https://${nonSchemmaUrl}`)
  }

  static copyToClipboard(txt) {
    var m = document;
    txt = m.createTextNode(txt);
    var w = window as any;
    var b = m.body as any;
    b.appendChild(txt);
    if (b.createTextRange) {
      var d = b.createTextRange();
      d.moveToElementText(txt);
      d.select();
      m.execCommand('copy');
    }
    else {
      var d = m.createRange() as any;
      var g = w.getSelection;
      d.selectNodeContents(txt);
      g().removeAllRanges();
      g().addRange(d);
      m.execCommand('copy');
      g().removeAllRanges();
    }
    txt.remove();
  }
}
