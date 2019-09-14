let tr = document.querySelectorAll('#insert-table-box tr');
let records = document.querySelectorAll('#insert-table-box td');
const floatTip = document.getElementById('float-row-column-tip');

let insertTable = document.getElementById('insert-table-box');

insertTable.addEventListener('mouseover', e => {
    if (e.target.id === 'table') return;
    let currentRecord = e.target.id;
    let currRow = parseInt(currentRecord);
    let currCol = parseInt(currentRecord.substr(3));

    if (isNaN(currCol) || isNaN(currRow)) return;

    records.forEach(record => record.removeAttribute('style'));
    for (const record of records) {
        let row = parseInt(record.id);
        let col = parseInt(record.id.substr(3));
        if (col > currCol || row > currRow) continue;
        record.style.backgroundColor = '#0066cc77';
    }

    floatTip.style.top = (e.pageY - 80) + 'px';
    floatTip.style.left = (e.pageX - 80) + 'px';
    floatTip.style.visibility = 'visible';
    floatTip.textContent = currRow + ' x ' + currCol;
});

insertTable.addEventListener('mouseleave', e => {
    records.forEach(record => record.removeAttribute('style'));
    floatTip.style.visibility = 'hidden';
});

insertTable.addEventListener('click', e => {
    floatTip.style.visibility = 'hidden';
    insertTable.className = 'insert-box';
    let floatTipContent = floatTip.textContent.replace(' ', '').replace('x', '').split(' ');
    let rowToInsert = parseInt(floatTipContent[0]),
        colToInsert = parseInt(floatTipContent[1]);

    if (isCaretInTable()) {
        const caretContainer = window.getSelection().getRangeAt(0).endContainer;
        let nextElement = caretContainer.closest('.quill-better-table-wrapper').nextElementSibling;
        EditorHelper.setRangeIn(nextElement);
        quill.insertText(quill.getSelection(), '\n');
    }

    tableModule.insertTable(rowToInsert, colToInsert);
});

const isCaretInTable = () => {
    let caretContainer = window.getSelection().getRangeAt(0).endContainer;

    if (!caretContainer.dataset) return false;
    else return caretContainer.dataset.row;
};