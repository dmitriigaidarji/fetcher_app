import React from "react"
import {Card, CardText} from 'material-ui/Card';
import DetailView from '../components/DetailView'
import DialogBody from '../components/DialogBody'
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import SeoApi from '../SeoApi'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import QueryComponent from '../components/QueryComponent'

import ClearIcon from 'material-ui/svg-icons/content/clear';
import {red500} from 'material-ui/styles/colors';
import CopyToClipboard from 'react-copy-to-clipboard';
import {connect} from "react-redux";
import {deleteQuery} from '../actions/queries'

let styles = {
    midCol: {
        width: '20%'
    },
    colWidth: {
        width: '40%',
        padding: 0,
        textAlign: 'center'
    },
    detailsSpan: {
        color: 'black',
        cursor: 'pointer',
        margin: '0 20px 0 0',
        fontWeight: 'bold',
    },
    copySpan: {
        color: 'red',
        cursor: 'pointer',
        margin: '0 20px 0 0',
        fontWeight: 'bold',
    }
};

class ResultsContainer extends React.Component {
    constructor() {
        super()
        this.state = {
            query: undefined,
            dialogOpen: false,
        }
        this.openDialog = this.openDialog.bind(this)
        this.closeDialog = this.closeDialog.bind(this)
    }

    openDialog(query) {
        this.setState({dialogOpen: true, query: query})
    }

    closeDialog() {
        this.setState({dialogOpen: false, query: undefined})
    }

    deleteQuery = (query) => {
        let {dispatch} = this.props;
        console.log('delete', query)
        dispatch(deleteQuery(query.id));
    };

    detailsClick(query) {
        this.openDialog(query)
    }

    copyClick(query) {
        console.log('copy')
    }

    renderLoading() {
        return (
            <div>
                <Card>
                    <CardText>
                        Loading...
                    </CardText>
                </Card>
            </div>
        )
    }

    render() {
        if (this.props.queries == undefined) {
            return this.renderLoading()
        }
        let nodes = [];
        this.props.queries.forEach((query, index) => {
            if (query.type == this.props.type) {
                let allUrls = ''
                query.websites.map((item, index) => {
                    allUrls += item.url + '\n'
                })
                let node = (
                    <TableRow key={index} onClick={this.check}>
                        <TableRowColumn>{query.text}</TableRowColumn>
                        <TableRowColumn style={styles.midCol}>
                            {query.websites.length}
                        </TableRowColumn>
                        <TableRowColumn style={styles.colWidth}>
                            <span style={styles.detailsSpan}
                                  onClick={this.detailsClick.bind(this, query)}>DETAILS</span>
                            <CopyToClipboard text={allUrls}>
                                <span style={styles.copySpan}>COPY URLS</span>
                            </CopyToClipboard>
                        </TableRowColumn>
                    </TableRow>
                )
                nodes.push(node)
            }
        });
        return (
            <div>
                {this.state.query ?
                    <DetailView
                        query={this.state.query}
                        dialogOpen={this.state.dialogOpen}
                        closeDialog={this.closeDialog}
                    /> :
                    <Paper zDepth={2}>
                        <Table
                            selectable={false}
                            multiSelectable={false}
                        >
                            <TableHeader
                                displaySelectAll={false}
                                adjustForCheckbox={false}
                                enableSelectAll={false}
                            >
                                <TableRow>
                                    <TableHeaderColumn>Query</TableHeaderColumn>
                                    <TableHeaderColumn style={styles.midCol}>URLs</TableHeaderColumn>
                                    <TableHeaderColumn style={styles.colWidth}/>
                                </TableRow>
                            </TableHeader>
                            <TableBody
                                displayRowCheckbox={false}
                                deselectOnClickaway={false}
                                showRowHover={true}
                            >
                                {nodes}
                            </TableBody>
                        </Table>
                    </Paper>}
            </div>
        )
    }
}

export default connect()(ResultsContainer)
