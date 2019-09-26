class TextChange {

    ops = [];
    previousTextLen = 0;

    removeFormat(attribute) {
        this.ops = [
            {retain: this.previousTextLen},
            {retain: 1, attributes: attribute},
        ];
    }
}