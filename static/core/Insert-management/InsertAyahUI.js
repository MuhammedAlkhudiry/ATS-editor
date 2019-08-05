let ayahInput = document.getElementById("ayah-input");
let ayahList;


ayahInput.addEventListener('input', function (e) {

    const searchedAyah = this.value;
    /*close any already open list*/
    closeCurrentList();

    if (!searchedAyah) return;

    currentFocus = -1;
    /*create a DIV element that will contain the items (values):*/
    ayahList = document.createElement('DIV');
    ayahList.id = 'ayah-list';
    ayahList.className = 'insert-list';
    ayahList.style.display = 'none';
    this.parentNode.appendChild(ayahList);

    /*for each item in the array...*/
    for (const [i, ayah] of Ayat_NoTashkeel.entries()) {
        if (ayah.content.trim().contains(searchedAyah.trim())) {
            /*create a DIV element for each matching element:*/
            let ayahListItem = document.createElement('DIV');

            ayahListItem.innerHTML = Ayat_Tashkeel[i].content.replace(searchedAyah, `<strong>${searchedAyah}</strong>`);

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

    // if no items in list, return
    if (!ayahListItems || !ayahListItems.length) return false;

    /*start by removing the "active" class on all items*/
    removeActive(ayahListItems);
    if (currentFocus >= ayahListItems.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (ayahListItems.length - 1);

    ayahListItems[currentFocus].classList.add('insert-list-active');
}

function removeActive() {
    if (document.querySelector('.insert-list-active'))
        document.querySelector('.insert-list-active').className = '';
}
