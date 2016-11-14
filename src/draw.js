//Create Table

var tableData = [];
var rowQuant = 20;
var colQuant = 20;
var cellCount = 0;

for (var x = 0; x < rowQuant; x+=1) {
    tableData.push([]);
    for (var y = 0; y < colQuant; y+=1) {
        tableData[x].push({color: 'white', id: cellCount});
        cellCount+=1;
    }
}


//Create Color Pallette

var colorGrid = [];
var colorGridChoices = ['white', '#b7b7b7', 'gray', '#545454','black', '#ffc3bf', '#ffa9a3', '#ff8b83', '#ff685c', '#ff3d00', '#ffe9c9', '#ffd69a', '#ffc56f', '#ffaa2d', '#ff9800', '#fffce3', '#fff7b3', '#fff283', '#ffed53', '#ffe500', '#c6edc7', '#9ce09e', '#71c674', '#4caf50', '#2e9f33', '#bbd7ed', '#90c5ef', '#54abf0', '#2196f3', '#0382e8', '#d3b8d8', '#ba82c4', '#b452c4', '#9c27b0', '#85019b', '#ffd2da', '#ffb0be', '#ff9bad', '#ff7991', '#ff718a'];


for (var x = 0; x < colorGridChoices.length; x+=1) {
    colorGrid.push({color: colorGridChoices[x], id: x});
}

//Initialize Components

var ColorBox = function(props) {
    var divStyle = {backgroundColor: props.style};
    return <div className='outerBox' onClick={props.changeDrawColor}><div className='innerBox' style={divStyle}></div></div>;
}

var MobileContainer = function(props) {
       return (
        <div className='mobileContainer'>
                    <button type='button' className='mobile-button'><img src='img/mobColor.png' alt='Open Color Menu Button'/></button>
                </div>
    )
    
}

var TableRow = function(props) {
    return (<div className='table-row'>
                {props.cellData.map(function(item) {
                  
                  return <TableCell key={item.id} styles={{backgroundColor: item.color}} clickFunc={function() {props.trClickFunc(item)}}/>
                })}
            </div>
           );
}

var TableCell = function(props) {
    return <div className='box table-cell' style={props.styles} onClick={props.clickFunc}></div>;
}

var Modal = function(props) {
    return (
        <div className='modal-container' style={props.style}>
            <p>{props.modalMessage}</p>
            <button className='cancel-button' onClick={props.removeModal}>Cancel</button>
            <button className='confirm-button' onClick={props.confirmModal}>OK</button>
        </div>
    );
}

var ButtonContainer = React.createClass({
    getInitialState: function() {
        return {
            helperText: 'Helper Span'
        }
    },
    hoverFunc: function(el) {
        this.state.helperText = el;
        this.setState(this.state);
    },
    render: function(props) {
        return(
            <div className = 'buttonContainer'>
                    <button type='button' onClick={this.props.buttonFunc[0]} onMouseOver={function() {this.hoverFunc('Remove Column')}.bind(this)}><img src='img/remCol.png' alt='Remove Column Button'/></button> 
                    <button type='button' onClick={this.props.buttonFunc[1]} onMouseOver={function() {this.hoverFunc('Remove Row')}.bind(this)}><img src='img/remRow.png' alt='Remove Row Button'/></button>
                    <button type='button' onClick={this.props.buttonFunc[2]} onMouseOver={function() {this.hoverFunc('Add Column')}.bind(this)}><img src='img/addCol.png' alt='Add Column Button'/></button>
                    <button type='button' onClick={this.props.buttonFunc[3]} onMouseOver={function() {this.hoverFunc('Add Row')}.bind(this)}><img src='img/addRow.png' alt='Add Row Button'/></button>
                    <button type='button' onClick={this.props.buttonFunc[4]} onMouseOver={function() {this.hoverFunc('Start Over')}.bind(this)}><img src='img/clear.png' alt='Clear Button'/></button>
                    <button type='button' onClick={this.props.buttonFunc[5]} onMouseOver={function() {this.hoverFunc('Save')}.bind(this)}><img src='img/save.png' alt='Save Button'/></button>
                    <span className='helper-span'>{this.state.helperText}</span>
                </div>
        )
    }
});


var Application = React.createClass({
    getInitialState: function() {
        return {
            drawingTable: this.props.tableData,
            currentColor: 'black',
            modalMessage: 'Are you sure you want to erase EVERYTHING?',
            modalStyle: {display: 'none'}
        };
    },
    changeBoxColor: function(val) {
        val.color = this.state.currentColor;
        this.setState(this.state);
    },
    changeColorChoice: function(val) {
        this.state.currentColor = val;
        this.setState(this.state);
    },
    clear: function(val) {
        var table = this.state.drawingTable;
        for (var x = 0; x < table.length; x+=1) 
            {
                for (var y = 0; y < table[x].length; y+=1) {
                    table[x][y].color = 'white';
                }
            }
        this.setState(this.state);
    },
    addRow: function() {
        var table = this.state.drawingTable;
        rowQuant+=1;
        table.push([]);
        for (var x = 0; x < colQuant; x+=1) {
            table[table.length-1].push({color: 'white', id: cellCount});
            cellCount+=1;
        }
        this.setState(this.state);
    },
    removeRow: function() {
        this.state.drawingTable.pop();
        rowQuant-=1;
//        cellCount-=colQuant;
        this.setState(this.state);
    },
    addColumn: function() {
        for (var x = 0; x < rowQuant; x+=1) {
            this.state.drawingTable[x].push({color: 'white', id: cellCount});
            cellCount+=1;
        }
        colQuant+=1;
        this.setState(this.state);
    },
    removeColumn: function() {
        for (var x = 0; x < rowQuant; x+=1) {
            this.state.drawingTable[x].pop();
        }
        colQuant-=1;
//        cellCount-=rowQuant;
        this.setState(this.state);
    },
    saveImage: function() {
        html2canvas(document.getElementsByClassName('boxContainer'), {
            onrendered: function(canvas) {
                canvas.toBlob(function(blob) {
                saveAs(blob, "Pixel Drawing.png");
                }
            );
        }
    })},
    showModal: function() {
        this.state.modalStyle = {display: 'initial'};
        this.setState(this.state);
    },
    removeModal: function() {
        this.state.modalStyle = {display: 'none'};
        this.setState(this.state);
    },
    confirmModal: function() {
        this.clear();
        this.removeModal();
        this.setState(this.state);
    },
    render: function(props) {
        return(
            <div>
                <div className = 'colorContainer'>
                    {this.props.colorArray.map(function(item) {
                        return <ColorBox style={item.color} key={item.id} changeDrawColor={function() {this.changeColorChoice(item.color)}.bind(this)}/>
                }.bind(this))}
                </div> 
                <ButtonContainer buttonFunc = {[this.removeColumn, this.removeRow, this.addColumn, this.addRow, this.showModal, this.saveImage]}/>
                <div className = 'boxContainer'>
                    <div className='table-container'>
                        
                            {this.state.drawingTable.map(function(item, index) {
                                return (        
                                    <TableRow key={index} cellData={item} trClickFunc= {this.changeBoxColor}/>
                                    )}.bind(this))}
                                    
                        
                    </div>
                </div>
                <MobileContainer />
                <Modal modalMessage={this.state.modalMessage} style={this.state.modalStyle} removeModal={this.removeModal} confirmModal={this.confirmModal}/>
            </div>
        )
    }
})



ReactDOM.render(
  <Application tableData={tableData} colorArray={colorGrid}/>,
  document.getElementById('container')
);