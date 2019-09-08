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

String.prototype.getIndicesOfRegex = function (searchStr) {
    let searchStrLen = searchStr.length;
    let startIndex = 0, index, indices = [];
    while ((index = this.indexOfRegex(searchStr, startIndex)) > -1) {
        indices.push(index);
        startIndex = index + searchStrLen;
    }
    return indices;
};

String.prototype.replaceAll = function (search, replacement) {
    const target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

String.prototype.isNumeric = function () {
    return /^-?\d+$/.test(this);
};
/* -------------------------------------------------------------------------- */

/* ---------------------------------- Array --------------------------------- */
Array.prototype.isEmpty = function () {
    return this.length === 0;
};
Array.prototype.lastElement = function () {
    return this[this.length - 1];
};
/* -------------------------------------------------------------------------- */


Element.prototype.insertAfter = function (element) {
    element.parentNode.insertBefore(this, element.nextSibling);
};