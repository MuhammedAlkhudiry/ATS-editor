quill.clipboard.addMatcher('.ql-ayah', function (node, delta) {
    let currentFormat = quill.getFormat();
    if (currentFormat.align === 'right' && currentFormat.direction === 'rtl') {
        return delta.compose(new Delta().retain(delta.length(), {'direction': 'rtl', 'align': 'right'}));
    } else return delta.compose(new Delta().retain(delta.length()));
});
quill.clipboard.addMatcher('.ql-hadith', function (node, delta) {
    let currentFormat = quill.getFormat();
    if (currentFormat.align === 'right' && currentFormat.direction === 'rtl') {
        return delta.compose(new Delta().retain(delta.length(), {'direction': 'rtl', 'align': 'right'}));
    } else return delta.compose(new Delta().retain(delta.length()));
});
quill.clipboard.addMatcher('.ql-poetry', function (node, delta) {
    let currentFormat = quill.getFormat();
    if (currentFormat.align === 'right' && currentFormat.direction === 'rtl') {
        return delta.compose(new Delta().retain(delta.length(), {'direction': 'rtl', 'align': 'right'}));
    } else return delta.compose(new Delta().retain(delta.length()));
});
quill.clipboard.addMatcher('.ql-searched-string', function (node, delta) {
    let currentFormat = quill.getFormat();
    if (currentFormat.align === 'right' && currentFormat.direction === 'rtl') {
        return delta.compose(new Delta().retain(delta.length(), {'direction': 'rtl', 'align': 'right'}));
    } else return delta.compose(new Delta().retain(delta.length()));
});
quill.clipboard.addMatcher('.ql-mis-spell', function (node, delta) {
    let currentFormat = quill.getFormat();
    if (currentFormat.align === 'right' && currentFormat.direction === 'rtl') {
        return delta.compose(new Delta().retain(delta.length(), {'direction': 'rtl', 'align': 'right'}));
    } else return delta.compose(new Delta().retain(delta.length()));
});