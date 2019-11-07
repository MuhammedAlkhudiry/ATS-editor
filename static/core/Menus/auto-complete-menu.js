let autoCompleteMenu = document.getElementById('auto-complete-menu');

keyboardModule.addBinding({
    key: ' ',
    collapsed: true,
    ctrlKey: true,
    handler: (range, context) => {
        if (context.prefix.contains('ص')) {
            let pos = context.line.domNode.getBoundingClientRect();

            let sel = window.getSelection(),
                rect = sel.getRangeAt(0).getBoundingClientRect();
            for (let i = 0; i < 3; i++) {
                let autoCompleteItem = document.createElement('DIV');
                autoCompleteItem.className = 'menu-item';
                autoCompleteMenu.appendChild(autoCompleteItem);
            }


            autoCompleteMenu.style.top = `${rect.y + 20}px`;
            autoCompleteMenu.style.left = `${rect.x - autoCompleteMenu.clientWidth + rect.width}px`;
            autoCompleteMenu.classList.replace('hide', 'show');
            EditorHelper.isAutoCompleteMenuShown = true;

        }
    }
});

quillEditor.addEventListener('keydown', e => {
    if (!EditorHelper.isAutoCompleteMenuShown || autoCompleteMenu.children.length === 0) return;

    let autoCompleteItems = autoCompleteMenu.children;

    switch (e.key) {

        case 'Enter':
            if (EditorHelper.currentFocus > -1) {
                /*and simulate a click on the "active" item:*/
                if (autoCompleteItems) autoCompleteItems[EditorHelper.currentFocus].click();
            }
            break;
        case 'ArrowUp':
            EditorHelper.currentFocus--;
            /*and and make the current item more visible:*/
            autoCompleteItems[EditorHelper.currentFocus].scrollIntoView({behavior: 'smooth', block: 'nearest', inline: 'nearest'});
            addActive(autoCompleteItems);
            e.preventDefault();
            break;
        case 'ArrowDown':
            EditorHelper.currentFocus++;
            /*and and make the current item more visible:*/
            autoCompleteItems[EditorHelper.currentFocus].scrollIntoView({behavior: 'smooth', block: 'nearest', inline: 'nearest'});
            addActive(autoCompleteItems);
            e.preventDefault();
            break;
    }
});

function addActive(autoCompleteItems) {

    // if no items in list, return
    if (!autoCompleteItems || !autoCompleteItems.length) return false;

    /*start by removing the "active" class on all items*/
    removeActive();
    if (EditorHelper.currentFocus >= autoCompleteItems.length) EditorHelper.currentFocus = 0;
    if (EditorHelper.currentFocus < 0) EditorHelper.currentFocus = (autoCompleteItems.length - 1);

    autoCompleteItems[EditorHelper.currentFocus].classList.add('list-item-active');
}

function removeActive() {
    if (document.querySelector('.list-item-active'))
        document.querySelector('.list-item-active').className = '';
}