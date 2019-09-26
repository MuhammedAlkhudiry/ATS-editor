const requireSelectionElements = document.querySelectorAll('.require-select');

textBox.addEventListener('contextmenu', (e) => {

    // if clicked in table, return..
    if (['DIV', 'TD', 'TR', 'TABLE'].includes(e.target.tagName)) return;

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
    const selectedWord = EditorHelper.getCurrentWord();
    console.log(selectedWord);
    switch (clickedItem.id) {
        case 'ctx-cut':
            document.execCommand('cut');
            break;
        case 'ctx-copy':
            document.execCommand('copy');
            break;
        case 'ctx-paste':
            document.execCommand('paste');
            break;
        case 'ctx-delete':
            document.execCommand('delete');
            break;
        default:
            if (clickedItem.classList.contains('add-to-dictionary'))
                user.addToDictionary(selectedWord);
            else if (clickedItem.classList.contains('ignore-word'))
                user.addToIgnoreWords(selectedWord);
    }

    hideContextMenu();
});