var boxGrid = [];
var gridNumber = 20;
var boxRow = []
var colorGrid = [];
var colorGridChoices = ['red', 'green', 'blue', 'yellow', 'pink', 'purple', 'orange', 'brown', 'gray', 'white', 'black'];
var cellCount = 0;

for (var x = 0; x < colorGridChoices.length; x+=1) {
    colorGrid.push({color: colorGridChoices[x], id: x});
}

for (var x = 0; x < gridNumber; x+=1) {
    boxGrid.push(x);
}

for (var x = 0; x < gridNumber; x+=1) {
    boxRow.push({id: x});
}

var ColorBox = function(props) {
    var divStyle = {backgroundColor: props.style};
    return <div className='outerBox' onClick={props.changeDrawColor}><div className='innerBox' style={divStyle}></div></div>;
}

//var DrawingCell = function(props) {
//    var divStyle = {backgroundColor: props.style};
//    return <td className='box' style={divStyle} onClick={props.changeColor}></td>;
//}

var DrawingCell = function(props) {
    return <td className='box'></td>;
}

var DrawingRow = function(props) {
    return (
        <tr>
            {props.cells.map(function() {
                cellCount+=1;
                return (<DrawingCell key={cellCount} />);
            })}
        </tr>
    )
}

var Application = React.createClass({
    getInitialState: function() {
        return {
            boxArray: this.props.boxes,
            currentColor: 'blue'
        };
    },
    changeBoxColor: function(val) {
        console.log(val);
        this.state.boxArray[val].color = this.state.currentColor;
        this.setState(this.state);
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
                            {this.props.rows.map(function(item) {
                                return <DrawingRow key={item.id} cells={this.props.boxes}/>
                            }.bind(this))}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
})

ReactDOM.render(
  <Application boxes={boxGrid} rows={boxRow} colorArray={colorGrid}/>,
  document.getElementById('example')
);