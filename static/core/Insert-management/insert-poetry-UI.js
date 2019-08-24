let insertPoetryBox = document.getElementById('insert-poetry-box');
let poetryInputParts = [document.getElementById('poetry-input-first-part'), document.getElementById('poetry-input-second-part')];

document.getElementById('insert-poetry-btn').addEventListener('click', function (e) {

    tableModule.insertTable(1, 2);
    insertPoetryBox.className = 'insert-box';
});


let observer = new MutationObserver(mutationRecords => {
    // if (mutationRecords[mutationRecords.length - 1].target.className !== 'quill-better-table-wrapper') return;
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

    insertedPoetry.style.width = '';
    insertedPoetry.className = 'ql-poetry';

});

// observe everything except attributes
observer.observe(textBox, {
    childList: true, // observe direct children
    subtree: true, // and lower descendants too
    characterDataOldValue: true // pass old data to callback
});
