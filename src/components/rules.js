import React from 'react';
import Rulesimage from '../images/image-rules-bonus.svg';
import Closeicon from '../images/icon-close.svg';

export default function rules(props) {
    const {
        show,
        SETSHOWRULES
    } = props;
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
                        <img className='rules_image' src={Rulesimage} alt='an illustration showing the rules of the game'/>
                    </div>
                </div>
            </div>
        </>
    )
};