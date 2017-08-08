import React from 'react';

export default function TableCell(props) {
    return <div className='box table-cell' style={props.styles} onClick={props.clickFunc}></div>;
}