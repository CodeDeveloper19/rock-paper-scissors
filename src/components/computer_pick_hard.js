import React, { useContext, useEffect } from 'react';
import { ComputerPickedContext } from './main_page(hard)';

export default function Computer_pick_hard (props) {
    const [[computerPicked, setComputerPicked], [iconHard, setIconHard], [transformValueComputer, setTransformValueComputer], 
    [transformIconValueComputer, setTransformIconValueComputer], 
    [moveRightMainGame, setMoveRightMainGame],
    [moveRightMainGameTwo, setMoveRightMainGameTwo],
    [result, setResult], [startGame, setStartGame], [chosenClassName, setChosenClassName] ] = useContext(ComputerPickedContext);

    useEffect(() => {
        if (computerPicked != undefined){
            switch (computerPicked){
                case 'lizard':
                    setTransformValueComputer('rotateZ(235.5deg)');
                    setTransformIconValueComputer('rotateZ(-235.5deg)');
                    setMoveRightMainGameTwo('-10px');
                    break;
                case 'spock':
                    setTransformValueComputer('rotateZ(173deg)');
                    setTransformIconValueComputer('rotateZ(-173deg)');
                    setMoveRightMainGameTwo('0px');
                    break;
                case 'scissors':
                    setTransformValueComputer('rotateZ(85.5deg)');
                    setTransformIconValueComputer('rotateZ(-85.5deg)');
                    setMoveRightMainGameTwo('20px');
                    break;
                case 'rock':
                    setTransformValueComputer('rotateZ(303deg)');
                    setTransformIconValueComputer('rotateZ(-303deg)');
                    setMoveRightMainGameTwo('-15px');
                    break;
                case 'paper':
                    setTransformValueComputer('rotateZ(0deg)');
                    setTransformIconValueComputer('rotateZ(0deg)');
                    setMoveRightMainGameTwo('0px');
                    break;
            }
        }
    }, [computerPicked]);

    useEffect(() => {
        if (startGame != undefined){
            beginGame(startGame)
        }
    }, [startGame])
    

    let arrayOfIcons = ['scissors', 'paper', 'rock', 'lizard', 'spock'];
    let tempComputerPick, computerPick;

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
        setMoveRightMainGame('-10px');
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
        setMoveRightMainGame('0px');
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
        setMoveRightMainGame('15px');
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
        setMoveRightMainGame('-10px');
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
        setMoveRightMainGame('0px');
    }


    return(
        <>
            <div className={['game_icon_container_computer', chosenClassName].join(' ')} style={{display: (computerPicked ==  props.id || computerPicked == undefined) ? 'flex' : 'none'}}>
                <div className='shadow' style={{transform: (computerPicked == props.id) ? transformIconValueComputer : 'unset'}}>                           
                    <img src={props.imageUrl} alt="pentagon skeleton for the game element icons" className='game_icon'/>
                    <div className='inner_circle'></div>
                </div>
            </div>
        </>
    )
}