import React from "react"
import {Card, CardText} from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import {List, ListItem} from 'material-ui/List';
import {red500, green500} from 'material-ui/styles/colors';


import ActionDone from 'material-ui/svg-icons/action/done';
import DeviceTime from 'material-ui/svg-icons/device/access-time';

const style = {
  marginLeft: 20,
};

export default class QueryComponent extends React.Component {
    render(){
        let { query } = this.props
        let relatedNode;
        if (query.relatedProcessed){
            relatedNode = <ActionDone color={green500} />
        }else{
            relatedNode = <DeviceTime color={red500} />
        }
        return(
              <TableRow onClick={this.props.clicked.bind(null,query)}>
                <TableRowColumn>{ query.text }</TableRowColumn>
                <TableRowColumn>
                    { query.websites.length }
                </TableRowColumn>
              </TableRow>
        )
    }
}



//<ListItem key={index} primaryText={item.text} />