module.exports = class Ayah {

    // سورة الآية
    surah;
    // جزء الآية
    juz;
    // رقم الآية
    number;

    constructor(surah, juz, number) {
        this.surah = surah;
        this.juz = juz;
        this.number = number;
    }
};

