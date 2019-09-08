let showCorrectionIcon = document.getElementById('show-correction-icon');
let correctionMenu = document.getElementById('correction-menu');
let suggestionSection = document.getElementById('suggestion-section');
let operationSection = document.getElementById('operation-section');
let correctionList = document.querySelector('#correction-menu ul');
let misspelledWord = null;
quillEditor.addEventListener('mouseover', e => {
    if (e.target.classList.contains('ql-mis-spell')) {
        misspelledWord = e.target;
        suggestionSection.children[0].textContent = misspelledWord.textContent.slice(0, 5);
        suggestionSection.children[1].textContent = misspelledWord.textContent.slice(0, 4);
        suggestionSection.children[2].textContent = misspelledWord.textContent.slice(0, 3);
        let position = misspelledWord.getBoundingClientRect();
        correctionMenu.style.left = `${position.x}px`;
        correctionMenu.style.top = `${position.y + 20}px`;
        correctionMenu.className = 'show';
    }
});

quillEditor.addEventListener('click', e => {
    correctionMenu.className = '';
    correctionList.className = '';
});

showCorrectionIcon.addEventListener('click', e => {
    correctionList.className = 'show';
});

suggestionSection.addEventListener('click', e => {
    let clickedSuggestion = e.target;

    misspelledWord.textContent = clickedSuggestion.textContent;
    quill.formatText(quill.getText().indexOf(misspelledWord.textContent), misspelledWord.textContent.length, 'Misspell', false);
    quillEditor.click();
    misspelledWord = null;
});

operationSection.addEventListener('click', e => {
    let clickedOperation = e.target;

    if (clickedOperation.id === 'add-to-dictionary') {
        user.dictionary = misspelledWord.textContent;
        new Notification('success', 'أُضيفت الكلمة إلى القاموس الشخصي')
    }
    else if (clickedOperation.id === 'ignore-word') {
        user.ignoreWords.push(misspelledWord.textContent);
        let indices = quill.getText().getIndicesOf(misspelledWord.textContent);
        indices.forEach(index => quill.formatText(index, misspelledWord.textContent.length, 'Misspell', false));
        quillEditor.click();
        misspelledWord = null;
    }
});