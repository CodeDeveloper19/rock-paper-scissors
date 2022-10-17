import React, {useState, useContext, createContext} from 'react';
import { UserPickedContext } from './main_page(hard)';
import triangle from '../images/bg-triangle.svg';
import scissors from '../images/icon-scissors.svg';
import rock from '../images/icon-rock.svg';
import paper from '../images/icon-paper.svg';
import User_pick from './user_pick';

const data = [
    {
        id: 'paper',
        rotation: 'unset',
        antiRotation: 'unset',
        imageUrl: paper
    },
    {
        id: 'scissors',
        rotation: 'unset',
        antiRotation: 'unset',
        imageUrl: scissors
    },
    {
        id: 'rock',
        rotation: 'unset',
        antiRotation: 'unset',
        imageUrl: rock
    }
]

export default function Easy_page() {
    const [[transformValue, setTransformValue], [transformIconValue, setTransformIconValue], [iconHard, setIconHard],
    [startGame, setStartGame], [difficulty, setDifficulty], [iconEasy, setIconEasy], [chosenClassName, setChosenClassName], [chosenIcon, setChosenIcon]  ] = useContext(UserPickedContext);

    return (
        <>
        <div className='general_container_easy'>
            <div className='main_game_container'>
                <main className='main_game'>
                    <img src={triangle}
                        alt="pentagon skeleton for the game element icons" id='triangle' 
                        style={{display: (iconEasy == undefined) ? 'flex' : 'none'}}>
                    </img>
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
                <div className='main_game_two'>
                </div>
            </div>
        </div>
        </>
    )
};