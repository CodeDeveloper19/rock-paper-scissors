import React, { useContext, useState } from 'react';
import { ResultBoxContext } from './MainPageHard';

export default function ResultBox() {

    const [[computerPicked], [resultDisplay], [setResetGame]] = useContext(ResultBoxContext);
    const [hovered, setHovered] = useState(undefined)

    return(
        <>
        <div className='result_box' style={{display: ((computerPicked === undefined)) ? 'none' : 'flex'}}>
            <p>{resultDisplay}</p>
            <button className='result_button' 
            style={{color: (hovered) ? '#c16076' : 'hsl(229, 25%, 31%)'}}
                onMouseEnter={() => {
                    setHovered(true);
                }} 
                onMouseLeave={() => {
                    setHovered(false);
                }}
                onTouchStart={() => {
                    setHovered(true);
                }} 
                onTouchEnd={() => {
                    setHovered(false);
                }}
                onClick={() => setResetGame(true)}>
                    PLAY AGAIN
            </button>
        </div>
        </>
    )
}