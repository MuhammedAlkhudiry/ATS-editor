 class Hadith {
    // رقم الحديث
    number;
    // كتاب الحديث
    collection;
    // راوي الحديث
    narrator;
    // صحة الحديث
    authenticity;

    constructor(number, collection, narrator, authenticity) {
        this.number = number;
        this.collection = collection;
        this.narrator = narrator;
        this.authenticity = authenticity;
    }

};