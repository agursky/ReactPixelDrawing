import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import $ from 'jquery';
import html2canvas from 'html2canvas';
import FileSaver from 'file-saver';
import './styles/App.css';
import ColorBox from './components/Colorbox';
import ButtonContainer from './components/ButtonContainer';
import TableRow from './components/TableRow';
import Modal from './components/Modal';
import FAQContainer from './components/FAQContainer';
import AddRemoveWindow from './components/AddRemoveWindow';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            drawingTable: this.buildTable().tableData,
            cellCount: this.buildTable().cellCount,
            rowQuant: this.buildTable().rowQuant,
            colQuant: this.buildTable().colQuant,
            currentColor: 'black',
            modalMessage: 'Are you sure you want to erase EVERYTHING?',
            modalStyle: {display: 'none'}, 
            colorContainerStyle: {},
            helpStyle: {}, 
            addRemoveStyle: {}, 
            faqStyle: {}
        };
    }
    determineTableDimensions() {
        var colQuant;
        var rowQuant;
        if (window.innerWidth < 768) {
            colQuant = Math.floor(window.innerWidth/36) - 1;
            rowQuant = Math.floor((window.innerHeight - 63)/36) - 1;
        } else {
            colQuant = Math.floor((window.innerWidth - 395)/28) - 1;
            rowQuant = Math.floor((window.innerHeight - 78)/28) - 1;
            if (colQuant > 20) {
                colQuant = 20;
            }
            if (rowQuant > 20) {
                rowQuant = 20;
            }
        }
        
        var tableDim = {
            colQuant: colQuant,
            rowQuant: rowQuant
        }
        
        return tableDim;

    }
    buildTable() {
        //Create Table
        
        var colQuant = this.determineTableDimensions().colQuant;
        var rowQuant = this.determineTableDimensions().rowQuant;
        var tableData = [];
        var cellCount = 0;

        for (var x = 0; x < rowQuant; x+=1) {
            tableData.push([]);
            for (var y = 0; y < colQuant; y+=1) {
                tableData[x].push({color: 'white', id: cellCount});
                cellCount+=1;
            }
        }
        
        var tableInfo = {
            tableData: tableData,
            cellCount: cellCount,
            rowQuant: rowQuant,
            colQuant: colQuant
        }
        
        return tableInfo;
    }
    colorGrid = ['white', '#b7b7b7', 'gray', '#545454','black', '#ffc3bf', '#ffa9a3', '#ff8b83', '#ff685c', '#ff3d00', '#ffebcc', '#ffd08f', '#ffba52', '#ffa114', '#d68100', '#fffce3', '#fff7b3', '#fff283', '#ffed53', '#ffe500', '#c6edc7', '#9ce09e', '#71c674', '#4caf50', '#2e9f33', '#bbd7ed', '#90c5ef', '#54abf0', '#2196f3', '#0382e8', '#d3b8d8', '#ba82c4', '#b452c4', '#9c27b0', '#85019b', '#ffd2da', '#ffb0be', '#ff9bad', '#ff7991', '#ff718a']
    changeBoxColor(val) {
        val.color = this.state.currentColor;
        this.setState({drawingTable: this.state.drawingTable})
    }
    changeColorChoice(val) {
        this.setState({currentColor: val});
        
    }
    clear(val) {
        var table = this.state.drawingTable;
        for (var x = 0; x < table.length; x+=1) 
            {
                for (var y = 0; y < table[x].length; y+=1) {
                    table[x][y].color = 'white';
                }
            }
        this.setState({drawingTable: table});
    }
    addRow() {
        var table = this.state.drawingTable;
        var cellCount = this.state.cellCount;
        table.push([]);
        this.setState({drawingTable: table});
        for (var x = 0; x < this.state.colQuant; x+=1) {
            table[table.length-1].push({color: 'white', id: cellCount});
            cellCount+=1;
        }
        this.setState({cellCount: cellCount, drawingTable: table, rowQuant: this.state.rowQuant + 1});
    }
    removeRow() {
        if (this.state.rowQuant > 1) {
            this.state.drawingTable.pop();
            this.setState({rowQuant: this.state.rowQuant - 1, drawingTable: this.state.drawingTable});
        }
        
    }
    addColumn() {
        var table = this.state.drawingTable;
        var cellCount = this.state.cellCount;
        this.setState({colQuant: this.state.colQuant + 1});
        for (var x = 0; x < this.state.rowQuant; x+=1) {
            table[x].push({color: 'white', id: cellCount});
            cellCount+=1;
        }
        this.setState({cellCount: cellCount, drawingTable: table});
    }
    removeColumn() {
        if (this.state.colQuant > 1) {
            for (var x = 0; x < this.state.rowQuant; x+=1) {
                this.state.drawingTable[x].pop();
            }
            this.setState({colQuant: this.state.colQuant - 1, drawingTable: this.state.drawingTable});
        }
        
    }
    saveImage() {
        $('#boxContainer').css({
            position: 'absolute',
            top: 0,
            left: 0
        });
        html2canvas(document.getElementById('boxContainer')).then(function(canvas) {
                canvas.toBlob(function(blob) {
                FileSaver.saveAs(blob, "Pixel Drawing.png");
                });
                $('#boxContainer').css({
                    position: 'static',
                    top: 'initial',
                    left: 'initial'
                });                
            })
    }

    showModal() {
        this.setState({modalStyle: {display: 'initial'}});
    }
    removeModal() {
        this.setState({modalStyle: {display: 'none'}});
    }
    confirmModal() {
        this.clear();
        this.removeModal();
    }
    toggler(el) {
        var togPal = 'block';
        if (this.state[el].display === 'block') {
            togPal = 'none';
        }
        this.setState({[el]: {display: togPal}});
    }
    buttonFunctionSet = [function() {this.toggler('faqStyle')}.bind(this), function() {this.toggler('addRemoveStyle')}.bind(this), function() {this.removeColumn()}.bind(this), function() {this.removeRow()}.bind(this), function() {this.addColumn()}.bind(this), function() {this.addRow()}.bind(this), function() {this.showModal()}.bind(this), function() {this.saveImage()}.bind(this), function() {this.toggler('colorContainerStyle')}.bind(this), function() {this.toggler('addRemoveStyle')}.bind(this)]
    componentDidMount() {
        if (window.innerWidth < 768) {
            var windowWidth = $(window).width();
            var boxContainerWidth = $('#boxContainer').outerWidth();
            $('#boxContainer').css('margin-left', (windowWidth - boxContainerWidth)/2 + 'px');
        }        
    }
    render() {
        return(
            <div>
                <div className = 'colorContainer' style={this.state.colorContainerStyle}>
                    <button type = 'button' className = 'xOut' onClick = {function() {this.toggler('colorContainerStyle');}.bind(this)}>&#10006;&#xFE0E;</button>
                    <div className = 'sub-color-container'>
                        {this.colorGrid.map(function(item, index) {
                            return <ColorBox style={item} key={index} changeDrawColor={function() {
                                this.changeColorChoice(item); 
                                if (window.innerWidth < 768) {
                                    this.toggler('colorContainerStyle');
                                }
                            }.bind(this)}/>
                        }.bind(this))}
                    </div>
                </div> 
                <ButtonContainer buttonFunc = {this.buttonFunctionSet}/>
                <div id = 'boxContainer'>
                    <div className='table-container'>
                            {this.state.drawingTable.map(function(item, index) {
                                return (        
                                    <TableRow key={index} cellData={item} trClickFunc= {function(item) {this.changeBoxColor(item)}.bind(this)}/>
                                    )}.bind(this))}
                    </div>
                </div>
                <Modal modalMessage={this.state.modalMessage} style={this.state.modalStyle} removeModal={function() {this.removeModal()}.bind(this)} confirmModal={function() {this.confirmModal()}.bind(this)}/>
                <AddRemoveWindow style={this.state.addRemoveStyle} addRemFunc={this.buttonFunctionSet}/>
                <FAQContainer style={this.state.faqStyle} clickFunc = {function() {this.toggler('faqStyle');}.bind(this)}/>

            </div>
        );
    }
}

export default App;
