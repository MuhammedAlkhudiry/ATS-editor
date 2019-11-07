class AdvancedToolbar {
    constructor() {
        this.element = document.getElementById('advanced-toolbar-bar');
        this.element.addEventListener('click', this.clickedBar.bind(this));
        this.expandArrow = document.getElementById('expand-arrow');
        this.expandArrow.addEventListener('click', this.clickedArrow.bind(this));
        textBox.addEventListener('click', this.closeInsertBoxes.bind(this));
    }

    clickedBar(e) {
        let clickedIcon = e.target;
        let insertBox;
        if (clickedIcon !== this.element) {

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
                this.closeInsertBoxes();
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
            this.expandArrow.click();
        }
    }

    clickedArrow(e) {
        let isInsertBarOpen = this.element.classList.contains('slide-in');

        isInsertBarOpen ? this.expandArrow.classList.remove('down') : this.expandArrow.classList.add('down');
        this.closeInsertBoxes();
        this.element.setAttribute('class', isInsertBarOpen ? 'slide-out' : 'slide-in');
    }

    closeInsertBoxes() {
        document.querySelectorAll('.insert-box.show').forEach(box => box.className = 'insert-box');
        EditorHelper.currentFocus = -1;
    }



}

const advancedToolbar = new AdvancedToolbar();