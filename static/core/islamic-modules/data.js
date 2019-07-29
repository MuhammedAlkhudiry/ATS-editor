const Q_OPEN_BRACKET = '﴾';
const Q_CLOSE_BRACKET = '﴿';

const AR_NUMBERS = {
    0: '۰',
    1: '١',
    2: '٢',
    3: '٣',
    4: '٤',
    5: '٥',
    6: '٦',
    7: '٧',
    8: '٨',
    9: '٩',
};

const AR_COMMA = '،';

// when comma pressed, replace it with arabic comma.
if (e.key == ',') {
    e.preventDefault();
    document.execCommand('insertText', false, AR_COMMA);
}


// todo: insert: ayah, hadith, bait, date.