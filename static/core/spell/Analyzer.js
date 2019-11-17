class Analyzer {

    constructor() {
        this.letters = 'أبتثجحخدذرزسشصضطظعغفقكلمنهـوي'.split('');
        this.nWords = {};
        fsx.readFile('./static/data/arabic_dataset_classifiction.csv').then(text => {
            const words = text.toString().match(/[ء-ي]+/g);
            for (let word of words) {
                if (this.nWords.hasOwnProperty(word)) {
                    this.nWords[word] += 1;
                } else {
                    this.nWords[word] = 1;
                }
            }
        });
    }

    edits = (word) => {
        const results = [];
        for (let i = 0; i < word.length; i++)
            results.push(word.slice(0, i) + word.slice(i + 1));
        for (let i = 0; i < word.length - 1; i++)
            results.push(word.slice(0, i) + word.slice(i + 1, i + 2) + word.slice(i, i + 1) + word.slice(i + 2));
        for (let i = 0; i < word.length; i++)
            this.letters.forEach((l) => results.push(word.slice(0, i) + l + word.slice(i + 1)));
        for (let i = 0; i <= word.length; i++)
            this.letters.forEach((l) => results.push(word.slice(0, i) + l + word.slice(i)));
        return results;
    };

    suggest = (word) => {
        if (word in this.nWords) return word;
        const candidates = {}, list = this.edits(word);
        list.forEach((edit) => {
            if (edit in this.nWords) candidates[this.nWords[edit]] = edit;
        });
        if (Object.keys(candidates).length > 0) return candidates;
        list.forEach((edit) => {
            this.edits(edit).forEach((w) => {
                if (w in this.nWords) candidates[this.nWords[w]] = w;
            });
        });
        return 'word not found';
    };
}


const analyzer = new Analyzer();