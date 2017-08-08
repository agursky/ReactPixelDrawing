import React from 'react';

export default function Modal(props) {
    return (
        <div className='modal-container' style={props.style}>
            <p>{props.modalMessage}</p>
            <button className='cancel-button' onClick={props.removeModal}>Cancel</button>
            <button className='confirm-button' onClick={props.confirmModal}>OK</button>
        </div>
    );
}