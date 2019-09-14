let currentFocus;

// const hadiths_Tashkeel = JSON.parse(fs.readFileSync('./static/core/Insert-management/data/Hadiths_with-tashkeel.json').toString()),
//     hadiths_NoTashkeel = JSON.parse(fs.readFileSync('./static/core/Insert-management/data/Hadiths_without-tashkeel.json').toString()),
//     Ayat_Tashkeel = JSON.parse(fs.readFileSync('./static/core/Insert-management/data/Q_with-tashkeel.json').toString()),
//     Ayat_NoTashkeel = JSON.parse(fs.readFileSync('./static/core/Insert-management/data/Q_without-tashkeel.json').toString().trim()),
//     surahs = JSON.parse(fs.readFileSync('./static/core/Insert-management/data/surahs.json').toString());

const replaceInput = document.getElementById('replace-input');
const expandArrow = document.getElementById('expand-arrow');

const picker = new Datepicker(true, new HijriDate().getFullYear(), new HijriDate().getMonth(), 0, 'ar', 'blue');
picker.attachTo(document.getElementById('insert-date-box'));

document.getElementById('insert-bar').addEventListener('click', e => {

    let clickedIcon = e.target;
    let insertBox;
    if (clickedIcon !== insertBar) {

        switch (clickedIcon.id) {
            case 'insert-table':
                insertBox = document.getElementById('insert-table-box');
                break;
            case 'insert-ayah':
                insertBox = document.getElementById('insert-ayah-box');
                break;
            case 'insert-hadith':
                insertBox = document.getElementById('insert-hadith-box');
                break;
            case 'insert-poetry':
                insertBox = document.getElementById('insert-poetry-box');
                break;
            case 'insert-date':
                insertBox = document.getElementById('insert-date-box');
                break;
            case 'search-replace':
                insertBox = document.getElementById('search-box');
                break;
            default:
                return;
        }

        if (insertBox.className === 'insert-box show') {
            insertBox.className = 'insert-box';
            if (insertBox.id === 'search-box') Searcher.removeStyle();
        } else {
            closeInsertBoxes();
            insertBox.className = 'insert-box show';
            insertBox.focus();

            if (insertBox.id === 'search-box') {
                if (window.getSelection()) {
                    searchInput.value = window.getSelection().toString();
                    searchInput.select();
                }

            }
        }
    } else {
        expandArrow.click();
    }
});
document.addEventListener('click', function (e) {
    closeCurrentList();
});

function closeCurrentList() {
    document.querySelectorAll('.insert-list').forEach(list => list.parentElement.removeChild(list));
}

quillEditor.addEventListener('mouseover', e => {
    if (e.target.classList.contains('ql-ayah')) {
        // remove brackets.
        let ayahText = e.target.textContent.slice(2, -2);
        for (const ayah of Ayat_Tashkeel) {
            if (ayah.content === ayahText) {
                for (const surah of surahs) {
                    if (ayah.surah_number === surah.number) {
                        tippy(e.target, {
                            content: ` الآية: ${ayah.verse_number} <br> ${surah.name}`,
                        });
                    }
                }
            }
        }

    } else if (e.target.classList.contains('ql-hadith')) {
        // remove brackets.
        let hadithText = e.target.textContent.slice(1, -1);
        for (const hadith of hadiths_Tashkeel) {
            if (hadith.content === hadithText) {
                let hadithCollections = hadith.collections.join(' و');
                tippy(e.target, {
                    content: ` رقم الحديث: ${hadith.number} <br> رواه ${hadithCollections} <br> الراوي: ${hadith.narrator} <br> صحة الحديث: ${hadith.authenticity}`,
                });
            }
        }
    }
});


expandArrow.addEventListener('click', function () {
    let isInsertBarOpen = insertBar.classList.contains('slide-in');

    isInsertBarOpen ? this.classList.remove('down') : this.classList.add('down');

    closeInsertBoxes();
    insertBar.setAttribute('class', isInsertBarOpen ? 'slide-out' : 'slide-in');
});

textBox.addEventListener('dblclick', () => closeInsertBoxes());

function closeInsertBoxes() {
    document.querySelectorAll('.insert-box.show').forEach(box => box.className = 'insert-box');

}


