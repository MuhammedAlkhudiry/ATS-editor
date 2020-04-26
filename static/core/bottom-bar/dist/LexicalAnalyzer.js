"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = require("./Database");
class LexicalAnalyzer {
    constructor() {
        this.database = new Database_1.default();
    }
    analyze(word) {
        this.word = word;
        if (this.isHarf()) {
            if (this.isNegativeParticle()) {
                return 'حرف نفي';
            }
            else if (this.isInfinitiveParticle()) {
                return 'حرف جر';
            }
            else if (this.isPreposition()) {
                return 'حرف جر';
            }
            else if (this.isInfinitiveParticle()) {
                return 'حرف جر';
            }
            else if (this.isInterrogativeParticle()) {
                return 'حرف استفهام';
            }
            return 'حرف';
        }
        else if (this.isDigit()) {
            return 'رقم';
        }
        else if (this.isIntransitiveVerb()) {
            return 'فعل لازم';
        }
        else if (this.isTransitiveVerb()) {
            return 'فعل متعدي';
        }
        else if (this.isPunctuation()) {
            return 'علامة ترقيم';
        }
        else if (this.isAdjectiveParticle()) {
            return 'حرف ناسخ';
        }
        else if (this.isVerbalTransformedParticle()) {
            return 'فعل ناسخ';
        }
        else if (this.isAdverb()) {
            return 'ظرف';
        }
        else if (this.isRelativeNoun()) {
            return 'حرف موصول';
        }
        return 'اسم';
    }
    isIntransitiveVerb() {
        for (const key of Object.keys(this.database.verbs['فعل لازم'])) {
            if (this.database.verbs['فعل لازم'][key].includes(this.word))
                return true;
        }
        return false;
    }
    isTransitiveVerb() {
        for (const key of Object.keys(this.database.verbs['فعل متعدي'])) {
            if (this.database.verbs['فعل متعدي'][key].includes(this.word))
                return true;
        }
        return false;
    }
    isHarf() {
        for (const key of Object.keys(this.database.horof)) {
            if (this.database.horof[key].includes(this.word))
                return true;
        }
        return false;
    }
    isDigit() {
        return /^\d+$/.test(this.word) || /[\u0660-\u0669]/.test(this.word);
    }
    isNegativeParticle() {
        return this.database.horof['حرف نفي'].includes(this.word);
    }
    isInterrogativeParticle() {
        return this.database.horof['حرف استفهام'].includes(this.word);
    }
    isPreposition() {
        return this.database.horof['حرف جر'].includes(this.word);
    }
    isInfinitiveParticle() {
        return this.database.horof['حرف مصدري'].includes(this.word);
    }
    isPunctuation() {
        return /[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,\-.\/:;<=>?@\[\]^_`{|}~]/.test(this.word);
    }
    isAdjectiveParticle() {
        return this.database.horof['حرف ناسخ'].includes(this.word);
    }
    isVerbalTransformedParticle() {
        return this.database.afal['فعل ناسخ'].includes(this.word);
    }
    isAdverb() {
        return this.database.asma['ظرف زمان'].includes(this.word) ||
            this.database.asma['ظرف مكان'].includes(this.word);
    }
    isRelativeNoun() {
        return this.database.asma['حرف موصول'].includes(this.word);
    }
}
exports.default = LexicalAnalyzer;
//# sourceMappingURL=LexicalAnalyzer.js.map
