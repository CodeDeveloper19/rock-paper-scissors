import React, { useState, useEffect, createContext  } from 'react';
import Rules from './rules'
import logo from '../images/logo-bonus.svg';
import pentagon from '../images/bg-pentagon.svg';
import triangle from '../images/bg-triangle.svg';
import scissors from '../images/icon-scissors.svg';
import paper from '../images/icon-paper.svg';
import rock from '../images/icon-rock.svg';
import lizard from '../images/icon-lizard.svg';
import spock from '../images/icon-spock.svg';
import User_pick from './user_pick';
import Computer_pick from './computer_pick';

const initalScore = '0';
let prevResult;

const data = [
    {
        id: 'scissors',
        rotation: 'rotateZ(-85.5deg)',
        antiRotation: 'rotateZ(85.5deg)',
        imageUrl: scissors
    }, 
    {
        id: 'paper',
        rotation: 'rotateZ(-175deg)',
        antiRotation: 'rotateZ(180deg)',
        imageUrl: paper
    },
    {
        id: 'rock',
        rotation: 'rotateZ(-240deg)',
        antiRotation: 'rotateZ(240deg)',
        imageUrl: rock
    }, 
    {
        id: 'lizard',
        rotation: 'rotateZ(-295deg)',
        antiRotation: 'rotateZ(295deg)',
        imageUrl: lizard
    }, 
    {
        id: 'spock',
        rotation: 'rotateZ(1.5deg)',
        antiRotation: 'rotateZ(1.5deg)',
        imageUrl: spock
    }, 
]

export const UserPickedContext = createContext();
export const ComputerPickedContext = createContext();

export default function Main_page() {
    const [score, setScore] = useState(initalScore);
    const [showRules, setShowRules] = useState(false);
    const [icon, setIcon] = useState(undefined);
    const [result, setResult] = useState(undefined);
    const [startGame, setStartGame] = useState(undefined);
    const [computerPicked, setComputerPicked] = useState(undefined);
    const [difficulty, setDifficulty] = useState('hard');
    const [transformValue, setTransformValue] = useState(undefined);
    const [transformValueComputer, setTransformValueComputer] = useState(undefined);
    const [transformIconValue, setTransformIconValue] = useState(undefined);
    const [transformIconValueComputer, setTransformIconValueComputer] = useState(undefined);
    const [moveRightMainGame, setMoveRightMainGame] = useState(undefined);
    const [moveRightMainGameTwo, setMoveRightMainGameTwo] = useState(undefined);
    const [resultDisplay, setResultDisplay] = useState(undefined);

    useEffect(() => {
        const playerScore = localStorage.getItem('playerScore');
        if (playerScore != null){
            setScore(parseInt(playerScore));
        }
    }, [])

    useEffect(() => {
        if (typeof(score) != 'string'){
            localStorage.setItem('playerScore', score);
        }
    }, [score])

    useEffect(() => {
    }, [icon]);

    useEffect(() => {
        if (result != undefined){
            minusOrAdd();
        }
        setResultDisplay(result);
    }, [result])

    const setShowRulesFunction = () => {
        setShowRules(false);
    }

    const minusOrAdd = () => {
        if (result == 'You win'){
            setScore(score + 1);
        } else if (result == 'You lose' && score != 0){
            setScore(score - 1);
        }
    }

    const refreshGame = () => {
        setResult(undefined);
        setComputerPicked(undefined);
        setStartGame(undefined);
        setIcon(undefined);
        setMoveRightMainGame(undefined);
        setMoveRightMainGameTwo(undefined);
        setTransformIconValue(undefined);
        setTransformIconValueComputer(undefined);
        setTransformValue(undefined);
        setTransformValueComputer(undefined);
    }

    return (
        <>
        <div className='main_container'>
            <div className='main_title'>
                <div className='logo_container'>
                    <img src={logo} className='logo' alt='logo for the game'/>
                </div>
                <div className='score_container'>
                    <p>SCORE</p>
                    <p>{score}</p>
                </div>
            </div>
            <div className='general_container'>
                <div className='main_game_container'>
                    <main className='main_game' style={{transform: (icon == 'lizard', 'rock', 'paper', 'scissors') ? transformValue : 'unset',                
                    right: (result) ? moveRightMainGame : 'unset'}}>
                    <img src={(difficulty == 'hard') ? pentagon : triangle} 
                    alt="pentagon skeleton for the game element icons" id='pentagon' 
                    style={{display: (icon == undefined) ? 'flex' : 'none'}}/>
                        <UserPickedContext.Provider value={ [ [transformValue, setTransformValue], [transformIconValue, setTransformIconValue], 
                            [icon, setIcon], [startGame, setStartGame] ]}>
                            {
                                data.map((data) => {
                                    return <User_pick key={data.id} {...data}/>
                                })
                            }
                        </UserPickedContext.Provider>
                    </main>
                    <div className='main_game_two' style={{transform: (computerPicked != undefined) ? transformValueComputer : 'unset', 
                    zIndex: (computerPicked != undefined) ? '0' : '-1',
                    left: (result) ? moveRightMainGameTwo : 'unset',
                    display: (computerPicked == undefined) ? 'none' : 'flex'}}>
                        <ComputerPickedContext.Provider value = {[[computerPicked, setComputerPicked], 
                            [icon, setIcon], 
                            [transformValueComputer, setTransformValueComputer], 
                            [transformIconValueComputer, setTransformIconValueComputer], 
                            [moveRightMainGame, setMoveRightMainGame],
                            [moveRightMainGameTwo, setMoveRightMainGameTwo],
                            [result, setResult], [startGame, setStartGame] ]}>
                                {
                                    data.map((data) => {
                                        return <Computer_pick key={data.id} {...data}/>
                                    })
                                }
                            </ComputerPickedContext.Provider>
                    </div>
                </div>
                <button className='result_box' style={{display: (computerPicked == undefined) ? 'none' : 'flex'}} 
                onMouseEnter={() => {
                    prevResult = result;
                    setResultDisplay('Play Again?');
                }} 
                onMouseLeave={() => {
                    setResultDisplay(prevResult);
                }}
                onTouchStart={() => {
                    prevResult = result;
                    setResultDisplay('Play Again?');
                }} 
                onTouchEnd={() => {
                    setResultDisplay(prevResult);
                }}
                onClick={() => refreshGame()}>
                    {resultDisplay}
                </button>
            </div>
            <div id='controls'>
                <button className='reset_button_container' onClick={() => {
                    setScore(0);
                    localStorage.setItem('playerScore', 0);
                    }}>
                    RESET
                </button>
                <button className='rules_button_container' onClick={() => setShowRules(true)}>
                    RULES
                </button>
            </div>
        </div>
        <Rules show={showRules} SETSHOWRULES={setShowRulesFunction}/>
        </>
    )
};