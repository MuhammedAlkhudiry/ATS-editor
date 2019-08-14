import re
import json
import ArabicGrammerData as ArabicData


# classes
class Verb:
    def __init__(self, vtype):
        # ماض أو مضارع أو أمر
        self.vtype = vtype


class Noun:
    def __init__(self):
        pass

# global


# file variables
fileIndex = 0
lookahead = ''
# signs that means that the word/sentence is ended
# and the program should stop reading.
endSigns = [".", ',', "؟", "،", "!", 'EOF', ' ']
output = dict()

# Arabic variables
ArabicChars = re.compile('[ا-ي]+')
harakat = ['َ ', 'ً ', 'ُ ', 'ٌ ', 'ِ ', 'ٍ ']


def isHaraf(word):
    for i in ArabicData.hofor.values():
        if word in i:
            return True
    return False


def isVerb(word):
    for i in ArabicData.afal.values():
        if word in i:
            return True
    return False


def construct_word(text):
    global fileIndex
    word = ""
    while ArabicChars.search(text[fileIndex]) or text[fileIndex] in harakat:
        word += text[fileIndex]
        fileIndex += 1
    return word


def error(word, errType):
    output[word] = errType


def isNoun(word):
    for i in ArabicData.asma.values():
        if word in i:
            return True
    # TODO search in user dict
    return False


def analyze_word(text):
    global lookahead, fileIndex

    # if file is empty.
    if len(text) == fileIndex:
        return 'EOF'

    # ignore numbers and non-Arabic chars
    while text[fileIndex].isdigit() or not ArabicChars.search(text[fileIndex]):
        if text[fileIndex] == 'EOF':
            break
        fileIndex += 1

    # if Arabic char.
    if ArabicChars.search(text[fileIndex]):
        # تجميع الكلمة في حالة وجود حركات فيها
        word = construct_word(text)
        # if a word is <= 4 then check if it haraf
        if len(word) <= 4 and word != " ":
            if isHaraf(word):
                return
        if len(word) <= 6 and word != " ":
            if isVerb(word):
                return
        if isNoun(word):
            return
        else:
            error(word, "spelling error")


def checkHaraka():
    pass


def removeHaraka():
    pass


def analyze(text):
    global lookahead, fileIndex, output
    # open file then tokenize it
    text = re.split("([\\W])", text)
    text.append('EOF')
    while text[fileIndex] != 'EOF' and not lookahead == 'EOF':
        lookahead = analyze_word(text)
    fileIndex = 0
    currentOutput = output
    output = dict()
    return currentOutput

