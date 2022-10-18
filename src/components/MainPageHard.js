import React, { useState, useEffect, createContext } from 'react';
import Rules from './Rules'
import logoHard from '../images/logo-bonus.svg';
import logoEasy from '../images/logo.svg';
import pentagon from '../images/bg-pentagon.svg';
import scissors from '../images/icon-scissors.svg';
import paper from '../images/icon-paper.svg';
import rock from '../images/icon-rock.svg';
import lizard from '../images/icon-lizard.svg';
import spock from '../images/icon-spock.svg';
import UserPick from './UserPick';
import ComputerPick from './ComputerPick';
import EasyPage from './EasyPage';
import ResultBox from './ResultBox';

const initalScore = '0';

const data = [
    {
        id: 'scissors',
        rotation: 'rotateZ(-85.5deg)',
        antiRotation: 'rotateZ(85.5deg)',
        imageUrl: scissors
    }, 
    {
        id: 'paper',
        rotation: 'rotateZ(-173deg)',
        antiRotation: 'rotateZ(173deg)',
        imageUrl: paper
    },
    {
        id: 'rock',
        rotation: 'rotateZ(-233deg)',
        antiRotation: 'rotateZ(233deg)',
        imageUrl: rock
    }, 
    {
        id: 'lizard',
        rotation: 'rotateZ(-299deg)',
        antiRotation: 'rotateZ(299deg)',
        imageUrl: lizard
    }, 
    {
        id: 'spock',
        rotation: 'rotateZ(0deg)',
        antiRotation: 'rotateZ(0deg)',
        imageUrl: spock
    }, 
]

export const UserPickedContext = createContext();
export const ComputerPickedContext = createContext();
export const RulesContext = createContext();
export const EasyContext = createContext();
export const ResultBoxContext = createContext();

const getWindowSize = () => {
    const {innerWidth, innerHeight} = window;
    return {innerWidth, innerHeight};
}

export default function MainPageHard() {
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
    }, [result]); 

    // useEffect(() => {
    //     if (windowSize.innerWidth >= 450 && result !== undefined){        
    //         const timer = setTimeout(() => {
    //             setMoveRightMainGame('50px');
    //         }, 500);
    //         return () => clearTimeout(timer);
    //     }
    // }, [result])

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
            <div className='main_title'>
                <div className='logo_container_screen' style={{width: (difficulty === 'hard') ? '95px' : '130px'}}>
                    <div className='logo_container_fit' style={{right: (difficulty === 'hard') ? '0px' : '95px'}}>
                        <div className='logo_container'>
                            <img src={logoHard} className='logo' alt='logo for the game'/>
                        </div>
                        <div className='logo_container'>
                            <img src={logoEasy} className='logo' alt='logo for the game'/>
                        </div>
                    </div>
                </div>
                <div className='score_container'>
                    <p>SCORE</p>
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
            </div>
            <div id='difficulty_level'>
                <p>Easy</p>
                <div id='slider' style={{boxShadow: (difficulty === 'easy' ? 'unset' : '1px 1px 10px 5px #fff')}}>
                    <div id='slider_ball'
                    onClick={() => {
                        if (difficulty === 'hard'){
                            setDifficulty('easy');
                        } else {
                            setDifficulty('hard');
                        }
                    }}
                    style={{left: (difficulty === 'easy') ? '5px' : '35px'}}
                    ></div>
                </div>
                <p>Hard</p>
            </div>
            <div className='container_screen'>
                <div className='overall_container' style={{right: (difficulty === 'easy' ? '500px' : '0px')}}>
                    <div className='general_container_hard'>
                        <div className='main_game_container'>
                            <main className='main_game' style={{transform: (iconHard === 'lizard', 'rock', 'paper', 'scissors') ? transformValue : 'unset',                
                            right: (result) ? moveRightMainGame : 'unset'}}>
                            <img src={pentagon} 
                            alt="pentagon skeleton for the game element icons" id='pentagon' 
                            style={{display: (iconHard === undefined) ? 'flex' : 'none'}}/>
                                <UserPickedContext.Provider value={ [ [setTransformValue], [transformIconValue, setTransformIconValue], 
                                    [iconEasy, setIconEasy], [setStartGame], [difficulty],
                                     [iconHard, setIconHard], [chosenClassName, setChosenClassName], [chosenIcon, setChosenIcon], [result]]}>
                                    {
                                        data.map((data) => {
                                            return <UserPick key={data.id} {...data}/>
                                        })
                                    }
                                </UserPickedContext.Provider>
                            </main>
                            <div className='main_game_two' style={{transform: (computerPicked !== undefined) ? transformValueComputer : 'unset', 
                            zIndex: (computerPicked !== undefined) ? '0' : '-1',
                            left: (result) ? moveRightMainGameTwo : 'unset',
                            display: (computerPicked === undefined) ? 'none' : 'flex'}}>
                                <ComputerPickedContext.Provider value = {[[computerPicked, setComputerPicked], 
                                    [setIconHard], 
                                    [setTransformValueComputer], 
                                    [transformIconValueComputer, setTransformIconValueComputer], 
                                    [setMoveRightMainGame],
                                    [setMoveRightMainGameTwo],
                                    [result, setResult], [startGame], [chosenClassName], [difficulty]]}>
                                        {
                                            data.map((data) => {
                                                return <ComputerPick key={data.id} {...data}/>
                                            })
                                        }
                                </ComputerPickedContext.Provider>
                            </div>
                        </div>
                        <ResultBoxContext.Provider value={[ [computerPicked], [resultDisplay], [setResetGame] ]}>
                            <ResultBox />
                        </ResultBoxContext.Provider>
                    </div>
                    <UserPickedContext.Provider value={ [ [transformValue, setTransformValue], [transformIconValue, setTransformIconValue], 
                        [iconEasy, setIconEasy], [startGame, setStartGame], [difficulty], 
                        [iconHard, setIconHard], [chosenClassName, setChosenClassName], [chosenIcon, setChosenIcon],
                        [transformValueComputer, setTransformValueComputer], 
                        [transformIconValueComputer, setTransformIconValueComputer], 
                        [computerPicked, setComputerPicked], [moveRightMainGame, setMoveRightMainGame],
                        [moveRightMainGameTwo, setMoveRightMainGameTwo], [result, setResult], [resultDisplay, setResultDisplay], [setResetGame] ]}>
                        <EasyPage />
                    </UserPickedContext.Provider>
                </div>
            </div>
            <div id='controls'>
                <button className='reset_button_container' onClick={() => {
                    resetIndividualScore();
                    }}>
                    RESET
                </button>
                <button className='rules_button_container' onClick={() => setShowRules(true)}>
                    RULES
                </button>
            </div>
        </div>
        <RulesContext.Provider value={[[difficulty, setDifficulty]]}>
            <Rules show={showRules} SETSHOWRULES={setShowRulesFunction}/>
        </RulesContext.Provider>
        </>
    )
};