import React, { useContext } from 'react';
import RulesImageHard from '../images/image-rules-bonus.svg';
import RulesImageEasy from '../images/image-rules.svg';
import Closeicon from '../images/icon-close.svg';
import { RulesContext } from './main_page(hard)';

export default function Rules(props) {
    const {
        show,
        SETSHOWRULES
    } = props;

    const [[difficulty, setDifficulty]] = useContext(RulesContext);

    return (
        <>
            <div id='rules_container' style={{display: show ? 'flex' : 'none'}}>
                <div className='rules_mini'>
                    <div className='rules_title'>
                        <h1>RULES</h1>
                        <div className='close_icon' onClick={SETSHOWRULES}>
                            <img className='close_icon_image' src={Closeicon} alt='a close "x" icon'/>
                        </div>
                    </div>
                    <div className='rules_image_container'>
                        <img className='rules_image' src={(difficulty == 'easy') ? RulesImageEasy : RulesImageHard} alt='an illustration showing the rules of the game' 
                        style={{height: (difficulty == 'easy') ? '90%' : '97%'}}/>
                    </div>
                </div>
            </div>
        </>
    )
};