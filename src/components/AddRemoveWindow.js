import React from 'react';
import addCol from '../img/addCol.png';
import addRow from '../img/addRow.png';
import remCol from '../img/remCol.png';
import remRow from '../img/remRow.png';

export default function AddRemoveWindow(props) {
    return (
        <div className='add-remove center' style={props.style}>
        <div className='add-remove-row'>
            <div className='add-remove-container'><button type='button' onClick={props.addRemFunc[0]}><img src={addRow} alt='Add Row'/></button><span>Add<br/> Row</span></div>
            <div className='add-remove-container'><button type='button' onClick={props.addRemFunc[1]}><img src={addCol} alt='Add Column'/></button><span>Add<br/>  Column</span></div>
        </div>
        <div className='add-remove-row'>
            <div className='add-remove-container'><button type='button' onClick={props.addRemFunc[2]}><img src={remRow} alt='Remove Row'/></button><span>Remove<br/>  Row</span></div>
            <div className='add-remove-container'><button type='button' onClick={props.addRemFunc[3]}><img src={remCol} alt='Remove Column'/></button><span>Remove<br/>  Column</span></div>
        </div>
        <button type='button' className='confirm-button' onClick={props.addRemFunc[4]}>Done</button>
        </div>
    )
}