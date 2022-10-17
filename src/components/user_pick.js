import React, { useEffect, useContext} from 'react';
import { UserPickedContext } from './main_page(hard)';

let userInput;

export default function User_pick (props) {
    const [[transformValue, setTransformValue], [transformIconValue, setTransformIconValue], [iconHard, setIconHard],
     [startGame, setStartGame], [difficulty, setDifficulty], [iconEasy, setIconEasy],
    [chosenClassName, setChosenClassName], [chosenIcon, setChosenIcon] ] = useContext(UserPickedContext);

    useEffect(() => {
        if (difficulty == 'easy'){
            setChosenIcon(iconEasy);
            setChosenClassName('easy');
        } else if (difficulty == 'hard'){
            setChosenIcon(iconHard);
            setChosenClassName('hard');
        }
    }, [difficulty, iconEasy, iconHard]);

    const setIcon = (userInput) =>{
        if (difficulty == 'easy'){
            setIconEasy(userInput);
        } else if (difficulty == 'hard'){
            setIconHard(userInput);
        }
    }

    return (
        <>
            <div className={['game_icon_container', chosenClassName].join(' ')} onClick={() => {
            userInput=props.id; 
            setIcon(userInput)
            setStartGame(userInput); 
            setTransformValue(props.rotation); 
            setTransformIconValue(props.antiRotation)}} 
            style={{display: ((chosenIcon ==  props.id || chosenIcon == undefined) && chosenClassName == difficulty) ? 'flex' : 'none'}}>
                <div className='shadow' style={{transform: (chosenIcon == props.id) ? transformIconValue : 'unset'}}>                           
                    <img src={props.imageUrl} alt="pentagon skeleton for the game element icons" className='game_icon'/>
                    <div className='inner_circle'></div>
                </div>
            </div>
        </>
    )
};