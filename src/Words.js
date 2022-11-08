import wordBank from './wordle-bank.txt';
import answerBank from './answer-bank.txt';
export const boardDefault = [
    ["", "", "", "", ""], 
    ["", "", "", "", ""], 
    ["", "", "", "", ""], 
    ["", "", "", "", ""], 
    ["", "", "", "", ""], 
    ["", "", "", "", ""],
];

export const ValidWordSet = async () => {
    let wordSet;
    let todaysWord;
    await fetch(wordBank)
        .then((response) => response.text())
        .then((result) => {
            let wordArr;
            wordArr = result.split('\r\n\n');
            todaysWord = wordArr[Math.floor(Math.random() * wordArr.length)]
            wordSet = new Set(wordArr)
        });
    return { wordSet }
}

export const AnswerWordSet = async () => {
    let todaysWord;
    await fetch(answerBank)
        .then((response) => response.text())
        .then((result) => {
            let wordArr;
            wordArr = result.split('\r\n');
            todaysWord = wordArr[Math.floor(Math.random() * wordArr.length)]
        });
    return { todaysWord }
}