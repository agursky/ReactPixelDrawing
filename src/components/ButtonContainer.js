import React, { Component } from 'react';
import save from '../img/save.png';
import addCol from '../img/addCol.png';
import addRow from '../img/addRow.png';
import remCol from '../img/remCol.png';
import remRow from '../img/remRow.png';
import mobColor from '../img/mobColor.png';
import help from '../img/help.svg';
import clear from '../img/clear.svg';
import addRemove from '../img/addRemove.svg';

export default class ButtonContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            helperText: 'Helper Span'
        }
    }
    hoverFunc(el) {
        this.setState({helperText: el});
    }
    buttonSet = [{class: '',
                  action:this.props.buttonFunc[0],
                  hoverText: 'Help', 
                  imgSrc: help,
                  altText: 'Help Button'},
                {class: 'mobile-button',
                  action:this.props.buttonFunc[1],
                  hoverText: 'Resize Grid', 
                  imgSrc: addRemove,
                  altText: 'Resize Grid Button'},
                {class: 'desktop-button',
                  action:this.props.buttonFunc[2],
                  hoverText: 'Remove Column', 
                  imgSrc: remCol,
                  altText: 'Remove Column Button'},
                {class: 'desktop-button',
                  action:this.props.buttonFunc[3],
                  hoverText: 'Remove Row', 
                  imgSrc: remRow,
                  altText: 'Remove Row Button'},
                {class: 'desktop-button',
                  action:this.props.buttonFunc[4],
                  hoverText: 'Add Column', 
                  imgSrc: addCol,
                  altText: 'Add Column Button'},
                {class: 'desktop-button',
                  action:this.props.buttonFunc[5],
                  hoverText: 'Add Row', 
                  imgSrc: addRow,
                  altText: 'Add Row Button'},
                {class: '',
                  action:this.props.buttonFunc[6],
                  hoverText: 'Start Over', 
                  imgSrc: clear,
                  altText: 'Clear Button'},
                {class: 'mobile-button',
                  action:this.props.buttonFunc[8],
                  hoverText: 'Choose a Color', 
                  imgSrc: mobColor,
                  altText: 'Open Color Menu Button'}]
    render() {
        return(
            <div className = 'buttonContainer'>
                    {this.buttonSet.map(function(item, index) {
                        return <button type='button' className={item.class} key={index} onClick={item.action} onMouseOver={function() {this.hoverFunc(item.hoverText)}.bind(this)}><img src={item.imgSrc} alt={item.altText}/></button>
                        }.bind(this))}
                    <span className='helper-span'>{this.state.helperText}</span>
                </div>
        )
    }
};