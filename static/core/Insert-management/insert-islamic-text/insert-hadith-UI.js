let hadithInput = document.getElementById('hadith-input');
let hadithList;
hadithInput.addEventListener('input', function (e) {

    const searchedHadith = this.value;
    /*close any already open list*/
    closeCurrentList();

    if (!searchedHadith) return;

    EditorHelper.currentFocus = -1;
    /*create a DIV element that will contain the items (values):*/
    hadithList = document.createElement('DIV');
    hadithList.id = 'hadith-list';
    hadithList.className = 'insert-list';
    hadithList.style.display = 'none';
    this.parentNode.appendChild(hadithList);

    /*for each item in the array...*/
    for (const [i, hadith] of hadiths_NoTashkeel.entries()) {
        if (hadith.content.trim().contains(searchedHadith.trim())) {
            setTimeout(() => {
                let hadithListItem = document.createElement('DIV');
                debugger
                hadithListItem.innerHTML = hadiths_Tashkeel[i].content.replace(searchedHadith, `<strong>${searchedHadith}</strong>`);
                hadithListItem.dataset.authenticity = hadiths_Tashkeel[i].authenticity;
                hadithListItem.dataset.collections = hadiths_Tashkeel[i].collections.join(' و');
                hadithListItem.dataset.narrator = hadiths_Tashkeel[i].narrator;
                hadithListItem.dataset.hadithNumber = hadiths_Tashkeel[i].number;

                hadithListItem.addEventListener('click', function (e) {

                    /*insert hadith in editor*/
                    new Inserter(this.textContent, 'hadith', {
                        authenticity: hadithListItem.dataset.authenticity,
                        collections: hadithListItem.dataset.collections,
                        narrator: hadithListItem.dataset.narrator,
                        hadithNumber: hadithListItem.dataset.hadithNumber
                    });
                    closeCurrentList();
                });

                hadithList.appendChild(hadithListItem);
                hadithList.style.display = 'block';

            }, 0);
        }
    }
});


hadithInput.addEventListener('keydown', function (e) {
    let hadithList = document.getElementById('hadith-list');
    if (!hadithList) return;
    let hadithListItems = hadithList.children;

    switch (e.key) {

        case 'Enter':
            if (EditorHelper.currentFocus > -1) {
                /*and simulate a click on the "active" item:*/
                if (hadithListItems) hadithListItems[EditorHelper.currentFocus].click();
            }
            break;
        case 'ArrowUp':
            EditorHelper.currentFocus--;
            /*and and make the current item more visible:*/
            hadithListItems[EditorHelper.currentFocus].scrollIntoView({behavior: 'smooth', block: 'nearest', inline: 'nearest'});
            addActive(hadithListItems);
            e.preventDefault();
            break;
        case 'ArrowDown':
            EditorHelper.currentFocus++;
            /*and and make the current item more visible:*/
            hadithListItems[EditorHelper.currentFocus].scrollIntoView({behavior: 'smooth', block: 'nearest', inline: 'nearest'});
            addActive(hadithListItems);
            e.preventDefault();
            break;
    }
});


function addActive(hadithListItems) {

    // if no items in list, return
    if (!hadithListItems || !hadithListItems.length) return false;

    /*start by removing the "active" class on all items*/
    removeActive(hadithListItems);
    if (EditorHelper.currentFocus >= hadithListItems.length) EditorHelper.currentFocus = 0;
    if (EditorHelper.currentFocus < 0) EditorHelper.currentFocus = (hadithListItems.length - 1);

    hadithListItems[EditorHelper.currentFocus].classList.add('list-item-active');
}

function removeActive() {
    if (document.querySelector('.list-item-active'))
        document.querySelector('.list-item-active').className = '';
}

