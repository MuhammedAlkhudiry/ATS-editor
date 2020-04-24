"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ArabicGrammar_1 = require("./grammer/ArabicGrammar");
const Parser_1 = require("./Parser");
const Sentence_1 = require("./grammer/Sentence");
class Main {
    run() {
        const parser = new Parser_1.default(quill.getText());
        new ArabicGrammar_1.default(parser);
        new Sentence_1.default(parser);
        return parser.result;
    }
}
exports.default = Main;
//# sourceMappingURL=Main.js.map
