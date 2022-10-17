import React, {useContext} from 'react';
import { UserPickedContext, ComputerPickedContext, ResultBoxContext } from './main_page(hard)';
import triangle from '../images/bg-triangle.svg';
import scissors from '../images/icon-scissors.svg';
import rock from '../images/icon-rock.svg';
import paper from '../images/icon-paper.svg';
import User_pick from './user_pick';
import Computer_pick from './computer_pick';
import Result_box from './result_box';

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

export default function Easy_page() {
    const [[transformValue, setTransformValue], [transformIconValue, setTransformIconValue], [iconHard, setIconHard],
    [startGame, setStartGame], [difficulty, setDifficulty], [iconEasy, setIconEasy], 
    [chosenClassName, setChosenClassName], [chosenIcon, setChosenIcon], [transformValueComputer, setTransformValueComputer], 
    [transformIconValueComputer, setTransformIconValueComputer], [computerPicked, setComputerPicked], [moveRightMainGame, setMoveRightMainGame],
    [moveRightMainGameTwo, setMoveRightMainGameTwo], [result, setResult], 
    [resultDisplay, setResultDisplay], [resetGame, setResetGame]] = useContext(UserPickedContext);

    return (
        <>
        <div className='general_container_easy'>
            <div className='main_game_container'>
                <main className='main_game'
                style={{transform: (iconEasy == 'lizard', 'rock', 'paper', 'scissors') ? transformValue : 'unset', right: (result) ? moveRightMainGame : 'unset'}}>
                    <img src={triangle}
                        alt="pentagon/triangle skeleton for the game element icons" id={(difficulty == 'easy') ? 'triangle' : 'pentagon'} 
                        style={{display: (iconEasy == undefined) ? 'flex' : 'none'}}>
                    </img>
                    <UserPickedContext.Provider value={ [ [transformValue, setTransformValue], [transformIconValue, setTransformIconValue], 
                        [iconEasy, setIconEasy], [startGame, setStartGame], [difficulty, setDifficulty],
                         [iconHard, setIconHard], [chosenClassName, setChosenClassName], [chosenIcon, setChosenIcon], [result, setResult] ]}>
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
                    [result, setResult], [startGame, setStartGame], [chosenClassName, setChosenClassName], [difficulty, setDifficulty] ]}>
                        {
                            data.map((data) => {
                                return <Computer_pick key={data.id} {...data}/>
                            })
                        }
                    </ComputerPickedContext.Provider>
                </div>
                <ResultBoxContext.Provider value={[ [computerPicked, setComputerPicked], [resultDisplay, setResultDisplay], [result, setResult], [resetGame, setResetGame] ]}>
                    <Result_box />
                </ResultBoxContext.Provider>
            </div>
        </div>
        </>
    )
};