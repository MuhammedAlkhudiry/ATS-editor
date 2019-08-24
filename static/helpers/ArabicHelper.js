'use strict';

class ArabicHelper {

    static removeTashkeel(arabicText) {
        return arabicText.replace(/[\u0617-\u061A\u064B-\u0652]/g, '');
    }

    static isHarakah(char) {
        return new RegExp(/[\u0617-\u061A\u064B-\u0652]/).test(char);
    }

    static isHamza(char) {
        return new RegExp(/[(اأإآ]/).test(char);
    }
}
