let ayahInput = document.getElementById('ayah-input');
let ayahList;


ayahInput.addEventListener('input', function () {

    const searchedAyah = this.value;
    /*close any already open list*/
    closeCurrentList();

    if (!searchedAyah) return;

    EditorHelper.currentFocus = -1;
    /*create a DIV element that will contain the items (values):*/
    ayahList = document.createElement('DIV');
    ayahList.id = 'ayah-list';
    ayahList.className = 'insert-list';
    ayahList.style.display = 'none';
    this.parentNode.appendChild(ayahList);

    /*for each item in the array...*/
    for (const [i, ayah] of Ayat_NoTashkeel.entries()) {
        if (ayah.content.trim().contains(searchedAyah.trim())) {
            setTimeout(() => {
                /*create a DIV element for each matching element:*/
                let ayahListItem = document.createElement('DIV');

                ayahListItem.innerHTML = Ayat_Tashkeel[i].content.replace(searchedAyah, `<strong>${searchedAyah}</strong>`);
                ayahListItem.dataset.AyahNumber = Ayat_Tashkeel[i].surah_number;
                ayahListItem.dataset.surahNumber = Ayat_Tashkeel[i].verse_number;
                for (const surah of surahs) {
                        if (parseInt(ayahListItem.dataset.surahNumber) === surah.number) {
                            ayahListItem.dataset.surahName = surah.name;
                        }
                }
                ayahListItem.addEventListener('click', function (e) {

                    /*insert ayah in editor*/
                    new Inserter(this.textContent, 'ayah', {
                        ayahNumber: ayahListItem.dataset.AyahNumber,
                        surahNumber: ayahListItem.dataset.surahNumber,
                        surahName: ayahListItem.dataset.surahName
                    });
                    closeCurrentList();
                });

                ayahList.appendChild(ayahListItem);
                ayahList.style.display = 'block';
            }, 0);
        }
    }
});

ayahInput.addEventListener('keydown', function (e) {
    let ayahList = document.getElementById('ayah-list');
    if (!ayahList) return;
    let ayahListItems = ayahList.children;

    switch (e.key) {

        case 'Enter':
            if (EditorHelper.currentFocus > -1) {
                /*and simulate a click on the "active" item:*/
                if (ayahListItems) ayahListItems[EditorHelper.currentFocus].click();
            }
            break;
        case 'ArrowUp':
            EditorHelper.currentFocus--;
            /*and and make the current item more visible:*/
            addActive(ayahListItems);
            ayahListItems[EditorHelper.currentFocus].scrollIntoView({behavior: 'smooth', block: 'nearest', inline: 'nearest'});
            e.preventDefault();
            break;
        case 'ArrowDown':
            EditorHelper.currentFocus++;
            /*and and make the current item more visible:*/
            addActive(ayahListItems);
            ayahListItems[EditorHelper.currentFocus].scrollIntoView({behavior: 'smooth', block: 'nearest', inline: 'nearest'});
            e.preventDefault();
            break;
    }
});

function addActive(ayahListItems) {

    // if no items in list, return
    if (!ayahListItems || !ayahListItems.length) return false;

    /*start by removing the "active" class on all items*/
    removeActive(ayahListItems);
    if (EditorHelper.currentFocus >= ayahListItems.length) EditorHelper.currentFocus = 0;
    if (EditorHelper.currentFocus < 0) EditorHelper.currentFocus = (ayahListItems.length - 1);

    ayahListItems[EditorHelper.currentFocus].classList.add('list-item-active');
}

function removeActive() {
    if (document.querySelector('.list-item-active'))
        document.querySelector('.list-item-active').className = '';
}
