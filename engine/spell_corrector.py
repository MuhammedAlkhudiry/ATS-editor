import re
from collections import Counter
import time


def text_to_words(text): return re.findall(r'\w*[ء-ي]\w*', text)


user_data = ['بل', 'ذهب', 'حمد', 'جل']


def read_dataset(): return open('./dataset/arabic_dataset_classifiction.csv', encoding='utf-8').read()


WORDS = Counter(text_to_words(read_dataset()))


def P(word, N=sum(WORDS.values())): return WORDS[word] / N


def correction(word):
    """Most probable spelling correction for word."""
    correctWords = dict()

    for word in candidates(word):
        correctWords[word] = P(word) + .01 if word in user_data else P(word)

    for word in correctWords:
        print(word)
    return sorted(candidates(word), key=P)[-3:]


def candidates(word):
    """Generate possible spelling corrections for word."""
    knownWord = known([word])
    knownWordFromEdits1 = known(edits1(word))
    knownWordFromEdits2 = known(edits2(word))
    if knownWord:
        return knownWord
    if knownWordFromEdits1:
        return knownWordFromEdits1
    if knownWordFromEdits2:
        return knownWordFromEdits2
    else:
        print('word not known!')
        return [word]


def known(words):
    """The subset of `words` that appear in the dictionary of WORDS."""
    return set(w for w in words if w in WORDS)


def edits1(word):
    letters = 'أبتثجحخدذرزسشصضطظعغفقكلمنهـوي'
    splits = [(word[:i], word[i:]) for i in range(len(word) + 1)]
    deletes = [L + R[1:] for L, R in splits if R]
    transposes = [L + R[1] + R[0] + R[2:] for L, R in splits if len(R) > 1]
    replaces = [L + c + R[1:] for L, R in splits if R for c in letters]
    inserts = [L + c + R for L, R in splits for c in letters]
    return set(deletes + transposes + replaces + inserts)


def edits2(word):
    return (e2 for e1 in edits1(word) for e2 in edits1(e1))


correction('حمد')
