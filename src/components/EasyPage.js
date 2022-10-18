import React, {useContext} from 'react';
import { UserPickedContext, ComputerPickedContext, ResultBoxContext } from './MainPageHard';
import triangle from '../images/bg-triangle.svg';
import scissors from '../images/icon-scissors.svg';
import rock from '../images/icon-rock.svg';
import paper from '../images/icon-paper.svg';
import UserPick from './UserPick';
import ComputerPick from './ComputerPick';
import ResultBox from './ResultBox';

const data = [
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

export default function EasyPage() {
    const [[transformValue, setTransformValue], [transformIconValue, setTransformIconValue], [iconHard, setIconHard],
    [startGame, setStartGame], [difficulty], [iconEasy, setIconEasy], 
    [chosenClassName, setChosenClassName], [chosenIcon, setChosenIcon], [transformValueComputer, setTransformValueComputer], 
    [transformIconValueComputer, setTransformIconValueComputer], [computerPicked, setComputerPicked], [moveRightMainGame, setMoveRightMainGame],
    [moveRightMainGameTwo, setMoveRightMainGameTwo], [result, setResult], 
    [resultDisplay, setResultDisplay], [setResetGame]] = useContext(UserPickedContext);

    return (
        <>
        <div className='general_container_easy'>
            <div className='main_game_container'>
                <main className='main_game'
                style={{transform: (iconEasy === 'lizard', 'rock', 'paper', 'scissors') ? transformValue : 'unset', right: (result) ? moveRightMainGame : 'unset'}}>
                    <img src={triangle}
                        alt="pentagon/triangle skeleton for the game element icons" id={(difficulty === 'easy') ? 'triangle' : 'pentagon'} 
                        style={{display: (iconEasy === undefined) ? 'flex' : 'none'}}>
                    </img>
                    <UserPickedContext.Provider value={ [ [setTransformValue], [transformIconValue, setTransformIconValue], 
                        [iconEasy, setIconEasy], [setStartGame], [difficulty],
                         [iconHard, setIconHard], [chosenClassName, setChosenClassName], [chosenIcon, setChosenIcon], [result] ]}>
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
                    [result, setResult], [startGame], [chosenClassName], [difficulty] ]}>
                        {
                            data.map((data) => {
                                return <ComputerPick key={data.id} {...data}/>
                            })
                        }
                    </ComputerPickedContext.Provider>
                </div>
                <ResultBoxContext.Provider value={[ [computerPicked], [resultDisplay], [setResetGame] ]}>
                    <ResultBox />
                </ResultBoxContext.Provider>
            </div>
        </div>
        </>
    )
};