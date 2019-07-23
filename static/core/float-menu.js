let ele = document.getElementById('float-menu');
window.addEventListener('mouseup', function () {

    // no text selected..
    if (window.getSelection().isCollapsed) return;

    let sel = window.getSelection(),
        rect = sel.getRangeAt(0).getBoundingClientRect();
    ele.style.top = `${rect.y + 20}px`;
    ele.style.left = `${rect.x - ele.clientWidth / 2 + rect.width / 2}px`;

    ele.className = 'hdn'
});

window.addEventListener('mousedown', function () {
    ele.className = '';
});

/* ------------------------ float-tools functionality ----------------------- */

let floatToolList = document.getElementById('float-tools-list').addEventListener('click', e => {
    let clickedTool = e.target;
    console.log(clickedTool);
    if (clickedTool.tagName === 'LI') {

        if (clickedTool.classList.contains('float-format')) {
            quill.format(clickedTool.dataset.value, true)
        }
        else if (clickedTool.classList.contains('float-color')) {
            quill.format('color', clickedTool.dataset.value)
        }
    }

    ele.className = ''
    window.getSelection().empty();

})
/* -------------------------------------------------------------------------- */


