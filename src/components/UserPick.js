import React, { useEffect, useContext, useState} from 'react';
import { UserPickedContext } from './MainPage';

let userInput;
let smallBoxShadow = '0 0 0 10px #293251, 0 0 0 15px #232c4b, 0 0 0 25px #1e2748';
let largeBoxShadow = '0 0 0 15px #293251, 0 0 0 35px #232c4b, 0 0 0 60px #1e2748';

export default function UserPick (props) {
    const [[setTransformValue], [transformIconValue, setTransformIconValue], [iconHard, setIconHard],
     [setStartGame], [difficulty], [iconEasy, setIconEasy],
    [chosenClassName, setChosenClassName], [chosenIcon, setChosenIcon], [result], [canMove], [canIncreaseIcon, setCanIncreaseIcon] ] = useContext(UserPickedContext);

    const [boxShadowValue, setBoxShadowValue] = useState(largeBoxShadow);

    useEffect(() => {
        if (canMove){
            setBoxShadowValue(smallBoxShadow);
            const timer = setTimeout(() => {
                setCanIncreaseIcon(true);
            }, 1000);
            return () => {clearTimeout(timer)};
        } else {
            setBoxShadowValue(largeBoxShadow);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [canMove])

    useEffect(() => {
        if (difficulty === 'easy'){
            setChosenIcon(iconEasy);
            setChosenClassName('easy');
        } else if (difficulty === 'hard'){
            setChosenIcon(iconHard);
            setChosenClassName('hard');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
            aria-label={`You pick ${userInput}`}
            style={{display: (chosenIcon ===  props.id || chosenIcon === undefined) ? 'flex' : 'none',
            boxShadow: (result === 'You win') ? boxShadowValue : 'unset', 
            transform: (canIncreaseIcon) ? 'scale(1.3)' : 'scale(1)'}}>
                <div className='shadow' aria-hidden='true' style={{transform: (chosenIcon === props.id) ? transformIconValue : 'unset'}}>                           
                    <img src={props.imageUrl} alt="pentagon skeleton for the game element icons" aria-hidden='true' className='game_icon'/>
                    <div className='inner_circle' aria-hidden='true'></div>
                </div>
            </div>
        </>
    )
};