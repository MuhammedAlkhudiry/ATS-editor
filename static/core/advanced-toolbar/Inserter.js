class Inserter {
    constructor() {
        this.insertTableBox = document.getElementById('insert-table-box');
        this.records = document.querySelectorAll('#insert-table-box td');
        this.floatTip = document.getElementById('float-row-column-tip');
        this.insertTableBox.addEventListener('mouseover', this.hoveringInsertTableBox.bind(this));
        this.insertTableBox.addEventListener('mouseleave', this.leaveInsertTableBox.bind(this));
        this.insertTableBox.addEventListener('click', this.insertTable.bind(this));
        document.getElementById('insert-poetry-btn').addEventListener('click', this.insertPoetry.bind(this));
        this.poetryInputParts = [document.getElementById('poetry-input-first-part'), document.getElementById('poetry-input-second-part')];

    }

    insertTable() {
        this.floatTip.style.visibility = 'hidden';
        this.insertTableBox.className = 'insert-box';
        let floatTipContent = this.floatTip.textContent.replace(' ', '').replace('x', '').split(' ');
        let rowToInsert = parseInt(floatTipContent[0]),
            colToInsert = parseInt(floatTipContent[1]);

        if (EditorHelper.isCaretInTable()) {
            const caretContainer = window.getSelection().getRangeAt(0).endContainer;
            let nextElement = caretContainer.closest('.quill-better-table-wrapper').nextElementSibling;
            EditorHelper.setRangeIn(nextElement);
            EditorHelper.insertEmptyLineIn();
        }

        tableModule.insertTable(rowToInsert, colToInsert);
    }

    insertPoetry() {

        if (this.poetryInputParts[0].value.isEmpty() && this.poetryInputParts[1].value.isEmpty()) {
            this.poetryInputParts[0].classList.add('invalid');
            this.poetryInputParts[1].classList.add('invalid');
            return;
        } else {
            this.poetryInputParts[0].classList.remove('invalid');
            this.poetryInputParts[1].classList.remove('invalid');
        }

        if (EditorHelper.isCaretInTable()) {
            const caretContainer = window.getSelection().getRangeAt(0).endContainer;
            let nextElement = caretContainer.closest('.quill-better-table-wrapper').nextElementSibling;
            EditorHelper.setRangeIn(nextElement);
            quill.insertText(quill.getSelection(), '\n');
        }

        tableModule.insertTable(1, 2);
        advancedToolbar.closeInsertBoxes();
        EditorHelper.isPoetryInserted = true;
    }

    leaveInsertTableBox() {
        this.records.forEach(record => record.removeAttribute('style'));
        this.floatTip.style.visibility = 'hidden';
    }

    hoveringInsertTableBox(e) {
        if (e.target.id === 'table') return;
        let currentRecord = e.target.id;
        let currRow = parseInt(currentRecord);
        let currCol = parseInt(currentRecord.substr(3));

        if (isNaN(currCol) || isNaN(currRow)) return;

        this.records.forEach(record => record.removeAttribute('style'));
        for (const record of this.records) {
            let row = parseInt(record.id);
            let col = parseInt(record.id.substr(3));
            if (col > currCol || row > currRow) continue;
            record.style.backgroundColor = '#0066cc77';
        }

        this.floatTip.style.top = (e.pageY - 80) + 'px';
        this.floatTip.style.left = (e.pageX - 80) + 'px';
        this.floatTip.style.visibility = 'visible';
        this.floatTip.textContent = currRow + ' x ' + currCol;
    }


}

const inserter = new Inserter();

let observer = new MutationObserver(mutationRecords => {

    if (!EditorHelper.isPoetryInserted) return;

    let insertedPoetry = mutationRecords.find(element => {
        if (!element.target.className) return;
        if (element.target.className === 'quill-better-table-wrapper') return element;
    });

    if (!insertedPoetry) return;
    else insertedPoetry = insertedPoetry.target;

    let poetryParts = insertedPoetry.querySelectorAll('td');

    for (const [i, poetryPart] of poetryParts.entries()) {
        poetryPart.style.borderColor = 'transparent';
        poetryPart.firstElementChild.textContent = inserter.poetryInputParts[i].value;
    }

    insertedPoetry.firstElementChild.className = '';
    insertedPoetry.firstElementChild.style.width = 'auto';
    insertedPoetry.classList.replace('quill-better-table-wrapper', 'ql-poetry');

    EditorHelper.isPoetryInserted = false;

});

// observe everything except attributes
observer.observe(textBox, {
    childList: true, // observe direct children
    subtree: true, // and lower descendants too
    characterDataOldValue: true // pass old data to callback
});