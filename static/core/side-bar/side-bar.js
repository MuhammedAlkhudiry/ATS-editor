const openSideBarIcon = document.getElementById('open-side-bar-icon');
const sideBar = document.getElementById('side-bar');
const sideBarContainer = sideBar.parentElement;
const saveIcon = document.getElementById('save-file');

openSideBarIcon.addEventListener('click', e => {
    openSideBarIcon.classList.toggle('show');
    sideBar.classList.toggle('show');
    sideBarContainer.classList.toggle('show');
    if (!sideBarContainer.classList.contains('show'))
        extensionsMenu.classList.replace('show', 'hide');
});

saveIcon.addEventListener('click', (e) => {
    extensionsMenu.classList.toggle('show');
    extensionsMenu.classList.toggle('hide');
});

document.addEventListener('click', (e) => {
    if (['UL', 'LI'].includes(e.target.tagName) || e.target === openSideBarIcon || !sideBarContainer.classList.contains('show')) return;
    openSideBarIcon.click();
});
