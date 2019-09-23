class TextChange {

    ops = [];
    previousTextLen = 0;

    removeFormat(attribute) {
        this.ops = [
            {retain: this.previousTextLen},
            {retain: 1, attributes: attribute},
        ];
    }

    replaceSentence(insert, del, retain = null) {
        this.ops = [
            {insert: insert},
            {delete: del},
        ];
        if (retain) this.ops.unshift({retain: retain});
    }

    setPreviousTextLen(delta) {
        if (delta.ops[0].retain) this.previousTextLen = delta.ops[0].retain;

    }

}