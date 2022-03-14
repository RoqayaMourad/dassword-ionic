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


  static makeid(length = 15) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() *
        charactersLength));
    }
    return result;
  }

  static getIcon(url: string) {
    url = HelperService.withHttp(url)
    return `https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${url}&size=256`
  }

  static withHttp(url: string) {
    return url.replace(/^(?:(.*:)?\/\/)?(.*)/i, (match, schemma, nonSchemmaUrl) => schemma ? match : `http://${nonSchemmaUrl}`)
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
