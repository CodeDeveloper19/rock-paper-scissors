import React, { useEffect, useContext} from 'react';
import { UserPickedContext } from './MainPageHard';

let userInput;

export default function UserPick (props) {
    const [[setTransformValue], [transformIconValue, setTransformIconValue], [iconHard, setIconHard],
     [setStartGame], [difficulty], [iconEasy, setIconEasy],
    [chosenClassName, setChosenClassName], [chosenIcon, setChosenIcon], [result] ] = useContext(UserPickedContext);

    useEffect(() => {
        if (difficulty === 'easy'){
            setChosenIcon(iconEasy);
            setChosenClassName('easy');
        } else if (difficulty === 'hard'){
            setChosenIcon(iconHard);
            setChosenClassName('hard');
        }
    }, [difficulty, iconEasy, iconHard]);

    const setIcon = (userInput) =>{
        if (difficulty === 'easy'){
            setIconEasy(userInput);
        } else if (difficulty === 'hard'){
            setIconHard(userInput);
        }
    }

    return (
        <>
            <div className={['game_icon_container', chosenClassName].join(' ')} 
            onClick={() => {
            userInput=props.id; 
            setIcon(userInput)
            setStartGame(userInput); 
            setTransformValue(props.rotation); 
            setTransformIconValue(props.antiRotation)}} 
            style={{display: (chosenIcon ===  props.id || chosenIcon === undefined) ? 'flex' : 'none',
            boxShadow: (result === 'You win') ? '0 0 0 25px #293251, 0 0 0 50px #232c4b, 0 0 0 70px #1e2748' : 'unset'}}>
                <div className='shadow' style={{transform: (chosenIcon === props.id) ? transformIconValue : 'unset'}}>                           
                    <img src={props.imageUrl} alt="pentagon skeleton for the game element icons" className='game_icon'/>
                    <div className='inner_circle'></div>
                </div>
            </div>
        </>
    )
};