'use strict';

class ArabicHelper {

    static NUMBERS = {
        '0': '۰',
        '1': '١',
        '2': '٢',
        '3': '٣',
        '4': '٤',
        '5': '٥',
        '6': '٦',
        '7': '٧',
        '8': '٨',
        '9': '٩'
    };
    static Q_PREFIXES = ['قوله تعالى', 'جاء في التنزيل', 'آية', 'قال الله', 'الآية القرآنية', 'قول الرب'];
    static HADITH_PREFIXES = ['قول الرسول', 'حديث', 'البخاري', 'قول المصطفى'];
    static COMMA = '،';
    static SEMI_COMMA = '؛';


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
