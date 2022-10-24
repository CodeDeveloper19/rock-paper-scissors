import React, {useContext, useEffect} from 'react';
import { UserPickedContext, ComputerPickedContext, ResultBoxContext } from './MainPage';
import triangle from '../images/bg-triangle.svg';
import pentagon from '../images/bg-pentagon.svg';
import scissors from '../images/icon-scissors.svg';
import paper from '../images/icon-paper.svg';
import rock from '../images/icon-rock.svg';
import lizard from '../images/icon-lizard.svg';
import spock from '../images/icon-spock.svg';
import UserPick from './UserPick';
import ComputerPick from './ComputerPick';
import ResultBox from './ResultBox';

let data = [];

const data1 = [
    {
        id: 'paper',
        rotation: 'rotateZ(-133deg)',
        antiRotation: 'rotateZ(133deg)',
        imageUrl: paper
    },
    {
        id: 'scissors',
        rotation: 'rotateZ(-38.5deg)',
        antiRotation: 'rotateZ(38.5deg)',
        imageUrl: scissors
    },
    {
        id: 'rock',
        rotation: 'rotateZ(97deg)',
        antiRotation: 'rotateZ(-97deg)',
        imageUrl: rock
    }
]

const data2 = [
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

export default function EasyHard() {
    const [[transformValue, setTransformValue], [transformIconValue, setTransformIconValue], [iconHard, setIconHard],
    [startGame, setStartGame], [difficulty], [iconEasy, setIconEasy], 
    [chosenClassName, setChosenClassName], [chosenIcon, setChosenIcon], [transformValueComputer, setTransformValueComputer], 
    [transformIconValueComputer, setTransformIconValueComputer], [computerPicked, setComputerPicked], [moveRightMainGame, setMoveRightMainGame],
    [moveRightMainGameTwo, setMoveRightMainGameTwo], [result, setResult], 
    [resultDisplay], [setResetGame], [canMove], [canIncreaseIcon, setCanIncreaseIcon], [adjustedLeftEasy], [adjustedRightEasy], 
    [adjustedLeftHard], [adjustedRightHard]] = useContext(UserPickedContext);

    useEffect(() => {
        if (difficulty === 'easy'){
            data = data1;
        } else {
            data = data2
        }
    }, [difficulty])

    return (
        <>
        <div className='general_container'>
            <div className='main_game_container'>
                <div className='main_game'
                style={{transform: (iconEasy === 'lizard', 'rock', 'paper', 'scissors') ? transformValue : 'unset', right: (moveRightMainGame) ? moveRightMainGame : 'unset'}}>
                    <img src={(difficulty === 'easy') ? triangle : pentagon}
                        alt="pentagon/triangle skeleton for the game element icons" aria-hidden='true' className={(difficulty === 'easy') ? 'triangle' : 'pentagon'} 
                        style={{display: (result === undefined) ? 'flex' : 'none'}}>
                    </img>
                    <UserPickedContext.Provider value={ [ [setTransformValue], [transformIconValue, setTransformIconValue], 
                        [iconEasy, setIconEasy], [setStartGame], [difficulty],
                         [iconHard, setIconHard], [chosenClassName, setChosenClassName], [chosenIcon, setChosenIcon], [result], [canMove], [canIncreaseIcon, setCanIncreaseIcon] ]}>
                        {
                            data.map((data) => {
                                return <UserPick key={data.id} {...data}/>
                            })
                        }
                    </UserPickedContext.Provider>
                </div>
                <div className='main_game_two' style={{transform: (computerPicked !== undefined) ? transformValueComputer : 'unset', 
                zIndex: (computerPicked !== undefined) ? '0' : '-1',
                left: (moveRightMainGameTwo) ? moveRightMainGameTwo : 'unset',
                display: (computerPicked === undefined) ? 'none' : 'flex'}}>
                    <ComputerPickedContext.Provider value = {[[computerPicked, setComputerPicked], 
                    [setIconHard], 
                    [setTransformValueComputer], 
                    [transformIconValueComputer, setTransformIconValueComputer], 
                    [setMoveRightMainGame],
                    [setMoveRightMainGameTwo],
                    [result, setResult], [startGame], [chosenClassName], [difficulty], [canMove], [canIncreaseIcon, setCanIncreaseIcon] ]}>
                        {
                            data.map((data) => {
                                return <ComputerPick key={data.id} {...data}/>
                            })
                        }
                    </ComputerPickedContext.Provider>
                </div>
                <ResultBoxContext.Provider value={[ [computerPicked], [resultDisplay], [setResetGame], [canMove] ]}>
                    <ResultBox />
                </ResultBoxContext.Provider>
                <p className='you_pick' style={{display: (canIncreaseIcon) ? 'flex' : 'none', top: (canMove === false) ? '245px' : '40px', left: (difficulty === "easy") ? adjustedLeftEasy : adjustedLeftHard}}>You Picked</p>
                <p className='house_pick' style={{display: (canIncreaseIcon) ? 'flex' : 'none', top: (canMove === false) ? '245px' : '40px', right: (difficulty === "easy") ? adjustedRightEasy : adjustedRightHard}}>The House Picked</p>
            </div>
        </div>
        </>
    )
};