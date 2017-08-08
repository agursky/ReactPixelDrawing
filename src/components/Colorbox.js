import React from 'react';

export default function ColorBox(props) {
    var divStyle = {backgroundColor: props.style};
    return <button type='button' className='outerBox' onClick={props.changeDrawColor}><div className='innerBox' style={divStyle}></div></button>;
}