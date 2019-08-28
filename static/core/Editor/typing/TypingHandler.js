class TypingHandler {

    static ops = [];
    static previousTextLen = 0;

    static setOps(attribute, retain, insert, del) {
        if (attribute) {
            TypingHandler.ops = [
                {retain: retain},
                {retain: 1, attributes: attribute},
            ];
        }
        else if (del && insert && retain) {
            TypingHandler.ops = [
                {retain: retain},
                {insert: insert},
                {delete: del},
            ];
        }
        else if (del && insert) {
            TypingHandler.ops = [
                {insert: insert},
                {delete: del},
            ];
        }
    }

    static setPreviousTextLen(delta) {
        TypingHandler.previousTextLen = delta.ops[0].retain;
    }

    static isInsertedCharEquals(delta, char) {
        if (delta.ops[1]) {
            if (delta.ops[1].insert)
                return delta.ops[1].insert === char;
        }
        if (delta.ops[0]) {
            if (delta.ops[0].insert)
                return delta.ops[0].insert === char;
        }
    }

    static isInsertedCharNumber(delta) {
        if (delta.ops[1]) {
            if (delta.ops[1].insert)
                return delta.ops[1].insert.isNumeric();
        }
        if (delta.ops[0]) {
            if (delta.ops[0].insert)
                return delta.ops[0].insert.isNumeric();
        }
    }

    static isLastCharsEquals(oldDelta, numberOfChar, string) {
        return oldDelta.ops[0].insert.slice(-numberOfChar) === string;
    }

}