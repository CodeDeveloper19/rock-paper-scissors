import React, { useContext } from 'react';
import { ResultBoxContext } from './main_page(hard)';

let prevResult;

export default function Result_box() {

    const [[computerPicked, setComputerPicked], [resultDisplay, setResultDisplay], [result, setResult], [resetGame, setResetGame]] = useContext(ResultBoxContext);

    return(
        <>
        <button className='result_box' style={{display: (computerPicked == undefined) ? 'none' : 'flex'}} 
            onMouseEnter={() => {
                prevResult = result;
                setResultDisplay('Play Again?');
            }} 
            onMouseLeave={() => {
                setResultDisplay(prevResult);
            }}
            onTouchStart={() => {
                prevResult = result;
                setResultDisplay('Play Again?');
            }} 
            onTouchEnd={() => {
                setResultDisplay(prevResult);
            }}
            onClick={() => setResetGame(true)}>
                {resultDisplay}
        </button>
        </>
    )
}