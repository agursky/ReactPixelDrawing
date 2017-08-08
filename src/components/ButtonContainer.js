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
    render() {
        return(
            <div className = 'buttonContainer'>
                    <button type='button' onClick={this.props.buttonFunc[0]} onMouseOver={function() {this.hoverFunc('Help')}.bind(this)}><img src={help} alt='Help Button'/></button> 
                    <button type='button' className='mobile-button' onClick={this.props.buttonFunc[1]} onMouseOver={function() {this.hoverFunc('Resize Grid')}.bind(this)}><img src={addRemove} alt='Resize Grid Button'/></button>
                    <button type='button' className='desktop-button' onClick={this.props.buttonFunc[2]} onMouseOver={function() {this.hoverFunc('Remove Column')}.bind(this)}><img src={remCol} alt='Remove Column Button'/></button> 
                    <button type='button' className='desktop-button' onClick={this.props.buttonFunc[3]} onMouseOver={function() {this.hoverFunc('Remove Row')}.bind(this)}><img src={remRow} alt='Remove Row Button'/></button>
                    <button type='button' className='desktop-button' onClick={this.props.buttonFunc[4]} onMouseOver={function() {this.hoverFunc('Add Column')}.bind(this)}><img src={addCol} alt='Add Column Button'/></button>
                    <button type='button' className='desktop-button' onClick={this.props.buttonFunc[5]} onMouseOver={function() {this.hoverFunc('Add Row')}.bind(this)}><img src={addRow} alt='Add Row Button'/></button>
                    <button type='button' onClick={this.props.buttonFunc[6]} onMouseOver={function() {this.hoverFunc('Start Over')}.bind(this)}><img src={clear} alt='Clear Button'/></button>
                    <button type='button' onClick={this.props.buttonFunc[7]} onMouseOver={function() {this.hoverFunc('Save')}.bind(this)}><img src={save} alt='Save Button'/></button>
                    <button type='button' className='mobile-button' onClick={this.props.buttonFunc[8]} onMouseOver={function() {this.hoverFunc('Choose a Color')}.bind(this)}><img src={mobColor} alt='Open Color Menu Button'/></button>
                    <span className='helper-span'>{this.state.helperText}</span>
                </div>
        )
    }
};