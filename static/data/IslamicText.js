class IslamicText {
    constructor(requestedText = 'all') {
        if (requestedText === 'ayat') {
            return [fsx.readJson('./static/data/Q_with-tashkeel.json'),
                fsx.readJson('./static/data/Q_without-tashkeel.json'),
                fsx.readJson('./static/data/surahs.json')];

        } else if (requestedText === 'hadiths') {
            return [fsx.readJson('./static/data/Hadiths_with-tashkeel.json'), fsx.readJson('./static/data/Hadiths_without-tashkeel.json')];
        } else if (requestedText === 'all') {
            return [fsx.readJson('./static/data/Q_with-tashkeel.json'),
                fsx.readJson('./static/data/Q_without-tashkeel.json'),
                fsx.readJson('./static/data/surahs.json'),
                fsx.readJson('./static/data/Hadiths_with-tashkeel.json'),
                fsx.readJson('./static/data/Hadiths_without-tashkeel.json')];
        }
    }
}
