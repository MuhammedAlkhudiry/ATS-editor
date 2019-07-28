'use strict';

/* --------------------------------- String --------------------------------- */
String.prototype.contains = function (str) { return this.indexOf(str) != -1; };


String.prototype.getIndicesOf = function (searchStr) {
    let searchStrLen = searchStr.length;
    let startIndex = 0, index, indices = [];
    while ((index = this.indexOf(searchStr, startIndex)) > -1) {
        indices.push(index);
        startIndex = index + searchStrLen;
    }
    return indices;
};

String.prototype.isEmpty = function () {
    return (this.length === 0 || !this.trim());
};
/* -------------------------------------------------------------------------- */

/* ---------------------------------- Array --------------------------------- */
Array.prototype.isEmpty = function () { return this.length === 0; };
Array.prototype.isLastElement = function (elementIndex) { return this.length === elementIndex; };

/* -------------------------------------------------------------------------- */

// 0: 0
// 1: 3
// 2: 6
// 3: 11
// 4: 14
// 5: 17
// 6: 21
// 7: 24
// 8: 27
// 9: 32
// 10: 35
// 11: 38
// 12: 43
// 13: 46
// 14: 49
// 15: 56
// 16: 59
// 17: 62
// 18: 66
// 19: 69
// 20: 72
// 21: 76
// 22: 79
// 23: 82