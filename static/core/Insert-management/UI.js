const Inserter = require('./../static/core/Insert-management/Inserter');
const Ayat_Tashkeel = require('./../static/core/Insert-management/data/Q_with-tashkeel');
const Ayat_NoTashkeel = require('./../static/core/Insert-management/data/Q_without-tashkeel');


let ayahInput = document.getElementById("ayah-input");
let InsertAyahButton = document.getElementById("insert-ayah");
let insertAyahBox = document.getElementById('insert-ayah-box');
let currentFocus;
let ayahList;

InsertAyahButton.addEventListener('click', e => {

    if (insertAyahBox.style.opacity === '1') insertAyahBox.style.opacity = '0';
    else insertAyahBox.style.opacity = '1';

});

ayahInput.addEventListener('input', function (e) {

    const searchedAyah = this.value;
    /*close any already open list*/
    closeCurrentList();

    if (!searchedAyah) return;

    currentFocus = -1;
    /*create a DIV element that will contain the items (values):*/
    ayahList = document.createElement('DIV');
    ayahList.id = 'ayah-list';
    ayahList.style.display = 'none';
    this.parentNode.appendChild(ayahList);

    if (ayahList.childElementCount > 5) return;

    /*for each item in the array...*/
    for (const [i, ayah] of Ayat_NoTashkeel.entries()) {
        if (ayah.content.trim().contains(searchedAyah.trim())) {
            /*create a DIV element for each matching element:*/
            let ayahListItem = document.createElement('DIV');

            ayahListItem.innerHTML = Ayat_Tashkeel[i].content.replace(searchedAyah, `<strong>${searchedAyah}</strong>`);

            /*execute a function when someone clicks on the item value (DIV element):*/
            ayahListItem.addEventListener('click', function (e) {

                /*insert ayah in editor*/
                new Inserter(this.textContent, 'ayah');
                closeCurrentList();
            });

            ayahList.appendChild(ayahListItem);
            ayahList.style.display = 'block';
            if (ayahList.childElementCount > 15) break;

        }
    }
});

ayahInput.addEventListener('keydown', function (e) {
    let ayahList = document.getElementById('ayah-list');
    if (!ayahList) return;
    let ayahListItems = ayahList.children;

    switch (e.key) {

        case "Enter":
            if (currentFocus > -1) {
                /*and simulate a click on the "active" item:*/
                if (ayahListItems) ayahListItems[currentFocus].click();
            }
            break;
        case "ArrowUp":
            currentFocus--;
            /*and and make the current item more visible:*/
            addActive(ayahListItems);
            e.preventDefault();
            break;
        case "ArrowDown":
            currentFocus++;
            /*and and make the current item more visible:*/
            addActive(ayahListItems);
            e.preventDefault();
            break;
    }

});


function addActive(ayahListItems) {
    /*a function to classify an item as "active":*/
    if (!ayahListItems) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(ayahListItems);
    if (currentFocus >= ayahListItems.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (ayahListItems.length - 1);

    ayahListItems[currentFocus].classList.add('ayah-active');
}

function removeActive() {
    if (document.querySelector('.ayah-active'))
        document.querySelector('.ayah-active').className = '';
}

function closeCurrentList() {
    if (insertAyahBox.lastElementChild.id === 'ayah-list') {
        insertAyahBox.lastElementChild.remove();
    }
}

document.addEventListener('click', function (e) {
    closeCurrentList();

});
