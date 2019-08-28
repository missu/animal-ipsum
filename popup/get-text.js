import {words} from '../words/words.js';

// Adds the generated text to the DOM
function addTextToDom(generatedText) {
    const resultsNode = document.querySelector("#results");
    resultsNode.innerHTML = "";
    resultsNode.appendChild(generatedText);
}

// Takes in a number (with an optional minimun number) and returns a random number 
// within that range, including the min and max number.
function getRandomNum(min, max) {
    if (max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    } else {
        let max = min;
        return Math.floor(Math.random() * Math.floor(max));
    }
}

// Takes in a string, converts the first letter to uppercase and returns a string
function toUpperCase(word){
    const firstLetter = word[0];
    const uppercaseLetter = firstLetter.toUpperCase();
    return uppercaseLetter + word.substring(1);
}

// Creates and returns a sentence string based on list of imported words
function createSentence() {
    const numOfWords = getRandomNum(3,12);
    let sentence = "";
    const { properNouns, verbs, nouns, animals } = words;
    const subjects = [...properNouns, ...animals];
    let sentenceArry = [];

    while (sentenceArry.length < numOfWords) {
        sentenceArry = sentence.split(" ");
        if (sentenceArry.length % 4 === 0) {
            sentence += `${subjects[getRandomNum(subjects.length)]} ${verbs[getRandomNum(verbs.length)]} ${nouns[getRandomNum(nouns.length)]} `;
        } else if (sentenceArry.length % 2 === 0) {
            sentence += `${verbs[getRandomNum(verbs.length)]} `;
        } else {
            sentence += `${nouns[getRandomNum(nouns.length)]} `;
        }
        if (sentenceArry.length === 1) {
            sentence = toUpperCase(sentence);
        }
    }
    return sentence.trimRight() + ". "; 
}

// Takes in a number for number of paragraphs & sentence length and returns a DOM node containing lipsum text.
function generateLipsum(paramsObj) {
    const {paragraphLength, numOfParagraphs} = paramsObj;
    let paragraphs = "<p>";
    let lipsumText = "";
    const lipsumNode = document.createElement("div");
    lipsumNode.className = "lipsum-container";

    for (let i=0; i < numOfParagraphs; i++) {
        for (let j=0; j < paragraphLength; j++) {
            const space = (j < paragraphLength - 1 ) ? " " : "";
            paragraphs += createSentence() + space;
            if (i === paragraphLength) {paragraphs += "</p>";}
        }
        lipsumText += paragraphs;
        paragraphs = "<p>";
    }

    lipsumNode.innerHTML = lipsumText;
    return lipsumNode;
}

// Takes in a string of "short", "medium", or "long" and returns a number for the number of sentences in a paragraph.
function getParagraphlength(length) {
    const lengthRange = {
        "short" : [3,5],
        "medium" : [6,8],
        "long": [9,12]
    };
    return Math.floor(Math.random() * (lengthRange[length][1] - lengthRange[length][0] + 1)) + lengthRange[length][0];
}

// Event handler for the form submit event
function generateText(event) {
    event.preventDefault();
    const form = event.target;
    const paragraphLength = getParagraphlength(form.elements.paragraphLength.value);
    const numOfParagraphs = form.elements.numOfParagraphs.value;
    const lipsum = generateLipsum({paragraphLength, numOfParagraphs});
    addTextToDom(lipsum);
}

const form = document.getElementById('options');
form.addEventListener('submit', generateText);
