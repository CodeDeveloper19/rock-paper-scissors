import React, { useState, useEffect } from 'react';
import Rules from './rules'
import logo from '../images/logo-bonus.svg';
import pentagon from '../images/bg-pentagon.svg';
import scissors from '../images/icon-scissors.svg';
import paper from '../images/icon-paper.svg';
import rock from '../images/icon-rock.svg';
import spock from '../images/icon-spock.svg';
import lizard from '../images/icon-lizard.svg';

const initalScore = 0;

const arrayOfIcons = ['rock', 'spock', 'scissors', 'paper', 'lizard'];
let tempComputerPick, computerPick;
let userInput;

export default function Main_page() {
    const [score, setScore] = useState(initalScore);
    const [showRules, setShowRules] = useState(false);

    const setShowRulesFunction = () => {
        setShowRules(false);
    }

    const beginGame = (userValue) => {
        computerPicks(userValue);
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
                console.log("You draw")
                break;
            case 'spock':
                console.log("You win")
                break;
            case 'scissors':
                console.log("You lose")
                break;
            case 'rock':
                console.log("You lose")
                break;
            case 'paper':
                console.log("You win")
                break;
        }
    }

    const Spock = (computerPick) => {
        switch(computerPick){
            case 'lizard':
                console.log("You lose")
                break;
            case 'spock':
                console.log("You draw")
                break;
            case 'scissors':
                console.log("You win")
                break;
            case 'rock':
                console.log("You win")
                break;
            case 'paper':
                console.log("You lose")
                break;
        }
    }

    const Scissors = (computerPick) => {
        switch(computerPick){
            case 'lizard':
                console.log("You win")
                break;
            case 'spock':
                console.log("You lose")
                break;
            case 'scissors':
                console.log("You draw")
                break;
            case 'rock':
                console.log("You lose")
                break;
            case 'paper':
                console.log("You win")
                break;
        }
    }

    const Rock = (computerPick) => {
        switch(computerPick){
            case 'lizard':
                console.log("You win")
                break;
            case 'spock':
                console.log("You lose")
                break;
            case 'scissors':
                console.log("You win")
                break;
            case 'rock':
                console.log("You draw")
                break;
            case 'paper':
                console.log("You lose")
                break;
        }
    }

    const Paper = (computerPick) => {
        switch(computerPick){
            case 'lizard':
                console.log("You lose")
                break;
            case 'spock':
                console.log("You win")
                break;
            case 'scissors':
                console.log("You lose")
                break;
            case 'rock':
                console.log("You win")
                break;
            case 'paper':
                console.log("You draw")
                break;
        }
    }

    useEffect(() => {
        const playerScore = localStorage.getItem('playerScore');
        if (playerScore != null){
            setScore(playerScore);
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('playerScore', score);
    }, [score])

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
            <main className='main_game'>
                <img src={pentagon} alt="pentagon skeleton for the game element icons" id='pentagon'/>
                <div className='game_icon_container' id='scissors' onClick={() => {userInput='scissors'; beginGame(userInput)}}>
                    <div className='shadow'>                           
                        <img src={scissors} alt="pentagon skeleton for the game element icons" className='game_icon'/>
                        <div className='inner_circle'></div>
                    </div>
                </div>
                <div className='game_icon_container' id='paper' onClick={() => {userInput='paper'; beginGame(userInput)}}>
                    <div className='shadow'>
                        <img src={paper} alt="pentagon skeleton for the game element icons" className='game_icon'/>
                        <div className='inner_circle'></div>
                    </div>
                </div>
                <div className='game_icon_container' id='rock' onClick={() => {userInput='rock'; beginGame(userInput)}}>
                    <div className='shadow'>
                        <img src={rock} alt="pentagon skeleton for the game element icons" className='game_icon'/>
                        <div className='inner_circle'></div>
                    </div>
                </div>
                <div className='game_icon_container' id='lizard' onClick={() => {userInput='lizard'; beginGame(userInput)}}>
                    <div className='shadow'>
                        <img src={lizard} alt="pentagon skeleton for the game element icons" className='game_icon'/>
                        <div className='inner_circle'></div>
                    </div>
                </div>
                <div className='game_icon_container'  id='spock' onClick={() => {userInput='spock'; beginGame(userInput)}}>
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