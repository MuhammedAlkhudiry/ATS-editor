const openSideBarIcon = document.getElementById('open-side-bar-icon');
const sideBar = document.getElementById('side-bar');
const sideBarContainer = sideBar.parentElement;

openSideBarIcon.addEventListener('click', e => {
    openSideBarIcon.classList.toggle('show');
    sideBar.classList.toggle('show');
    sideBarContainer.classList.toggle('show');
});
