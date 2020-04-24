"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NominalSentence_1 = require("./NominalSentence");
const VerbalSentence_1 = require("./VerbalSentence");
const ArabicGrammar_1 = require("./ArabicGrammar");
class Sentence extends ArabicGrammar_1.default {
    constructor(parser) {
        super(parser);
        this.sentence();
    }
    sentence() {
        if (this.parser.isNominalSentence())
            new NominalSentence_1.default(this.parser, this);
        else
            new VerbalSentence_1.default(this.parser, this);
    }
    originalParticle() {
        const ob = {
            'حرف نفي': () => this.match('حرف نفي'),
            'حرف استفهام': () => this.match('حرف استفهام'),
            'حرف جر': () => this.match('حرف جر')
        }[this.parser.lookahead]();
    }
    transformedParticle() {
        if (this.parser.lookahead === 'حرف ناسخ')
            this.match('حرف ناسخ');
        else
            this.match('فعل ناسخ');
    }
    subject() {
        if (this.isLookaheadEquals('اسم')) {
            this.match('اسم', this.parser.currentSentenceType == 'N' ? 'مبتدأ' : 'فاعل');
        }
        else if (this.isLookaheadEquals('ضمير')) {
            this.match('ضمير');
        }
    }
    derivedNoun() {
        const ob = {
            'اسم فاعل': () => this.match('اسم فاعل'),
            'اسم مفعول': () => this.match('اسم مفعول'),
            'صيغة مبالغة': () => this.match('صيغة مبالغة'),
            'صفة مشبهة': () => this.match('صفة مشبهة')
        }[this.parser.lookahead]();
    }
    semiSentence() {
        const ob = {
            'حرف جر': () => {
                this.match('حرف جر');
                this.match('اسم', 'مجرور');
            },
            'ظرف': () => {
                this.match('ظرف');
                this.annexed();
            },
        }[this.parser.lookahead]();
    }
    //    ---------------------------------------------
    adjunctsPhrase() {
        this.adjunct();
        if (this.parser.isSemiSentence())
            this.adjunctsPhrase();
    }
    adjunct() {
        this.semiSentence();
    }
    expansionPhrase() {
        this.expansion();
        if (this.parser.isExpansion())
            this.expansionPhrase();
    }
    expansion() {
        if (this.isLookaheadIn(['اسم فاعل', 'اسم مفعول', 'صيغة مبالغة', 'صفة مشبهة']))
            this.adjective();
        else if (this.isLookaheadEquals('حرف عطف'))
            this.coordinate();
        else if (this.isLookaheadEquals('اسم'))
            this.annexed();
        // else if (this.lookaheadIs('حال')) Circumstantial_Object
        else if (this.isLookaheadEquals('اسم موصول'))
            this.relativeSentence();
    }
    complementPhrase() {
        this.complementElement();
        if (this.isLookaheadIn(['اسم', 'مصدر مؤول']) || this.parser.isNominalSentence() || this.parser.isExpansion()) {
            this.complementPhrase();
        }
    }
    complementElement() {
        if (this.parser.isObject())
            this.object();
        else if (this.parser.isSemiSentence())
            this.semiSentence();
        else if (this.parser.isExpansion())
            this.expansion();
    }
    object() {
        if (this.isLookaheadEquals('اسم'))
            this.match('اسم', 'مفعول به');
        else if (this.isLookaheadEquals('حرف مصدري')) {
            const prevIndex = this.parser.currentIndex;
            this.interpretedInfinitive();
            const currentIndex = this.parser.currentIndex;
            const objectSentence = this.parser.words.slice(prevIndex, currentIndex).join(' ');
            this.parser.result += `الجملة السابقة مفعول به مؤول(${objectSentence})` + '\n';
            console.log(`الجملة السابقة مفعول به مؤول(${objectSentence})`);
        }
        else if (this.parser.isNominalSentence())
            new NominalSentence_1.default(this.parser, this);
    }
    interpretedInfinitive() {
        this.match('حرف مصدري');
        new VerbalSentence_1.default(this.parser, this);
    }
    annexed() {
        this.match('اسم', 'ظرف');
    }
    adjective() {
    }
    coordinate() {
        this.match('حرف عطف');
    }
    remainingCoordinate() {
        if (this.isLookaheadEquals('اسم')) {
            this.match('اسم');
        }
        else
            this.sentence();
    }
    relativeSentence() {
        this.match('اسم موصول');
        this.sentence();
    }
}
exports.default = Sentence;
//# sourceMappingURL=Sentence.js.map
