let floatingMenu = document.getElementById('float-menu');
quill.on('selection-change', function () {
    if (window.getSelection().isCollapsed) return;

    let sel = window.getSelection(),
        rect = sel.getRangeAt(0).getBoundingClientRect();

    floatingMenu.style.top = `${rect.y - 30}px`;
    floatingMenu.style.left = `${rect.x - floatingMenu.clientWidth + rect.width}px`;

    floatingMenu.className = 'show';
});

window.addEventListener('mousedown', function () {
    floatingMenu.className = '';
});

/* ------------------------ float-tools functionality ----------------------- */

document.getElementById('float-tools-list').addEventListener('click', e => {
    let clickedTool = e.target;
    debugger
    const sel = window.getSelection();
    if (clickedTool.tagName === 'LI') {
        if (clickedTool.classList.contains('float-format')) {
            quill.format(clickedTool.dataset.value, true);
        } else if (clickedTool.classList.contains('float-color')) {
            quill.format('color', clickedTool.dataset.value);
        } else if (clickedTool.classList.contains('float-operation')) {
            document.execCommand(clickedTool.dataset.value);
        }
    }

    floatingMenu.className = '';
    window.getSelection().empty();

});
/* -------------------------------------------------------------------------- */


