import React, { useState, useEffect, createContext } from 'react';
import Rules from './Rules'
import logoHard from '../images/logo-bonus.svg';
import logoEasy from '../images/logo.svg';
import EasyHard from './EasyHard';

const dataa = [
    { 
        id: 'easy'
    }, 
    {
        id: 'hard'
    }
]

const initalScore = '0';

export const UserPickedContext = createContext();
export const ComputerPickedContext = createContext();
export const RulesContext = createContext();
export const EasyContext = createContext();
export const ResultBoxContext = createContext();

const getWindowSize = () => {
    const {innerWidth, innerHeight} = window;
    return {innerWidth, innerHeight};
}

export default function MainPage() {
    const [windowSize, setWindowSize] = useState(getWindowSize());

    const [scoreHard, setScoreHard] = useState(initalScore);
    const [scoreEasy, setScoreEasy] = useState(initalScore);
    const [showRules, setShowRules] = useState(false);
    const [iconEasy, setIconEasy] = useState(undefined);
    const [iconHard, setIconHard] = useState(undefined);
    const [chosenIcon, setChosenIcon] = useState(undefined);
    const [result, setResult] = useState(undefined);
    const [chosenClassName, setChosenClassName] = useState(undefined);
    const [startGame, setStartGame] = useState(undefined);
    const [computerPicked, setComputerPicked] = useState(undefined);
    const [difficulty, setDifficulty] = useState('easy');
    const [transformValue, setTransformValue] = useState(undefined);
    const [transformValueComputer, setTransformValueComputer] = useState(undefined);
    const [transformIconValue, setTransformIconValue] = useState(undefined);
    const [transformIconValueComputer, setTransformIconValueComputer] = useState(undefined);
    const [moveRightMainGame, setMoveRightMainGame] = useState(undefined);
    const [moveRightMainGameTwo, setMoveRightMainGameTwo] = useState(undefined);
    const [resultDisplay, setResultDisplay] = useState(undefined);
    const [resetGame, setResetGame] = useState(false);
    const [canMove, setCanMove] = useState(undefined);
    const [canIncreaseIcon, setCanIncreaseIcon] = useState(false);
    const [adjustedLeftEasy, setAdjustedLeftEasy] = useState("0px");
    const [adjustedRightEasy, setAdjustedRightEasy] = useState("0px");
    const [adjustedLeftHard, setAdjustedLeftHard] = useState("0px");
    const [adjustedRightHard, setAdjustedRightHard] = useState("0px");

    useEffect(() => {
        const playerScoreHard = localStorage.getItem('playerScoreHard');
        const playerScoreEasy = localStorage.getItem('playerScoreEasy');
        if (playerScoreHard !== null){
            setScoreHard(parseInt(playerScoreHard));
        } 
        if (playerScoreEasy !== null){
            setScoreEasy(parseInt(playerScoreEasy));
        }
    }, [])

    useEffect(() => {
        const handleWindowResize = () => {
            setWindowSize(getWindowSize());
        }
      
        window.addEventListener('resize', handleWindowResize);
      
        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, [])

    useEffect(() => {
        if (typeof(scoreHard) !== 'string'){
            localStorage.setItem('playerScoreHard', scoreHard);
        } 
        if (typeof(scoreEasy) !== 'string'){
            localStorage.setItem('playerScoreEasy', scoreEasy);
        }
    }, [scoreHard, scoreEasy])

    useEffect(() => {
        const minusOrAddHard = () => {
            if (result === 'You win' && scoreHard <= 100){
                setScoreHard(scoreHard + 1);
            } else if (result === 'You lose' && scoreHard !== 0){
                setScoreHard(scoreHard - 1);
            }
        }
    
        const minusOrAddEasy = () => {
            if (result === 'You win' && scoreEasy <= 100){
                setScoreEasy(scoreEasy + 1);
            } else if (result === 'You lose' && scoreEasy !== 0){
                setScoreEasy(scoreEasy - 1);
            }
        }

        if (result !== undefined && difficulty === 'hard'){
            minusOrAddHard();
        } else if (result !== undefined && difficulty === 'easy'){
            minusOrAddEasy();
        }
        setResultDisplay(result);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [result]); 

    useEffect(() => {
        if (windowSize.innerWidth >= 450 && result !== undefined){      
            setCanMove(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [result]);

    useEffect(() => {
        const changePosition = (x) => {
            let prevPosition = moveRightMainGame.split("p");
            let prevPositionTwo = moveRightMainGameTwo.split("p");
            const newPosition = [parseInt(prevPosition[0]) + x, 'px'].join('');
            const newPositionTwo = [parseInt(prevPositionTwo[0]) + x, 'px'].join('');
            const timer = setTimeout(() => {
                setMoveRightMainGame(newPosition);
                setMoveRightMainGameTwo(newPositionTwo);
            }, 500);
            return () => {clearTimeout(timer)};
        }
        if (canMove === true){
            changePosition(30);
            setAdjustedLeftHard('43px');
            setAdjustedRightHard('3px');
            setAdjustedLeftEasy('32px');
            setAdjustedRightEasy('0px');
        } 
        else if (canMove === false){
            setCanIncreaseIcon(true)
            changePosition(-25);
            setAdjustedLeftHard('96px');
            setAdjustedRightHard('53px');
            setAdjustedLeftEasy('89px');
            setAdjustedRightEasy('48px');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [canMove])

    useEffect(() => {
        refreshGame();
    }, [difficulty]);

    useEffect(() => {
        if (resetGame){
            refreshGame();
            setResetGame(false)
        }
    }, [resetGame]);

    const setShowRulesFunction = () => {
        setShowRules(false);
    }

    const refreshGame = () => {
        setResult(undefined);
        setComputerPicked(undefined);
        setStartGame(undefined);
        setIconEasy(undefined);
        setIconHard(undefined);
        setCanMove(undefined);
        setCanIncreaseIcon(false);
        setMoveRightMainGame(undefined);
        setMoveRightMainGameTwo(undefined);
        setTransformIconValue(undefined);
        setTransformIconValueComputer(undefined);
        setTransformValue(undefined);
        setTransformValueComputer(undefined);
    }

    const resetIndividualScore = () => {
        if (difficulty === 'hard'){
            setScoreHard(0); 
            localStorage.setItem('playerScoreHard', 0);
        } else {
            setScoreEasy(0); 
            localStorage.setItem('playerScoreEasy', 0);
        }
    }

    return (
        <>
        <div className='main_container'>
            <header className='main_title'>
                <div className='logo_container_screen' style={{width: (difficulty === 'hard') ? '95px' : '130px'}}>
                    <div className='logo_container_fit' style={{right: (difficulty === 'hard') ? '0px' : '95px'}}>
                        <div className='logo_container'>
                            <img src={logoHard} className='logo' aria-hidden='true' alt='logo for the game'/>
                        </div>
                        <div className='logo_container'>
                            <img src={logoEasy} className='logo' aria-hidden='true' alt='logo for the game'/>
                        </div>
                    </div>
                </div>
                <div className='score_container'>
                    <h1>SCORE</h1>
                    <div className='score_screen'>
                        <div className='score_container_fit' style={{right : (difficulty === 'hard') ? '0px' : '40px'}}>
                            <div className='score'>
                                <p>{scoreHard}</p>
                            </div>
                            <div className='score'>
                                <p>{scoreEasy}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <div id='difficulty_level'>
                <p>Easy</p>
                <div id='slider' aria-label='difficulty switch' style={{boxShadow: (difficulty === 'easy' ? 'unset' : '1px 1px 10px 5px #fff')}}>
                    <div id='slider_ball'
                    onClick={() => {
                        if (difficulty === 'hard'){
                            setDifficulty('easy');
                        } else {
                            setDifficulty('hard');
                        }
                    }}
                    aria-label={(difficulty === 'easy') ? 'easy level' : 'hard level'}
                    style={{left: (difficulty === 'easy') ? '5px' : '35px'}}
                    ></div>
                </div>
                <p>Hard</p>
            </div>
            <div className='container_screen'>
                <div className='overall_container' style={{right: (difficulty === 'easy' ? '500px' : '0px')}}>
                    <UserPickedContext.Provider value={ [ [transformValue, setTransformValue], [transformIconValue, setTransformIconValue], 
                        [iconEasy, setIconEasy], [startGame, setStartGame], [difficulty], 
                        [iconHard, setIconHard], [chosenClassName, setChosenClassName], [chosenIcon, setChosenIcon],
                        [transformValueComputer, setTransformValueComputer], 
                        [transformIconValueComputer, setTransformIconValueComputer], 
                        [computerPicked, setComputerPicked], [moveRightMainGame, setMoveRightMainGame],
                        [moveRightMainGameTwo, setMoveRightMainGameTwo], [result, setResult], [resultDisplay], [setResetGame], [canMove], [canIncreaseIcon, setCanIncreaseIcon],
                        [adjustedLeftEasy], [adjustedRightEasy], [adjustedLeftHard], [adjustedRightHard] ]}>
                            {
                                dataa.map((dataa) => {
                                    return <EasyHard key={dataa.id}/>
                                })
                            }
                    </UserPickedContext.Provider>
                </div>
            </div>
            <div id='controls'>
                <button aria-label='reset difficulty level score' className='reset_button_container' onClick={() => {
                    resetIndividualScore();
                    }}>
                    RESET
                </button>
                <button className='rules_button_container' onClick={() => setShowRules(true)}>
                    RULES
                </button>
            </div>
        </div>
        <RulesContext.Provider value={[[difficulty]]}>
            <Rules show={showRules} SETSHOWRULES={setShowRulesFunction}/>
        </RulesContext.Provider>
        </>
    )
};