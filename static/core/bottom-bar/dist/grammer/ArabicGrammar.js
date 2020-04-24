"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ArabicGrammar {
    constructor(parser) {
        this.parser = parser;
    }
    isLookaheadIn(tokenList) {
        return this.parser.isLookaheadIn(tokenList);
    }
    isLookaheadEquals(token) {
        return this.parser.isLookaheadEquals(token);
    }
    match(token, partOfSpeech = token) {
        return this.parser.match(token, partOfSpeech);
    }
    getWordsByIndex(previousIndex, currentIndex) {
        return this.parser.words.slice(previousIndex, currentIndex).join(' ');
    }
}
exports.default = ArabicGrammar;
;
//# sourceMappingURL=ArabicGrammar.js.map