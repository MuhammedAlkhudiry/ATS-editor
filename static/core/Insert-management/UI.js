let currentFocus;

document.getElementById('insert-bar').addEventListener('click', e => {

    let clickedIcon = e.target;
    let insertBox;
    if (clickedIcon.classList.contains('insert-icon')) {

        if (clickedIcon.id === 'insert-ayah') {
            insertBox = document.getElementById('insert-ayah-box');
        } else if (clickedIcon.id === 'insert-hadith') {
            insertBox = document.getElementById('insert-hadith-box');
        } else if (clickedIcon.id === 'insert-poetry') {
            insertBox = document.getElementById('insert-poetry-box');
        }

        if (insertBox.className === 'insert-box show') {

            insertBox.className = 'insert-box';
        } else {
            document.querySelectorAll('.insert-box.show').forEach(box => box.className = 'insert-box');
            insertBox.className = 'insert-box show';
        }
    }

});
document.addEventListener('click', function (e) {
    closeCurrentList();
});

function closeCurrentList() {
    document.querySelectorAll('.insert-list').forEach(list => list.parentElement.removeChild(list));
}


document.getElementsByClassName('ql-editor')[0].addEventListener('mouseover', e => {
    if (e.target.classList.contains('ql-ayah')) {
        // remove brackets.
        let ayahText = e.target.textContent.slice(2, -2);
        for (const ayah of Ayat_Tashkeel) {
            if (ayah.content === ayahText) {
                for (const surah of surahs) {
                    if (ayah.surah_number === surah.number) {
                        tippy(e.target, {
                            content: ` الآية: ${ayah.verse_number} <br> ${surah.name}`,
                        })
                    }
                }
            }
        }

    } else if (e.target.classList.contains('ql-hadith')) {
        // remove brackets.
        let hadithText = e.target.textContent.slice(2, -2);
        for (const hadith of hadiths_Tashkeel) {
            if (hadith.content === hadithText) {
                let hadithCollections = hadith.collections.join(' و');
                tippy(e.target, {
                    content: ` رقم الحديث: ${hadith.number} <br> رواه ${hadithCollections} <br> الراوي: ${hadith.narrator} <br> صحة الحديث ${hadith.authenticity}`,
                })
            }
        }
    }
});