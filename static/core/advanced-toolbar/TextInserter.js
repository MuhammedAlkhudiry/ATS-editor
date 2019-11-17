class TextInserter {
    constructor() {
        this.datePicker = new Datepicker(true, new HijriDate().getFullYear(), new HijriDate().getMonth(), 0, 'ar', 'blue');
        this.datePicker.attachTo(document.getElementById('insert-date-box'));
        this.datePicker.onPicked =
            () => this.insertText(` ${this.datePicker.getPickedDate().getDateString()}، الموافق ${this.datePicker.getOppositePickedDate().getDateString()} `);

        textBox.addEventListener('click', this.closeCurrentList.bind(this));

        this.ayahInput = document.getElementById('ayah-input');
        this.hadithInput = document.getElementById('hadith-input');

        this.ayahInput.addEventListener('input', this.searchText.bind(this, new IslamicText('ayat')));
        this.ayahInput.addEventListener('keydown', this.navigateText.bind(this));

        this.hadithInput.addEventListener('input', this.searchText.bind(this, new IslamicText('hadiths')));
        this.hadithInput.addEventListener('keydown', this.navigateText.bind(this));
    }

    insertText(text, textType, textDetails = null) {
        if (textDetails)
            if (textType === 'Ayah')
                quill.insertText(quill.getSelection(true), `﴿ ${text} ﴾`, 'Ayah', textDetails);
            else
                quill.insertText(quill.getSelection(true), `(${text})`, 'Hadith', textDetails);
        // for date...
        else
            quill.insertText(quill.getSelection(true), `${text}`);

        advancedToolbar.closeInsertBoxes();
    }


    searchText(textPromises, e) {
        Promise.all(textPromises).then(islamicText => {

            if (!e.target.value) return;

            const inputElement = e.target;
            const searchedText = inputElement.value;
            const ayahOrHadith = islamicText.length === 3 ? 'ayah' : 'hadith';
            let textToSearch = {
                withTashkeel: islamicText[0],
                withoutTashkeel: islamicText[1],
            };
            if (ayahOrHadith === 'ayah')
                textToSearch = {...textToSearch, surahs: islamicText[2]};

            islamicText = null;

            this.closeCurrentList();

            EditorHelper.currentFocus = -1;
            const textList = document.createElement('DIV');
            textList.id = 'ayah-list';
            textList.className = 'insert-list';
            textList.style.display = 'none';
            inputElement.parentNode.appendChild(textList);

            for (const [i, text] of Object.entries(textToSearch.withoutTashkeel)) {
                if (text.content.trim().contains(searchedText.trim())) {
                    setTimeout(() => {
                        let textListItem = document.createElement('DIV');
                        textListItem.innerHTML =
                            textToSearch.withTashkeel[i].content.replace(searchedText, `<strong style="color: var(--danger)">${searchedText}</strong>`);
                        if (ayahOrHadith === 'ayah') {
                            textListItem.dataset.AyahNumber = textToSearch.withTashkeel[i].surah_number;
                            textListItem.dataset.surahNumber = textToSearch.withTashkeel[i].verse_number;
                        } else {
                            textListItem.dataset.authenticity = textToSearch.withTashkeel[i].authenticity;
                            textListItem.dataset.collections = textToSearch.withTashkeel[i].collections.join(' و');
                            textListItem.dataset.narrator = textToSearch.withTashkeel[i].narrator;
                            textListItem.dataset.hadithNumber = textToSearch.withTashkeel[i].number;
                        }
                        textListItem.addEventListener('click', () => {

                            /*insert text in editor*/
                            if (ayahOrHadith === 'ayah') {
                                for (const surah of textToSearch.surahs) {
                                    debugger
                                    if (parseInt(textListItem.dataset.surahNumber) === surah.number) {
                                        textListItem.dataset.surahName = surah.name;
                                        break;
                                    }
                                }
                                this.insertText(textListItem.textContent, 'Ayah', {
                                    ayahNumber: textListItem.dataset.AyahNumber,
                                    surahNumber: textListItem.dataset.surahNumber,
                                    surahName: textListItem.dataset.surahName
                                });

                            } else {

                                this.insertText(textListItem.textContent, 'Hadith', {
                                    authenticity: textListItem.dataset.authenticity,
                                    collections: textListItem.dataset.collections,
                                    narrator: textListItem.dataset.narrator,
                                    hadithNumber: textListItem.dataset.hadithNumber
                                });
                            }
                            this.closeCurrentList();
                        });

                        textList.appendChild(textListItem);
                        textList.style.display = 'block';
                    }, 0);
                }
            }
        });
    }

    navigateText(e) {
        const textList = document.getElementById('ayah-list') || document.getElementById('hadith-list');
        if (!textList || textList.children.length === 0) return;
        const textListItems = textList.children;

        switch (e.key) {

            case 'Enter':
                if (EditorHelper.currentFocus > -1) {
                    if (textListItems) textListItems[EditorHelper.currentFocus].click();
                }
                break;
            case 'ArrowUp':
                EditorHelper.currentFocus--;
                this.addActive(textListItems);
                textListItems[EditorHelper.currentFocus].scrollIntoView({behavior: 'smooth', block: 'nearest', inline: 'nearest'});
                e.preventDefault();
                break;
            case 'ArrowDown':
                EditorHelper.currentFocus++;
                this.addActive(textListItems);
                textListItems[EditorHelper.currentFocus].scrollIntoView({behavior: 'smooth', block: 'nearest', inline: 'nearest'});
                e.preventDefault();
                break;
        }
    }

    addActive(listItems) {

        // if no items in list, return
        if (!listItems || !listItems.length) return false;

        /*start by removing the "active" class on all items*/
        this.removeActive(listItems);
        if (EditorHelper.currentFocus >= listItems.length) EditorHelper.currentFocus = 0;
        if (EditorHelper.currentFocus < 0) EditorHelper.currentFocus = (listItems.length - 1);

        listItems[EditorHelper.currentFocus].classList.add('list-item-active');
    }

    removeActive() {
        if (document.querySelector('.list-item-active'))
            document.querySelector('.list-item-active').className = '';
    }

    closeCurrentList() {
        document.querySelectorAll('.insert-list').forEach(list => list.parentElement.removeChild(list));
    }

}

const textInserter = new TextInserter();