import React, {useState, useContext, createContext} from 'react';
import { EasyContext } from './main_page(hard)';
import triangle from '../images/bg-triangle.svg';
import scissors from '../images/icon-scissors.svg';
import rock from '../images/icon-rock.svg';
import paper from '../images/icon-paper.svg';
import User_pick_easy from './user_pick_easy';

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

export const UserPickedContextHard = createContext();
export default function Easy_page() {
    const [[difficulty, setDifficulty]] = useContext(EasyContext);

    const [iconEasy, setIconEasy] = useState(undefined);
    const [transformValue, setTransformValue] = useState(undefined);
    const [transformIconValue, setTransformIconValue] = useState(undefined);
    const [resultEasy, setResultEasy] = useState(undefined);
    const [startGame, setStartGame] = useState(undefined);

    return (
        <>
        <div className='general_container_easy'>
            <div className='main_game_container'>
                <main className='main_game'>
                    <img src={triangle}
                        alt="pentagon skeleton for the game element icons" id='triangle' 
                        style={{display: (iconEasy == undefined) ? 'flex' : 'none'}}>
                    </img>
                    <UserPickedContextHard.Provider value={[[transformValue, setTransformValue], [transformIconValue, setTransformIconValue], [iconEasy, setIconEasy],
                    [resultEasy, setResultEasy], [startGame, setStartGame]]}>
                        {
                            data.map((data) => {
                                return <User_pick_easy key={data.id} {...data}/>
                            })
                        }
                    </UserPickedContextHard.Provider>
                </main>
                <div className='main_game_two'>
                </div>
            </div>
        </div>
        </>
    )
};