import React, { useContext, useEffect } from 'react';
import { AppContext } from "../App";

function Letter({ letterPos, attemptVal }) {
    const { 
        board, 
        correctWord, 
        currAttempt, 
        setDisableLetter, 
        setAlmostLetter, 
        setCorrectLetter } = useContext(AppContext);

    const letterStateArray = ["", "", "", "", ""];
    const correctWordLessCorrect = [];
    for (let i=0; i<5; i++) {
        let letter;
        letter = board[attemptVal][i];
        if (correctWord.toUpperCase()[i] === letter) {
            letterStateArray[i] = "correct";
        } else {
            correctWordLessCorrect.push(correctWord.toUpperCase()[i]);
        }
    }
    for (let i=0; i<5; i++) {
        let letter;
        letter = board[attemptVal][i];
        if (letterStateArray[i] !== "") {continue;}
        else if (correctWordLessCorrect.includes(letter)) {
            letterStateArray[i] = "almost";
            let index;
            index = correctWordLessCorrect.indexOf(letter);
            correctWordLessCorrect.splice(index,1);
        }
    }
    const currLetter = board[attemptVal][letterPos];

    const letterState = 
        currAttempt.attempt > attemptVal &&
        (letterStateArray[letterPos] === "correct" ? "correct" : letterStateArray[letterPos] === "almost" ? "almost" : "error");
    
    useEffect(() =>{
        if (letterState === "correct") {
            setCorrectLetter((prev) => [...prev, currLetter]);
        } else if (letterState === "almost") {
            setAlmostLetter((prev) => [...prev, currLetter]);
        } else if (currLetter !== "") {
            setDisableLetter((prev) => [...prev, currLetter]);
        } 
    }, [currAttempt.attempt])
    return (
        <div className="letter" id={letterState}>
            {" "}
            {currLetter}
        </div>
    );
}

export default Letter;