var boxGrid = [];
var boxGridNumber = 20;
var boxRowNumber = 2;
var boxRow = []
var colorGrid = [];
var colorGridChoices = ['red', 'green', 'blue', 'yellow', 'pink', 'purple', 'orange', 'brown', 'gray', 'white', 'black'];
var cellCount = 0;

for (var x = 0; x < colorGridChoices.length; x+=1) {
    colorGrid.push({color: colorGridChoices[x], id: x});
}

for (var x = 0; x < boxGridNumber; x+=1) {
    boxGrid.push({color: 'white', id: cellCount});
}

for (var x = 0; x < boxRowNumber; x+=1) {
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
    return <td>Hello</td>;
}

var DrawingRow = function(props) {
    return (
        <tr>
            <DrawingCell />
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
//                        <tr>
//                    {this.state.boxArray.map(function(item) {
//                        return <DrawingCell key={item.id} style={item.color} changeColor={function() {this.changeBoxColor(item.id)}.bind(this)}/>
//        }.bind(this))}
//                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
})

ReactDOM.render(
  <Application boxes={boxGrid} colorArray={colorGrid}/>,
  document.getElementById('example')
);