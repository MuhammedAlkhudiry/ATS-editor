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
    ele.className = ''
});


