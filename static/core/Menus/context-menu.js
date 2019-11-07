const requireSelectionElements = document.querySelectorAll('.require-select');

textBox.addEventListener('contextmenu', (e) => {

    // if clicked in table, return..
    if (['TD', 'TR', 'TABLE'].includes(e.target.tagName)) return;

    console.log(e.target);
    if (EditorHelper.isTextSelected()) {
        requireSelectionElements.forEach(ele => ele.classList.remove('disabled'));
    } else {
        requireSelectionElements.forEach(ele => ele.classList.add('disabled'));
    }
    contextMenu.classList.replace('hide', 'show');

    // show the menu in the mouse position
    contextMenu.style.left = e.pageX - 123 + 'px';
    contextMenu.style.top = e.pageY + 13 + 'px';
});

const hideContextMenu = (e) => {
    contextMenu.classList.replace('show', 'hide');
};

textBox.addEventListener('click', hideContextMenu);
textBox.addEventListener('blur', hideContextMenu);

contextMenu.addEventListener('click', e => {
    const clickedItem = e.target;

    e.preventDefault();
    switch (clickedItem.id) {
        case 'ctx-cut':
            document.execCommand('Cut');
            break;
        case 'ctx-copy':
            document.execCommand('Copy');
            break;
        case 'ctx-paste':
            if (!quill.hasFocus())
                quill.focus();
            document.execCommand('Paste');
            break;
        case 'ctx-delete':
            document.execCommand('Delete');
            break;
        default:
            const selectedWord = EditorHelper.getCurrentWord();
            if (clickedItem.classList.contains('add-to-dictionary'))
                user.addToDictionary(selectedWord);
            else if (clickedItem.classList.contains('ignore-word'))
                user.addToIgnoreWords(selectedWord);
    }

    hideContextMenu();
});