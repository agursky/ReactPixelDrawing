import React from 'react';
import TableCell from './TableCell';

export default function TableRow(props) {
    return (<div className='table-row'>
                {props.cellData.map(function(item) {
                  
                  return <TableCell key={item.id} styles={{backgroundColor: item.color}} clickFunc={function() {props.trClickFunc(item)}}/>
                })}
            </div>
           );
}