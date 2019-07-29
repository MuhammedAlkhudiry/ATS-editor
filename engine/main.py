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
        
    let page = document.activeElement
    let children = page.children
    for (const child of children) {
      if (child.textContent.trim().length == 0) {
        child.parentElement.removeChild(child)
        
      }
      
    }

# global

# file variables
fileContent = []
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


def construct_word():
    global fileIndex
    word = ""
    while ArabicChars.search(fileContent[fileIndex]) or fileContent[fileIndex] in harakat:
        word += fileContent[fileIndex]
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


def analyze_word():
    global fileContent, lookahead, fileIndex

    # if file is empty.
    if len(fileContent) == fileIndex:
        return 'EOF'

    # ignore numbers and non-Arabic chars
    while fileContent[fileIndex].isdigit() or not ArabicChars.search(fileContent[fileIndex]):
        if fileContent[fileIndex] == 'EOF':
            break
        fileIndex += 1

    # if Arabic char.
    if ArabicChars.search(fileContent[fileIndex]):
        # تجميع الكلمة في حالة وجود حركات فيها
        word = construct_word()
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


def main():
    global fileContent, lookahead
    # open file then tokenize it
    with open(file="src/TextForPrecessing.txt", mode="r+", encoding="UTF-8") as file:
        # file.write("from py1, from py2, from py3")
        fileContent = re.split("([\\W])", file.read())
        fileContent.append('EOF')
        while fileContent[fileIndex] != 'EOF' and not lookahead == 'EOF':
            lookahead = analyze_word()
        # overwrite
        file.seek(0)
        if output:
            file.write(json.dumps(output, ensure_ascii=False))
            file.truncate()


main()

# collect an Arabic sentence in a list
# sentence = []
# while fileContent[fileIndex] not in [".", ',', 'EOF']:
#     sentence.append(fileContent[fileIndex])
#     fileIndex += 1
