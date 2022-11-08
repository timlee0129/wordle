import './App.css';
import Board from './components/Board';
import Keyboard from './components/Keyboard';
import GameOver from './components/GameOver';
import { createContext, useEffect, useState } from "react";
import { boardDefault, ValidWordSet, AnswerWordSet } from './Words';

export const AppContext = createContext();

function App() {
    const [board, setBoard] = useState(boardDefault);
    const [currAttempt, setCurrAttempt] = useState({ attempt: 0, letterPos: 0 });
    const [wordSet, setWordSet] = useState(new Set());
    const [disabledLetters, setDisableLetter] = useState([]);
    const [almostLetters, setAlmostLetter] = useState([]);
    const [correctLetters, setCorrectLetter] = useState([]);
    const [correctWord, setCorrectWord] = useState("")
    const [gameOver, setGameOver] = useState({
        gameOver: false,
        guessedWord: false,
    })

    useEffect(() => {
        ValidWordSet().then((words) => {
            setWordSet(words.wordSet)
        });
        AnswerWordSet().then((words) => {
            setCorrectWord(words.todaysWord)
            //setCorrectWord("stoop")
        })
    }, []);

    const onSelectLetter = (keyVal) => {
        if (currAttempt.letterPos > 4) return;
        const newBoard = [...board];
        newBoard[currAttempt.attempt][currAttempt.letterPos] = keyVal;
        setBoard(newBoard);
        setCurrAttempt({ ...currAttempt, letterPos: currAttempt.letterPos + 1 });
    }

    const onDelete = () => {
        if (currAttempt.letterPos === 0) return;
        const newBoard = [...board];
        newBoard[currAttempt.attempt][currAttempt.letterPos - 1] = "";
        setBoard(newBoard);
        setCurrAttempt({ ...currAttempt, letterPos: currAttempt.letterPos - 1 });
    }

    const onEnter = () => {
        if (currAttempt.letterPos !== 5) return;

        let currWord = "";
        for (let i = 0; i < 5; i++) {
            currWord += board[currAttempt.attempt][i]
        }

        if (wordSet.has(currWord.toLowerCase())) {
            setCurrAttempt({ attempt: currAttempt.attempt + 1, letterPos: 0 });
        } else {
            //console.log(wordSet, currWord.toLowerCase(), correctWord.toUpperCase())
            alert("Invalid word");
            return;
        }

        if (currWord === correctWord.toUpperCase()) {
            setGameOver({ gameOver: true, guessedWord: true });
            return;
        }

        if (currAttempt.attempt === 5) {
            setGameOver({ gameOver: true, guessedWord: false });
        }
    }

    return (
        <div className="App">
            <nav>
                <h1>Wordle</h1>
            </nav>
            <AppContext.Provider value={{
                board,
                setBoard,
                currAttempt,
                setCurrAttempt,
                onSelectLetter,
                onDelete,
                onEnter,
                correctWord,
                disabledLetters,
                setDisableLetter,
                gameOver,
                setGameOver,
                almostLetters,
                setAlmostLetter,
                correctLetters,
                setCorrectLetter,
            }}>
                <div className='game'>
                    <Board />
                    {gameOver.gameOver ? <GameOver /> : <Keyboard />}
                </div>
            </AppContext.Provider>
        </div>
    );
}

export default App;
