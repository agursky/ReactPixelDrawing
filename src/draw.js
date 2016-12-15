//Determine number of rows and columns in box container based on width and height of browser


if (window.innerWidth < 768) {
    var colQuant = Math.floor(window.innerWidth/36) - 1;
    var rowQuant = Math.floor((window.innerHeight - 63)/36) - 1;
    var colorContainerInit = 'none';
} else {
    var colQuant = Math.floor((window.innerWidth - 395)/28) - 1;
    var rowQuant = Math.floor((window.innerHeight - 78)/28) - 1;
    if (colQuant > 20) {
        colQuant = 20;
    }
    if (rowQuant > 20) {
        rowQuant = 20;
    }
    var colorContainerInit = 'block';
} 


//Create Table

var tableData = [];
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
var colorGridChoices = ['white', '#b7b7b7', 'gray', '#545454','black', '#ffc3bf', '#ffa9a3', '#ff8b83', '#ff685c', '#ff3d00', '#ffebcc', '#ffd08f', '#ffba52', '#ffa114', '#d68100', '#fffce3', '#fff7b3', '#fff283', '#ffed53', '#ffe500', '#c6edc7', '#9ce09e', '#71c674', '#4caf50', '#2e9f33', '#bbd7ed', '#90c5ef', '#54abf0', '#2196f3', '#0382e8', '#d3b8d8', '#ba82c4', '#b452c4', '#9c27b0', '#85019b', '#ffd2da', '#ffb0be', '#ff9bad', '#ff7991', '#ff718a'];
var buttonInfo = [{imgSrc: 'img/addCol.png', alt: 'Add Column Button'}, {imgSrc: 'img/addRow.png', alt: 'Add Row Button'}, {imgSrc: 'img/remCol.png', alt: 'Remove Column Button'}, {imgSrc: 'img/remRow.png', alt: 'remove Row Button'}, {imgSrc: 'img/save.png', alt: 'Save Image Button'}];
            
            
            
            
            

for (var x = 0; x < colorGridChoices.length; x+=1) {
    colorGrid.push({color: colorGridChoices[x], id: x});
}

//Initialize Components

var ColorBox = function(props) {
    var divStyle = {backgroundColor: props.style};
    return <button type='button' className='outerBox' onClick={props.changeDrawColor}><div className='innerBox' style={divStyle}></div></button>;
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

var HelpWindow = function(props) {
    var itr = 0;
    return (
        <div className='help-window' style={props.style}>
        <button type = 'button' className = 'xOut' onClick = {props.xOut}>&#10006;&#xFE0E;</button>
        {props.helpButtons.map(function(item) {
        itr+=1;
            return <div className='help-icon-container' key={itr}>
                    <img src={item.imgSrc} alt={item.alt} />
                    <span>{item.alt}</span>
                    </div>
        })}
        </div>
    )
    
}

var FAQContainer = function(props) {
    return (
        <div id="faq-container" style={props.style}>
            <button type = 'button' className = 'xOut' onClick = {props.clickFunc}>&#10006;&#xFE0E;</button>
            <div id='faq-sub-container'>
                <h1>FAQ</h1>
                <h2>How to Save your Work</h2>
                <h3>In Firefox and Chrome</h3>
                <p>In these browswers, when you press the save button (<img className='button-img' src='img/save.png' alt='Save button image'/>) the image file will automatically download into whatever folder you have set as your downloads folder. The file will be named 'Pixel Drawing.png'. For multiple files, a number will be added to the end of the file name to differentiate between drawings.</p>
                <h3>In Safari, Mobile Safari, and Mobile Chrome</h3>
                <p>In these browsers, when you press the save button, it will open the image in a new browswer window. From there you can save the image by touching the image (on mobile) or right clicking (on Desktop).</p>
                <h3>In Mobile Firefox</h3>
                <p>Saving is not supported on Mobile Firefox. Sorry:(</p>
                <h3>If you have any further questions or feedback, I'd love to hear from you. I can be reached at <a href='mailto:agursky.js@gmail.com'>agursky.js@gmail.com</a></h3>
            </div>
        </div>
    )
}

var AddRemoveWindow = function(props) {
    return (
        <div className='add-remove center' style={props.style}>
        <div className='add-remove-row'>
            <div className='add-remove-container'><button type='button' onClick={props.addRemFunc[0]}><img src='img/addRow.png' alt='Add Row'/></button><span>Add<br/> Row</span></div>
            <div className='add-remove-container'><button type='button' onClick={props.addRemFunc[1]}><img src='img/addCol.png' alt='Add Column'/></button><span>Add<br/>  Column</span></div>
        </div>
        <div className='add-remove-row'>
            <div className='add-remove-container'><button type='button' onClick={props.addRemFunc[2]}><img src='img/remRow.png' alt='Remove Row'/></button><span>Remove<br/>  Row</span></div>
            <div className='add-remove-container'><button type='button' onClick={props.addRemFunc[3]}><img src='img/remCol.png' alt='Remove Column'/></button><span>Remove<br/>  Column</span></div>
        </div>
        <button type='button' className='confirm-button' onClick={props.addRemFunc[4]}>Done</button>
        </div>
    )
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
                    <button type='button' onClick={this.props.buttonFunc[0]} onMouseOver={function() {this.hoverFunc('Help')}.bind(this)}><img src='img/help.svg' alt='Help Button'/></button> 
                    <button type='button' className='mobile-button' onClick={this.props.buttonFunc[1]} onMouseOver={function() {this.hoverFunc('Resize Grid')}.bind(this)}><img src='img/addRemove.svg' alt='Resize Grid Button'/></button>
                    <button type='button' className='desktop-button' onClick={this.props.buttonFunc[2]} onMouseOver={function() {this.hoverFunc('Remove Column')}.bind(this)}><img src='img/remCol.png' alt='Remove Column Button'/></button> 
                    <button type='button' className='desktop-button' onClick={this.props.buttonFunc[3]} onMouseOver={function() {this.hoverFunc('Remove Row')}.bind(this)}><img src='img/remRow.png' alt='Remove Row Button'/></button>
                    <button type='button' className='desktop-button' onClick={this.props.buttonFunc[4]} onMouseOver={function() {this.hoverFunc('Add Column')}.bind(this)}><img src='img/addCol.png' alt='Add Column Button'/></button>
                    <button type='button' className='desktop-button' onClick={this.props.buttonFunc[5]} onMouseOver={function() {this.hoverFunc('Add Row')}.bind(this)}><img src='img/addRow.png' alt='Add Row Button'/></button>
                    <button type='button' onClick={this.props.buttonFunc[6]} onMouseOver={function() {this.hoverFunc('Start Over')}.bind(this)}><img src='img/clear.png' alt='Clear Button'/></button>
                    <button type='button' onClick={this.props.buttonFunc[7]} onMouseOver={function() {this.hoverFunc('Save')}.bind(this)}><img src='img/save.png' alt='Save Button'/></button>
                    <button type='button' className='mobile-button' onClick={this.props.buttonFunc[8]} onMouseOver={function() {this.hoverFunc('Choose a Color')}.bind(this)}><img src='img/mobColor.png' alt='Open Color Menu Button'/></button>
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
            modalStyle: {display: 'none'}, 
            colorContainerStyle: {},
            helpStyle: {}, 
            addRemoveStyle: {}, 
            faqStyle: {}
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
//        this.showCheckBox();
    },
    removeRow: function() {
        if (rowQuant > 1) {
            this.state.drawingTable.pop();
            rowQuant-=1;
            this.setState(this.state);
//            this.showCheckBox();   
        }
        
    },
    addColumn: function() {
        for (var x = 0; x < rowQuant; x+=1) {
            this.state.drawingTable[x].push({color: 'white', id: cellCount});
            cellCount+=1;
        }
        colQuant+=1;
//        $('#container').width($('#container').width() + 36);
//        console.log($('#container').width());
        this.setState(this.state);
//        this.showCheckBox();
    },
    removeColumn: function() {
        if (colQuant > 1) {
            for (var x = 0; x < rowQuant; x+=1) {
                this.state.drawingTable[x].pop();
            }
            colQuant-=1;
            this.setState(this.state);
//            this.showCheckBox();   
        }
        
    },
    saveImage: function() {
        console.log('test casem2');
//        html2canvas(document.getElementById('boxContainer'), {
//            onrendered: function(canvas) {
//                canvas.toBlob(function(blob) {
//                saveAs(blob, "Pixel Drawing.png");
//                }
//            );
//            }
//        })
        $('#boxContainer').css({
            position: 'absolute',
            top: 0,
            left: 0
        });
        html2canvas(document.getElementById('boxContainer'), {
            onrendered: (function(canvas) {
                canvas.toBlob(function(blob) {
                saveAs(blob, "Pixel Drawing.png");
                });
                {
                    $('#boxContainer').css({
                        position: 'static',
                        top: 'initial',
                        left: 'initial'
                    });
                };
                
            })
        });
        
    
    },
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
    toggler: function(el) {
        var togPal = 'block';
        if (this.state[el].display === 'block') {
            togPal = 'none';
            console.log(true);
        }
        this.state[el] = {display: togPal};
        console.log(this.state[el]);
        this.setState(this.state);
    },
    componentDidMount: function() {
        if (window.innerWidth < 768) {
            var windowWidth = $(window).width();
            var boxContainerWidth = $('.boxContainer').outerWidth();
            $('.boxContainer').css('margin-left', (windowWidth - boxContainerWidth)/2 + 'px');
        }        
    },
    showCheckBox: function() {
        $('.resize-icon-container').remove();
        $('#container').append("<div class='resize-icon-container'><div class='resize-icon'><img src='img/check.svg'/></div><span>+1 Row Added</span></div>");
        
        
    },
    render: function(props) {
        return(
            <div>
                <div className = 'colorContainer' style={this.state.colorContainerStyle}>
                    <button type = 'button' className = 'xOut' onClick = {function() {this.toggler('colorContainerStyle');}.bind(this)}>&#10006;&#xFE0E;</button>
                    <div className = 'sub-color-container'>
                        {this.props.colorArray.map(function(item) {
                            return <ColorBox style={item.color} key={item.id} changeDrawColor={function() {
                                this.changeColorChoice(item.color); 
                                if (window.innerWidth < 768) {
                                    this.toggler('colorContainerStyle');
                                }
                            }.bind(this)}/>
                        }.bind(this))}
                    </div>
                </div> 
                <ButtonContainer buttonFunc = {[function() {this.toggler('faqStyle')}.bind(this), function() {this.toggler('addRemoveStyle')}.bind(this), this.removeColumn, this.removeRow, this.addColumn, this.addRow, this.showModal, this.saveImage, function() {this.toggler('colorContainerStyle')}.bind(this)]}/>
                <div id = 'boxContainer'>
                    <div className='table-container'>
                            {this.state.drawingTable.map(function(item, index) {
                                return (        
                                    <TableRow key={index} cellData={item} trClickFunc= {this.changeBoxColor}/>
                                    )}.bind(this))}
                    </div>
                </div>
                <Modal modalMessage={this.state.modalMessage} style={this.state.modalStyle} removeModal={this.removeModal} confirmModal={this.confirmModal}/>
                <AddRemoveWindow style={this.state.addRemoveStyle} addRemFunc={[this.addRow, this.addColumn, this.removeRow, this.removeColumn, function() {this.toggler('addRemoveStyle');}.bind(this)]}/>
                <FAQContainer style={this.state.faqStyle} clickFunc = {function() {this.toggler('faqStyle');}.bind(this)}/>

            </div>
        )
    }
})


ReactDOM.render(
  <Application tableData={tableData} colorArray={colorGrid}/>,
  document.getElementById('container')
);