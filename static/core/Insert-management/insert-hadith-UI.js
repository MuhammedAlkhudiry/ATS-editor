let hadithInput = document.getElementById("hadith-input");
let hadithList;
hadithInput.addEventListener('input', function (e) {

    const searchedHadith = this.value;
    /*close any already open list*/
    closeCurrentList();

    if (!searchedHadith) return;

    currentFocus = -1;
    /*create a DIV element that will contain the items (values):*/
    hadithList = document.createElement('DIV');
    hadithList.id = 'hadith-list';
    hadithList.className = 'insert-list';
    hadithList.style.display = 'none';
    this.parentNode.appendChild(hadithList);

    /*for each item in the array...*/
    for (const [i, hadith] of hadiths_NoTashkeel.entries()) {
        if (hadith.content.trim().contains(searchedHadith.trim())) {
            /*create a DIV element for each matching element:*/
            let hadithListItem = document.createElement('DIV');

            hadithListItem.innerHTML = hadiths_Tashkeel[i].content.replace(searchedHadith, `<strong>${searchedHadith}</strong>`);

            hadithListItem.addEventListener('click', function (e) {

                /*insert hadith in editor*/
                new Inserter(this.textContent, 'hadith');
                closeCurrentList();
            });

            hadithList.appendChild(hadithListItem);
            hadithList.style.display = 'block';
            if (hadithList.childElementCount > 15) break;

        }
    }
});


hadithInput.addEventListener('keydown', function (e) {
    let hadithList = document.getElementById('hadith-list');
    if (!hadithList) return;
    let hadithListItems = hadithList.children;

    switch (e.key) {

        case "Enter":
            if (currentFocus > -1) {
                /*and simulate a click on the "active" item:*/
                if (hadithListItems) hadithListItems[currentFocus].click();
            }
            break;
        case "ArrowUp":
            currentFocus--;
            /*and and make the current item more visible:*/
            addActive(hadithListItems);
            e.preventDefault();
            break;
        case "ArrowDown":
            currentFocus++;
            /*and and make the current item more visible:*/
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
    if (currentFocus >= hadithListItems.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (hadithListItems.length - 1);

    hadithListItems[currentFocus].classList.add('insert-list-active');
}

function removeActive() {
    if (document.querySelector('.insert-list-active'))
        document.querySelector('.insert-list-active').className = '';
}

