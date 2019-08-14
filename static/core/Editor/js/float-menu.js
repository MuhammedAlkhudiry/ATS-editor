let ele = document.getElementById('float-menu');
quill.on('selection-change', function () {

    // no text selected..
    if (window.getSelection().isCollapsed) return;

    let sel = window.getSelection(),
        rect = sel.getRangeAt(0).getBoundingClientRect();

    ele.style.top = `${rect.y + 20}px`;
    ele.style.left = `${rect.x - ele.clientWidth + rect.width}px`;

    ele.className = 'show'
});

window.addEventListener('mousedown', function () {
    ele.className = '';
});

/* ------------------------ float-tools functionality ----------------------- */

document.getElementById('float-tools-list').addEventListener('click', e => {
    let clickedTool = e.target;
    if (clickedTool.tagName === 'LI') {
        if (clickedTool.classList.contains('float-format')) {
            quill.format(clickedTool.dataset.value, true)
        } else if (clickedTool.classList.contains('float-color')) {
            quill.format('color', clickedTool.dataset.value)
        }
    }

    ele.className = '';
    window.getSelection().empty();

});
/* -------------------------------------------------------------------------- */


