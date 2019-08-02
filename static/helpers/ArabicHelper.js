'use strict';

module.exports = class ArabicHelper {

    static removeTashkeel(arabicText) {
        return arabicText.replace(/[\u0617-\u061A\u064B-\u0652]/g, "")
    }

};
