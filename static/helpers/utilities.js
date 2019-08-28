'use strict';

/* --------------------------------- String --------------------------------- */
String.prototype.contains = function (str) {
    return this.indexOf(str) !== -1;
};


String.prototype.getIndicesOf = function (searchStr) {
    let searchStrLen = searchStr.length;
    let startIndex = 0, index, indices = [];
    while ((index = this.toLowerCase().indexOf(searchStr.toLowerCase(), startIndex)) > -1) {
        indices.push(index);
        startIndex = index + searchStrLen;
    }
    return indices;
};

String.prototype.isEmpty = function () {
    return (this.length === 0 || !this.trim());
};

String.prototype.indexOfRegex = function (regex, fromIndex) {
    const str = fromIndex ? this.substring(fromIndex) : this;
    const match = str.match(regex);
    return match ? str.indexOf(match[0]) + fromIndex : -1;
};
String.prototype.isNumeric = function () {
    return /^-?\d+$/.test(this);
};
/* -------------------------------------------------------------------------- */

/* ---------------------------------- Array --------------------------------- */
Array.prototype.isEmpty = function () {
    return this.length === 0;
};
/* -------------------------------------------------------------------------- */
