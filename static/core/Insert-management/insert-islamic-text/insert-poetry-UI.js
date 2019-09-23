let insertPoetryBox = document.getElementById('insert-poetry-box');
let poetryInputParts = [document.getElementById('poetry-input-first-part'), document.getElementById('poetry-input-second-part')];

let isPoetryInserted = false;
document.getElementById('insert-poetry-btn').addEventListener('click', function (e) {

    tableModule.insertTable(1, 2);
    insertPoetryBox.className = 'insert-box';
    isPoetryInserted = true;
});

let observer = new MutationObserver(mutationRecords => {

    if (!isPoetryInserted) return;

    let insertedPoetry = mutationRecords.find(element => {
        if (!element.target.className) return;
        if (element.target.className === 'quill-better-table-wrapper') return element;
    });

    if (!insertedPoetry) return;
    else insertedPoetry = insertedPoetry.target;

    let poetryParts = insertedPoetry.querySelectorAll('td');

    for (const [i, poetryPart] of poetryParts.entries()) {
        poetryPart.style.borderColor = 'transparent';
        poetryPart.firstElementChild.textContent = poetryInputParts[i].value;
    }

    insertedPoetry.firstElementChild.className = '';
    insertedPoetry.firstElementChild.style.width = 'auto';
    insertedPoetry.classList.replace('quill-better-table-wrapper', 'ql-poetry');

    isPoetryInserted = false;

});

// observe everything except attributes
observer.observe(textBox, {
    childList: true, // observe direct children
    subtree: true, // and lower descendants too
    characterDataOldValue: true // pass old data to callback
});