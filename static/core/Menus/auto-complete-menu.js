let autoCompleteMenu = document.getElementById('auto-complete-menu');
let timeout = null;


quillEditor.addEventListener('keyup', e => {
    clearTimeout(timeout);
    if (!String.fromCharCode(e.keyCode).match(/(\w|\s)/g) && e.key !== 'Backspace') {
        if (!['ArrowUp', 'ArrowDown', 'ArrowRight', 'ArrowLeft'].includes(e.key)) {
            hideAutoMenu();
        }
        return;
    }
    if (['Enter', ' '].includes(e.key)) return;

    let currentWord = ArabicHelper.removeTashkeel(EditorHelper.getCurrentWord());
    if (currentWord.length < 2) return;

    timeout = setTimeout(() => {
        hideAutoMenu();
        EditorHelper.isAutoCompleteMenuShown = true;

        let userWords = EditorHelper.userText;
        let suggestedWords = analyzer.suggest(currentWord);
        if (typeof suggestedWords === 'string') return;
        else {
            for (const suggestedWord of Object.values(suggestedWords)) {
                if (userWords.includes(suggestedWord)) {
                    console.log(parseInt(suggestedWords[suggestedWord]));
                    suggestedWords[suggestedWord] = 10000;
                }
            }
            suggestedWords = Object.values(suggestedWords);
        }

        for (const suggestedWord of suggestedWords) {
            let autoCompleteItem = document.createElement('DIV');
            autoCompleteItem.className = 'menu-item';
            autoCompleteItem.textContent = suggestedWord;
            autoCompleteMenu.appendChild(autoCompleteItem);
            autoCompleteItem.addEventListener('click', () => {
                const index = quill.getSelection(true).index;
                const change = [
                    {insert: autoCompleteItem.textContent, attributes: quill.getFormat()},
                    {delete: currentWord.length},
                ];

                if (index !== currentWord.length) change.unshift({retain: index - currentWord.length});

                quill.updateContents({
                    ops: change
                });

                hideAutoMenu();
            });
        }
        positionAutoMenu();
    }, 300);

});

document.body.addEventListener('keydown', e => {
    if (!EditorHelper.isAutoCompleteMenuShown || autoCompleteMenu.children.length === 0) return;
    let autoCompleteItems = autoCompleteMenu.children;

    switch (e.key) {
        case 'Enter':
            if (EditorHelper.currentFocus > -1) {
                e.preventDefault();
                if (autoCompleteItems) autoCompleteItems[EditorHelper.currentFocus].click();
            }
            break;
        case 'ArrowUp':
            quill.blur();
            autoCompleteMenu.focus();
            EditorHelper.currentFocus--;
            addActive(autoCompleteItems);
            autoCompleteItems[EditorHelper.currentFocus].scrollIntoView({behavior: 'smooth', block: 'nearest', inline: 'nearest'});
            e.preventDefault();
            break;

        case 'ArrowDown':
            quill.blur();
            autoCompleteMenu.focus();
            EditorHelper.currentFocus++;
            addActive(autoCompleteItems);
            autoCompleteItems[EditorHelper.currentFocus].scrollIntoView({behavior: 'smooth', block: 'nearest', inline: 'nearest'});
            e.preventDefault();
            break;
        default:
            hideAutoMenu();
            quill.focus();
            break;
    }
});

const addActive = (autoCompleteItems) => {

    if (!autoCompleteItems || !autoCompleteItems.length) return false;
    removeActive();
    if (EditorHelper.currentFocus >= autoCompleteItems.length) EditorHelper.currentFocus = 0;
    if (EditorHelper.currentFocus < 0) EditorHelper.currentFocus = (autoCompleteItems.length - 1);

    autoCompleteItems[EditorHelper.currentFocus].classList.add('list-item-active');
};

const removeActive = () => {
    if (document.querySelector('.list-item-active'))
        document.querySelector('.list-item-active').className = 'menu-item';
};

const hideAutoMenu = () => {
    while (autoCompleteMenu.firstChild) {
        autoCompleteMenu.firstChild.remove();
    }
    autoCompleteMenu.classList.replace('show', 'hide');
    EditorHelper.isAutoCompleteMenuShown = false;
};

const positionAutoMenu = () => {
    const rect = window.getSelection().getRangeAt(0).getBoundingClientRect();
    autoCompleteMenu.style.top = `${rect.y + 20}px`;
    autoCompleteMenu.style.left = `${rect.x - autoCompleteMenu.clientWidth + rect.width}px`;
    autoCompleteMenu.classList.replace('hide', 'show');
};

quillEditor.addEventListener('click', () => hideAutoMenu());
