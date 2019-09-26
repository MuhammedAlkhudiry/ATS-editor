const hadiths_Tashkeel = fsx.readJsonSync('./static/core/Insert-management/data/Hadiths_with-tashkeel.json'),
    hadiths_NoTashkeel = fsx.readJsonSync('./static/core/Insert-management/data/Hadiths_without-tashkeel.json'),
    Ayat_Tashkeel = fsx.readJsonSync('./static/core/Insert-management/data/Q_with-tashkeel.json'),
    Ayat_NoTashkeel = fsx.readJsonSync('./static/core/Insert-management/data/Q_without-tashkeel.json'),
    surahs = fsx.readJsonSync('./static/core/Insert-management/data/surahs.json');

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
    const hoveredElement = e.target;
    if (hoveredElement.classList.contains('ql-ayah')) {
        tippy(hoveredElement, {
            content: ` الآية: ${hoveredElement.dataset.ayahNumber} <br> ${hoveredElement.dataset.surahName}`,
        });

    } else if (hoveredElement.classList.contains('ql-hadith')) {

        tippy(hoveredElement, {
            content: ` رقم الحديث: ${hoveredElement.dataset.hadithNumber} <br> رواه ${hoveredElement.dataset.collections} <br> الراوي: ${hoveredElement.dataset.narrator} <br> صحة الحديث: ${hoveredElement.dataset.authenticity}`,
        });
    }
});


expandArrow.addEventListener('click', function () {
    let isInsertBarOpen = insertBar.classList.contains('slide-in');

    isInsertBarOpen ? this.classList.remove('down') : this.classList.add('down');

    closeInsertBoxes();
    insertBar.setAttribute('class', isInsertBarOpen ? 'slide-out' : 'slide-in');
});

textBox.addEventListener('dblclick', () => closeInsertBoxes());

const closeInsertBoxes = () => {
    document.querySelectorAll('.insert-box.show').forEach(box => box.className = 'insert-box');
    EditorHelper.currentFocus = -1;
};


