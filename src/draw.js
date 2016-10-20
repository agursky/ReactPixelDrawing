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
var colorGridChoices = ['red', 'green', 'blue', 'yellow', 'pink', 'purple', 'orange', 'brown', 'gray', 'white', 'black'];


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

//var DrawingCell = function(props) {
//    var divStyle = {backgroundColor: props.style};
//    return <td className='box' style={divStyle} onClick={props.changeColor}></td>;
//}

var Application = React.createClass({
    getInitialState: function() {
        return {
            drawingTable: this.props.tableData,
            currentColor: 'blue'
        };
    },
    changeBoxColor: function(val) {
        val.color = this.state.currentColor;
        this.setState(this.state);
        console.log(val);
    },
    changeColorChoice: function(val) {
        console.log(val);
        this.state.currentColor = val;
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