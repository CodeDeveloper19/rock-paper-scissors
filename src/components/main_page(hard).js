import React, { useState, useEffect, createContext  } from 'react';
import Rules from './rules'
import logo from '../images/logo-bonus.svg';
import pentagon from '../images/bg-pentagon.svg';
import scissors from '../images/icon-scissors.svg';
import paper from '../images/icon-paper.svg';
import rock from '../images/icon-rock.svg';
import lizard from '../images/icon-lizard.svg';
import spock from '../images/icon-spock.svg';
import User_pick from './user_pick';
import Computer_pick_hard from './computer_pick_hard';
import Easy_page from './easy_page'

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

export default function Main_page() {
    const [score, setScore] = useState(initalScore);
    const [showRules, setShowRules] = useState(false);
    const [iconEasy, setIconEasy] = useState(undefined);
    const [iconHard, setIconHard] = useState(undefined);
    const [chosenIcon, setChosenIcon] = useState(undefined);
    const [result, setResult] = useState(undefined);
    const [resultEasy, setResultEasy] = useState(undefined)
    const [chosenClassName, setChosenClassName] = useState(undefined);
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
    }, [iconHard]);

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
        setIconEasy(undefined);
        setIconHard(undefined);
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
            <div id='difficulty_level'>
                <p>Easy</p>
                <div id='slider' style={{boxShadow: (difficulty == 'easy' ? 'unset' : '1px 1px 10px 5px #fff')}}>
                    <div id='slider_ball'
                    onClick={() => {
                        if (difficulty == 'hard'){
                            setDifficulty('easy');
                        } else {
                            setDifficulty('hard');
                        }
                    }}
                    style={{left: (difficulty == 'easy') ? '5px' : '35px'}}
                    ></div>
                </div>
                <p>Hard</p>
            </div>
            <div className='container_screen'>
                <div className='overall_container' style={{right: (difficulty == 'easy' ? '500px' : '0px')}}>
                    <div className='general_container_hard'>
                        <div className='main_game_container'>
                            <main className='main_game' style={{transform: (iconHard == 'lizard', 'rock', 'paper', 'scissors') ? transformValue : 'unset',                
                            right: (result) ? moveRightMainGame : 'unset'}}>
                            <img src={pentagon} 
                            alt="pentagon skeleton for the game element icons" id='pentagon' 
                            style={{display: (iconHard == undefined) ? 'flex' : 'none'}}/>
                                <UserPickedContext.Provider value={ [ [transformValue, setTransformValue], [transformIconValue, setTransformIconValue], 
                                    [iconEasy, setIconEasy], [startGame, setStartGame], [difficulty, setDifficulty],
                                     [iconHard, setIconHard], [chosenClassName, setChosenClassName], [chosenIcon, setChosenIcon] ]}>
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
                                    [iconHard, setIconHard], 
                                    [transformValueComputer, setTransformValueComputer], 
                                    [transformIconValueComputer, setTransformIconValueComputer], 
                                    [moveRightMainGame, setMoveRightMainGame],
                                    [moveRightMainGameTwo, setMoveRightMainGameTwo],
                                    [result, setResult], [startGame, setStartGame], [chosenClassName, setChosenClassName]]}>
                                        {
                                            data.map((data) => {
                                                return <Computer_pick_hard key={data.id} {...data}/>
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
                    <UserPickedContext.Provider value={ [ [transformValue, setTransformValue], [transformIconValue, setTransformIconValue], 
                        [iconEasy, setIconEasy], [startGame, setStartGame], [difficulty, setDifficulty], 
                        [iconHard, setIconHard], [chosenClassName, setChosenClassName], [chosenIcon, setChosenIcon] ]}>
                        <Easy_page />
                    </UserPickedContext.Provider>
                </div>
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
        <RulesContext.Provider value={[[difficulty, setDifficulty]]}>
            <Rules show={showRules} SETSHOWRULES={setShowRulesFunction}/>
        </RulesContext.Provider>
        </>
    )
};