"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ArabicGrammar_1 = require("./ArabicGrammar");
class VerbalSentence extends ArabicGrammar_1.default {
    constructor(parser, sentence) {
        super(parser);
        this.sentence = sentence;
        this.verbalSentence();
    }
    verbalSentence() {
        this.parser.currentSentenceType = 'V';
        if (this.isLookaheadEquals('فعل لازم')) {
            this.match('فعل لازم');
            this.verbalSubjectPhrase();
            this.remainingIntransitive();
        }
        else if (this.isLookaheadEquals('فعل متعدي')) {
            this.match('فعل متعدي');
            this.verbalSubjectPhrase();
            this.remainingTransitive();
        }
    }
    verbalSubjectPhrase() {
        this.sentence.subject();
    }
    remainingIntransitive() {
        if (this.parser.isSemiSentence())
            this.sentence.adjunctsPhrase();
    }
    remainingTransitive() {
        if (this.parser.isObject()) {
            this.sentence.object();
            this.remainingTransitiveObject();
        }
    }
    remainingTransitiveObject() {
        if (this.parser.isSemiSentence())
            this.sentence.adjunctsPhrase();
    }
}
exports.default = VerbalSentence;
//# sourceMappingURL=VerbalSentence.js.map