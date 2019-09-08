const footer = document.getElementById('footer');
const currentZoomElement = document.getElementById('current-zoom');
const zoomButtons = document.querySelectorAll('.zoom-button');

footer.addEventListener('click', e => {

    // if clicked not increase-zoom or decrease-zoom, return
    if (!['increase-zoom', 'decrease-zoom'].includes(e.target.id)) return true;

    const clickedBtn = e.target;
    const currentZoom = parseInt(currentZoomElement.textContent);
    let newZoom;
    if (clickedBtn.id === 'increase-zoom') {
        newZoom = EditorHelper.zoomTypes[EditorHelper.zoomTypes.indexOf(currentZoom) + 1];


    } else if (clickedBtn.id === 'decrease-zoom') {
        newZoom = EditorHelper.zoomTypes[EditorHelper.zoomTypes.indexOf(currentZoom) - 1];

    }
    setZoomButtonsStatus(newZoom, clickedBtn);

    quillEditor.className = `ql-editor zoom-${newZoom}`;
    currentZoomElement.textContent = `${newZoom}%`;

});

const setZoomButtonsStatus = (newZoom, clickedBtn) => {

    newZoom === 200 || newZoom === 50 ?
        clickedBtn.classList.add('disabled') :
        zoomButtons.forEach(btn => btn.classList.remove('disabled'));
};