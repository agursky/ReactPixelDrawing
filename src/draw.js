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
var colorGridChoices = ['white', '#b7b7b7', 'gray', '#545454','black', '#ffc3bf', '#ffa9a3', '#ff8b83', '#ff675b', '#f44336', '#ff9800', '#ffeb3b', '#4caf50', '#2196f3', '#9c27b0', '#ffb0be'];


for (var x = 0; x < colorGridChoices.length; x+=1) {
    colorGrid.push({color: colorGridChoices[x], id: x});
}

//Initialize Components

var ColorBox = function(props) {
    var divStyle = {backgroundColor: props.style};
    return <div className='outerBox' onClick={props.changeDrawColor}><div className='innerBox' style={divStyle}></div></div>;
}

var TableRow = function(props) {
    return (<tr>
                {props.cellData.map(function(item) {
                  
                  return <TableCell key={item.id} styles={{backgroundColor: item.color}} clickFunc={function() {props.trClickFunc(item)}}/>
                })}
            </tr>
           );
}

var TableCell = function(props) {
    return <td className='box' style={props.styles} onClick={props.clickFunc}></td>;
}

var Application = React.createClass({
    getInitialState: function() {
        return {
            drawingTable: this.props.tableData,
            currentColor: 'black'
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
        console.log('add row');
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
        console.log('remove row');
        this.state.drawingTable.pop();
        rowQuant-=1;
//        cellCount-=colQuant;
        this.setState(this.state);
    },
    addColumn: function() {
        console.log('add Column');
        for (var x = 0; x < rowQuant; x+=1) {
            this.state.drawingTable[x].push({color: 'white', id: cellCount});
            cellCount+=1;
        }
        colQuant+=1;
        this.setState(this.state);
    },
    removeColumn: function() {
        console.log('remove Column');
        for (var x = 0; x < rowQuant; x+=1) {
            this.state.drawingTable[x].pop();
        }
        colQuant-=1;
//        cellCount-=rowQuant;
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
                <div className = 'buttonContainer'>
                    <button type='button' onClick={this.removeColumn}><img src='img/remCol.png' alt='Remove Column Button'/></button> 
                    <button type='button' onClick={this.removeRow}><img src='img/remRow.png' alt='Remove Row Button'/></button>
                    <button type='button' onClick={this.addColumn}><img src='img/addCol.png' alt='Add Column Button'/></button>
                    <button type='button' onClick={this.addRow}><img src='img/addRow.png' alt='Add Row Button'/></button>
                    <button type='button' onClick={this.clear}><img src='img/clear.png' alt='Clear Button'/></button>
                </div>
                <div className = 'boxContainer'>
                    <table>
                        <tbody>
                            {this.state.drawingTable.map(function(item, index) {
                                return (        
                                    <TableRow key={index} cellData={item} trClickFunc= {this.changeBoxColor}/>
                                    )}.bind(this))}
                                    
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
})

ReactDOM.render(
  <Application tableData={tableData} colorArray={colorGrid}/>,
  document.getElementById('example')
);