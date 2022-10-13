import React, { useContext, useEffect } from 'react';
import { ComputerPickedContext } from './main_page';

export default function Computer_pick(props) {
    const [[computerPicked, setComputerPicked], [icon, setIcon], [transformValueComputer, setTransformValueComputer], 
    [transformIconValueComputer, setTransformIconValueComputer], 
    [moveRightMainGame, setMoveRightMainGame],
    [moveRightMainGameTwo, setMoveRightMainGameTwo],
    [result, setResult], [startGame, setStartGame] ] = useContext(ComputerPickedContext);

    useEffect(() => {
        if (computerPicked != undefined){
            switch (computerPicked){
                case 'lizard':
                    setTransformValueComputer('rotateZ(240deg)');
                    setTransformIconValueComputer('rotateZ(-240deg)');
                    setMoveRightMainGameTwo('55px');
                    break;
                case 'spock':
                    setTransformValueComputer('rotateZ(175deg)');
                    setTransformIconValueComputer('rotateZ(-175deg)');
                    setMoveRightMainGameTwo('85px');
                    break;
                case 'scissors':
                    setTransformValueComputer('rotateZ(86deg)');
                    setTransformIconValueComputer('rotateZ(-86deg)');
                    setMoveRightMainGameTwo('120px');
                    break;
                case 'rock':
                    setTransformValueComputer('rotateZ(295deg)');
                    setTransformIconValueComputer('rotateZ(-295deg)');
                    setMoveRightMainGameTwo('55px');
                    break;
                case 'paper':
                    setTransformValueComputer('rotateZ(-2deg)');
                    setTransformIconValueComputer('rotateZ(2deg)');
                    setMoveRightMainGameTwo('85px');
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
        setIcon(userValue);
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
        setMoveRightMainGame('55px');
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
        setMoveRightMainGame('90px');
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
        setMoveRightMainGame('125px');
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
        setMoveRightMainGame('50px');
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
        setMoveRightMainGame('80px');
    }


    return(
        <>
            <div className={['game_icon_container', props.id].join(' ')} style={{display: (computerPicked ==  props.id || computerPicked == undefined) ? 'flex' : 'none'}}>
                <div className='shadow' style={{transform: (computerPicked == props.id) ? transformIconValueComputer : 'unset'}}>                           
                    <img src={props.imageUrl} alt="pentagon skeleton for the game element icons" className='game_icon'/>
                    <div className='inner_circle'></div>
                </div>
            </div>
        </>
    )
}