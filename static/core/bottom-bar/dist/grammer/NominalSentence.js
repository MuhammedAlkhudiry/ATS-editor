"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ArabicGrammar_1 = require("./ArabicGrammar");
const Sentence_1 = require("./Sentence");
class NominalSentence extends ArabicGrammar_1.default {
    constructor(parser, sentence) {
        super(parser);
        this.sentence = sentence;
        this.nominalSentence();
    }
    nominalSentence() {
        this.parser.currentSentenceType = 'N';
        this.annular();
        this.subjectPhrase();
        this.predicatePhrase();
    }
    annular() {
        if (this.isLookaheadIn([
            'حرف نفي',
            'حرف استفهام',
            'حرف جر',
        ]))
            this.sentence.originalParticle();
        else if (this.isLookaheadIn([
            'حرف ناسخ',
            'فعل ناسخ',
        ]))
            this.sentence.transformedParticle();
    }
    subjectPhrase() {
        this.sentence.subject();
        this.sentence.expansionPhrase();
    }
    predicatePhrase() {
        this.predicate();
        this.sentence.expansionPhrase();
    }
    predicate() {
        if (this.isLookaheadIn(['اسم فاعل', 'اسم مفعول', 'صيغة مبالغة', 'صفة مشبهة']))
            this.sentence.derivedNoun();
        else if (this.isLookaheadEquals('اسم')) {
            this.match('اسم', 'خبر');
        }
        else if (this.parser.isSemiSentence()) {
            const prevIndex = this.parser.currentIndex;
            this.sentence.semiSentence();
            const currentIndex = this.parser.currentIndex;
            const predicateSentence = this.getWordsByIndex(prevIndex, currentIndex);
            this.parser.result += `الجملة السابقة خبر(${predicateSentence})` + '\n';
            console.log(`الجملة السابقة خبر(${predicateSentence})`);
        }
        else
            new Sentence_1.default(this.parser);
    }
}
exports.default = NominalSentence;
//# sourceMappingURL=NominalSentence.js.map
