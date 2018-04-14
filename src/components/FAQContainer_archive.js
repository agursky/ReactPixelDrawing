import React from 'react';
import save from '../img/save.png';


export default function FAQContainer(props) {
    return (
        <div id="faq-container" style={props.style}>
            <button type = 'button' className = 'xOut' onClick = {props.clickFunc}>&#10006;&#xFE0E;</button>
            <div id='faq-sub-container'>
                <h1>FAQ</h1>
                <h2>Saving Your Work</h2>
                <p>Saving is temporarily unavailable. The functionality should return shortly. For the time being, the best way to save a drawing is by taking a screenshot. Click on the links below to find out how to take a screenshot on your device.</p>
                <ul>
                    <li><a href='https://www.digitaltrends.com/mobile/how-to-take-a-screenshot-iphone/' target='_blank'>iPhone</a></li>
                    <li><a href='https://lifehacker.com/5994516/how-to-take-a-screenshot-on-android' target='_blank'>Android device</a></li>
                    <li><a href='https://www.digitaltrends.com/computing/how-to-take-a-screenshot-on-a-mac/' target='_blank'>Mac Desktop Computer</a></li>
                    <li><a href='https://www.cnet.com/how-to/7-ways-to-take-screenshots-in-windows-10/' target='_blank'>Windows Computer</a></li>
                </ul>
//                <h2>How to Save your Work</h2>
//                <h3>In Firefox and Chrome</h3>
//                <p>In these browswers, when you press the save button (<img className='button-img' src={save} alt='Save button'/>) the image file will automatically download into whatever folder you have set as your downloads folder. The file will be named 'Pixel Drawing.png'. For multiple files, a number will be added to the end of the file name to differentiate between drawings.</p>
//                <h3>In Safari, Mobile Safari, and Mobile Chrome</h3>
//                <p>In these browsers, when you press the save button (<img className='button-img' src={save} alt='Save button'/>), it will open the image in a new browswer window. From there you can save the image by touching the image (on mobile) or right clicking (on Desktop).</p>
//                <h3>In Mobile Firefox</h3>
//                <p>Saving is not supported on Mobile Firefox. Sorry:(</p>
                <h3>If you have any further questions or feedback, I'd love to hear from you. I can be reached at <a href='mailto:agursky.js@gmail.com'>agursky.js@gmail.com</a></h3>
            </div>
        </div>
    )
}