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
                <h3>If you have any further questions or feedback, I'd love to hear from you. I can be reached at <a href='mailto:agursky.js@gmail.com'>agursky.js@gmail.com</a></h3>
            </div>
        </div>
    )
}