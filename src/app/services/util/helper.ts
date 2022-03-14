import { FormGroup } from "@angular/forms";

export class HelperService {

  static generate_otp() {
    return this.getRandomInt(100000, 999999);
  }

  static getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


  formate_name(s: string) {
    return s ? s.replace(/_/g, " ") : s;
  }


  makeid(length=15) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() *
        charactersLength));
    }
    return result;
  }


  copyToClipboard(txt) {
    var m = document;
    txt = m.createTextNode(txt);
    var w = window as any;
    var b = m.body as any;
    b.appendChild(txt) ;
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
