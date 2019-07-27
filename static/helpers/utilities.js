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

String.prototype.isEmpty = function() {
    return (this.length === 0 || !this.trim());
};
/* -------------------------------------------------------------------------- */

/* ---------------------------------- Array --------------------------------- */
Array.prototype.isEmpty = function () { return this.length === 0; };

/* -------------------------------------------------------------------------- */
