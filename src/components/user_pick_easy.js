import React, { useContext, useEffect } from 'react';
import { UserPickedContextHard } from './easy_page';

let userInput;

export default function User_pick_easy (props) {
    const [[transformValue, setTransformValue], [transformIconValue, setTransformIconValue], [iconEasy, setIconEasy],
    [resultEasy, setResultEasy], [startGame, setStartGame]] = useContext(UserPickedContextHard)

    useEffect(() => {
    }, [iconEasy]);

    return (
        <>
            <div className={['game_icon_container', `${props.id}_easy`].join(' ')} onClick={() => {
            userInput=props.id; 
            setStartGame(userInput); 
            setTransformValue(props.rotation); 
            setTransformIconValue(props.antiRotation)}} 
            style={{display: (iconEasy ==  props.id || iconEasy == undefined) ? 'flex' : 'none'}}>
                <div className='shadow' style={{transform: (iconEasy == props.id) ? transformIconValue : 'unset'}}>                           
                    <img src={props.imageUrl} alt="pentagon skeleton for the game element icons" className='game_icon'/>
                    <div className='inner_circle'></div>
                </div>
            </div>
        </>
    )
};