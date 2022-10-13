import React, { useEffect, useContext} from 'react';
import { UserPickedContext } from './main_page';

let userInput;

export default function User_pick(props) {
    const [[transformValue, setTransformValue], [transformIconValue, setTransformIconValue], [icon, setIcon],
     [startGame, setStartGame]] = useContext(UserPickedContext);

    useEffect(() => {
    }, [icon]);

    return (
        <>
            <div className={['game_icon_container', props.id].join(' ')} onClick={() => {
            userInput=props.id; 
            setStartGame(userInput); 
            setTransformValue(props.rotation); 
            setTransformIconValue(props.antiRotation)}} 
            style={{display: (icon ==  props.id || icon == undefined) ? 'flex' : 'none'}}>
                <div className='shadow' style={{transform: (icon == props.id) ? transformIconValue : 'unset'}}>                           
                    <img src={props.imageUrl} alt="pentagon skeleton for the game element icons" className='game_icon'/>
                    <div className='inner_circle'></div>
                </div>
            </div>
        </>
    )
};