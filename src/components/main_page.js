import React, { useState, useEffect } from 'react';
import Rules from './rules'
import logo from '../images/logo-bonus.svg';
import pentagon from '../images/bg-pentagon.svg';
import scissors from '../images/icon-scissors.svg';
import paper from '../images/icon-paper.svg';
import rock from '../images/icon-rock.svg';
import lizard from '../images/icon-lizard.svg';
import spock from '../images/icon-spock.svg';
// import Game_icon_container from './game_icon_container';

const initalScore = 0;

const arrayOfIcons = ['scissors', 'paper', 'rock', 'lizard', 'spock'];
const arrayOfRotations = ['rotateZ(-90deg)', 'rotateZ(-180deg)', 'rotateZ(-240deg)', 'rotateZ(-300deg)', 'rotateZ(-300deg)']
let tempComputerPick, computerPick;
let userInput;

export default function Main_page() {
    const [score, setScore] = useState(initalScore);
    const [showRules, setShowRules] = useState(false);
    const [result, setResult] = useState(undefined);
    const [icon, setIcon] = useState(undefined);
    const [transformValue, setTransformValue] = useState(undefined);
    const [transforIconValue, setTransformIconValue] = useState(undefined);

    useEffect(() => {
        const playerScore = localStorage.getItem('playerScore');
        if (playerScore != null){
            setScore(playerScore);
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('playerScore', score);
    }, [score])

    useEffect(() => {
    }, [icon]);

    const setShowRulesFunction = () => {
        setShowRules(false);
    }

    const beginGame = (userValue) => {
        setIcon(userValue);
    }

    const computerPicks = (userValue) => {
        tempComputerPick = arrayOfIcons[Math.floor(Math.random()*arrayOfIcons.length)];
        if (tempComputerPick == computerPick){
            tempComputerPick = arrayOfIcons[Math.floor(Math.random()*arrayOfIcons.length)];
            computerPick = tempComputerPick;
        } else {
            computerPick = tempComputerPick;
        }
        rulesJudge(userValue, computerPick);
    }

    const rulesJudge = (a, b) => {
        switch(a){
            case 'lizard':
                Lizard(b);
                break;
            case 'spock':
                Spock(b);
                break;
            case 'scissors':
                Scissors(b);
                break;
            case 'rock':
                Rock(b);
                break;
            case 'paper':
                Paper(b);
                break;
        }
        console.log(b)
    }

    const Lizard = (computerPick) => {
        switch(computerPick){
            case 'lizard':
                setResult("You draw")
                break;
            case 'spock':
                setResult("You win")
                break;
            case 'scissors':
                setResult("You lose")
                break;
            case 'rock':
                setResult("You lose")
                break;
            case 'paper':
                setResult("You win")
                break;
        }
    }

    const Spock = (computerPick) => {
        switch(computerPick){
            case 'lizard':
                setResult("You lose")
                break;
            case 'spock':
                setResult("You draw")
                break;
            case 'scissors':
                setResult("You win")
                break;
            case 'rock':
                setResult("You win")
                break;
            case 'paper':
                setResult("You lose")
                break;
        }
    }

    const Scissors = (computerPick) => {
        switch(computerPick){
            case 'lizard':
                setResult("You win")
                break;
            case 'spock':
                setResult("You lose")
                break;
            case 'scissors':
                setResult("You draw")
                break;
            case 'rock':
                setResult("You lose")
                break;
            case 'paper':
                setResult("You win")
                break;
        }
    }

    const Rock = (computerPick) => {
        switch(computerPick){
            case 'lizard':
                setResult("You win")
                break;
            case 'spock':
                setResult("You lose")
                break;
            case 'scissors':
                setResult("You win")
                break;
            case 'rock':
                setResult("You draw")
                break;
            case 'paper':
                setResult("You lose")
                break;
        }
    }

    const Paper = (computerPick) => {
        switch(computerPick){
            case 'lizard':
                setResult("You lose")
                break;
            case 'spock':
                setResult("You win")
                break;
            case 'scissors':
                setResult("You lose")
                break;
            case 'rock':
                setResult("You win")
                break;
            case 'paper':
                setResult("You draw")
                break;
        }
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
            <main className='main_game' style={{transform: (icon == 'lizard', 'rock', 'paper', 'scissors') ? transformValue : 'unset'}}>
                <img src={pentagon} alt="pentagon skeleton for the game element icons" id='pentagon' style={{display: (icon == undefined) ? 'flex' : 'none'}}/>
                <div className='game_icon_container' id='scissors' onClick={() => {userInput='scissors'; beginGame(userInput); setTransformValue('rotateZ(-90deg)'); setTransformIconValue('rotateZ(90deg)')}} style={{display: (icon ==  'scissors' || icon == undefined) ? 'flex' : 'none'}}>
                    <div className='shadow' style={{transform: (icon == 'scissors') ? transforIconValue : 'unset'}}>                           
                        <img src={scissors} alt="pentagon skeleton for the game element icons" className='game_icon'/>
                        <div className='inner_circle'></div>
                    </div>
                </div>
                <div className='game_icon_container' id='paper' onClick={() => {userInput='paper'; beginGame(userInput); setTransformValue('rotateZ(-180deg)'); setTransformIconValue('rotateZ(180deg)')}} style={{display: (icon ==  'paper' || icon == undefined) ? 'flex' : 'none'}}>
                    <div className='shadow' style={{transform: (icon == 'paper') ? transforIconValue : 'unset'}}>
                        <img src={paper} alt="pentagon skeleton for the game element icons" className='game_icon'/>
                        <div className='inner_circle'></div>
                    </div>
                </div>
                <div className='game_icon_container' id='rock' onClick={() => {userInput='rock'; beginGame(userInput); beginGame(userInput); setTransformValue('rotateZ(-240deg)'); setTransformIconValue('rotateZ(240deg)')}} style={{display: (icon ==  'rock' || icon == undefined) ? 'flex' : 'none'}}>
                    <div className='shadow' style={{transform: (icon == 'rock') ? transforIconValue : 'unset'}}>
                        <img src={rock} alt="pentagon skeleton for the game element icons" className='game_icon'/>
                        <div className='inner_circle'></div>
                    </div>
                </div>
                <div className='game_icon_container' id='lizard' onClick={() => {userInput='lizard'; beginGame(userInput); beginGame(userInput); setTransformValue('rotateZ(-300deg)'); setTransformIconValue('rotateZ(300deg)')}} style={{display: (icon ==  'lizard' || icon == undefined) ? 'flex' : 'none'}}>
                    <div className='shadow' style={{transform: (icon == 'lizard') ? transforIconValue : 'unset'}}>
                        <img src={lizard} alt="pentagon skeleton for the game element icons" className='game_icon'/>
                        <div className='inner_circle'></div>
                    </div>
                </div>
                {/* {
                    arrayOfRotations.map((e) => {
                        return <Game_icon_container key={arrayOfIcons}/>
                    })
                } */}
                <div className='game_icon_container' id='spock' onClick={() => {userInput='spock'; beginGame(userInput); beginGame(userInput)}} style={{display: (icon ==  'spock' || icon == undefined) ? 'flex' : 'none'}}>
                    <div className='shadow'>
                        <img src={spock} alt="pentagon skeleton for the game element icons" className='game_icon'/>
                        <div className='inner_circle'></div>
                    </div>
                </div>
            </main>
            <div id='controls'>
                <button className='reset_button_container' onClick={() => setScore(initalScore)}>
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