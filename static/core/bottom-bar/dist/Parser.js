"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Helper_1 = require("./Helper");
const LexicalAnalyzer_1 = require("./LexicalAnalyzer");
const Error_1 = require("./Error");
class Parser {
    constructor(text) {
        this.currentPass = 0;
        this.position = 0;
        this.lookahead = '';
        this.currentIndex = 0;
        this.currentSentenceType = 'N'; // N -> nominal, V -> verbal
        this.originalText = text;
        this.lexicalAnalyzer = new LexicalAnalyzer_1.default();
        this.cleanText = Helper_1.default.cleanText(this.originalText);
        this.words = this.cleanText.split(/[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,\-.\/:;<=>?@\[\]^_`{|}~ ]/).filter(Boolean);
        this.readFirstWord();
    }
    readFirstWord() {
        this.lookahead = this.analyzeCurrentWord();
    }
    match(token, partOfSpeech = token, error = new Error_1.default('خطأ لغوي')) {
        if (this.lookahead === token) {
            this.result += `${this.getCurrentWord()} - (${token}) - (${partOfSpeech})` + '<br />';
            console.log(`${this.getCurrentWord()} - (${token}) - (${partOfSpeech})`);
            this.currentIndex++;
            if ((this.lookahead = this.analyzeCurrentWord()) === 'علامة ترقيم')
                this.lookahead = this.analyzeCurrentWord();
        }
        else {
            error.print();
        }
    }
    analyzeCurrentWord() {
        if (this.currentIndex < this.words.length)
            return this.lexicalAnalyzer.analyze(this.getCurrentWord());
        else
            new Error_1.default('end of file');
    }
    getCurrentWord() {
        return this.words[this.currentIndex];
    }
    // "is" helpers
    isNominalSentence() {
        return this.isLookaheadIn(['حرف نفي', 'حرف استفهام', 'حرف جر', 'حرف ناسخ', 'فعل ناسخ', 'اسم']);
    }
    isSemiSentence() {
        return this.isLookaheadIn(['حرف جر', 'ظرف مكان', 'ظرف زمان']);
    }
    isExpansion() {
        return this.isLookaheadIn(['اسم فاعل', 'اسم مفعول', 'صيغة مبالغة', 'صفة مشبهة', 'حرف عطف', 'اسم', 'اسم موصول',]);
    }
    isObject() {
        return this.isLookaheadIn(['اسم', 'حرف مصدري']);
    }
    isLookaheadIn(tokenList) {
        return tokenList.includes(this.lookahead);
    }
    isLookaheadEquals(token) {
        return this.lookahead === token;
    }
}
exports.default = Parser;
//# sourceMappingURL=Parser.js.map
