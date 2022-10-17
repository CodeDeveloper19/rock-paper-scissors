import React, { useContext, useEffect, useState } from 'react';
import { ComputerPickedContext } from './main_page(hard)';

let arrayOfIconsEasy = ['scissors', 'paper', 'rock'];
let arrayOfIconsHard = ['scissors', 'paper', 'rock', 'lizard', 'spock'];

let tempComputerPick, computerPick;

export default function Computer_pick_hard (props) {
    const [[computerPicked, setComputerPicked], [iconHard, setIconHard], [transformValueComputer, setTransformValueComputer], 
    [transformIconValueComputer, setTransformIconValueComputer], 
    [moveRightMainGame, setMoveRightMainGame],
    [moveRightMainGameTwo, setMoveRightMainGameTwo],
    [result, setResult], [startGame, setStartGame], [chosenClassName, setChosenClassName], [difficulty, setDifficulty] ] = useContext(ComputerPickedContext);

    const [arrayOfIcons, setArrayOfIcons] = useState(undefined)

    useEffect(() => {
        if (computerPicked != undefined){
            switch (computerPicked){
                case 'lizard':
                    settingTransformValue('unset', 'unset', 'rotateZ(235.5deg)', 'rotateZ(-235.5deg)')
                    settingMoveRightMainGameTwo('unset', '-10px');
                    break;
                case 'spock':
                    settingTransformValue('unset', 'unset', 'rotateZ(173deg)', 'rotateZ(-173deg)')
                    settingMoveRightMainGameTwo('unset', '0px');
                    break;
                case 'scissors':
                    settingTransformValue('rotateZ(133deg)', 'rotateZ(-133deg)', 'rotateZ(85.5deg)', 'rotateZ(-85.5deg)');
                    settingMoveRightMainGameTwo('-15px', '20px');
                    break;
                case 'rock':
                    settingTransformValue('rotateZ(263deg)', 'rotateZ(-263deg)', 'rotateZ(303deg)', 'rotateZ(-303deg)');
                    settingMoveRightMainGameTwo('45px', '-15px');
                    break;
                case 'paper':
                    settingTransformValue('rotateZ(38.5deg)', 'rotateZ(-38.5deg)', 'rotateZ(0deg)', 'rotateZ(0deg)');
                    settingMoveRightMainGameTwo('-15px', '0px');
                    break;
            }
        }
    }, [computerPicked]);

    useEffect(() => {
        if (startGame != undefined){
            beginGame(startGame)
        }
    }, [startGame]);

    useEffect(() => {
        if (difficulty == 'easy'){
            setArrayOfIcons(arrayOfIconsEasy);
        } else if (difficulty == 'hard'){
            setArrayOfIcons(arrayOfIconsHard);
        }
    }, [difficulty]);

    const settingMoveRightMainGameTwo = (easy, hard) => {
        if (difficulty == 'easy'){
            setMoveRightMainGameTwo(easy);
        } else if (difficulty == 'hard'){
            setMoveRightMainGameTwo(hard);
        }
    }

    const settingMoveRightMainGame = (easy, hard) => {
        if (difficulty == 'easy'){
            setMoveRightMainGame(easy);
        } else if (difficulty == 'hard'){
            setMoveRightMainGame(hard);
        }
        console.log(result)
    }

    const settingTransformValue = (a, b, c, d) => {
        if (difficulty == 'easy'){
            setTransformValueComputer(a);
            setTransformIconValueComputer(b);
        } else if (difficulty == 'hard'){
            setTransformValueComputer(c);
            setTransformIconValueComputer(d);
        }
    }

    const beginGame = (userValue) => {
        setIconHard(userValue);
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
        setComputerPicked(computerPick);
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
        settingMoveRightMainGame('unset', '-10px');
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
        settingMoveRightMainGame('unset', '0px');
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
        settingMoveRightMainGame('-20px', '15px');
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
        settingMoveRightMainGame('40px', '-10px');
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
        settingMoveRightMainGame('-15px', '0px');
    }

    return(
        <>
            <div className={['game_icon_container_computer', chosenClassName].join(' ')} style={{display: (computerPicked ==  props.id || computerPicked == undefined) ? 'flex' : 'none', 
            boxShadow: (result == 'You lose') ? '0 0 0 25px #293251, 0 0 0 50px #232c4b, 0 0 0 70px #1e2748' : 'unset'}}>
                <div className='shadow' style={{transform: (computerPicked == props.id) ? transformIconValueComputer : 'unset'}}>                           
                    <img src={props.imageUrl} alt="pentagon skeleton for the game element icons" className='game_icon'/>
                    <div className='inner_circle'></div>
                </div>
            </div>
        </>
    )
}