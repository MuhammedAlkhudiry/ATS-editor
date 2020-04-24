"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ATSError {
    // private type: number;
    constructor(msg) {
        this.msg = msg;
        // this.type = type;
    }
    print() {
        console.log(this.msg);
        process.exit(1);
    }
}
exports.default = ATSError;
//# sourceMappingURL=Error.js.map