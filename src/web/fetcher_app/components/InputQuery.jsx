import React from "react"
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {connect} from "react-redux";
import {postQuery} from '../actions/queries'
import Snackbar from 'material-ui/Snackbar';

let style = {
    card: {
        margin: '12px 0',
    },
    btn: {
        margin: '12px 50px 12px 0',
        backroundColor: 'red'
    }
}

class InputQuery extends React.Component {
    constructor() {
        super()
        this.state = {
            queryValue: '',
            snackbarValue: '',
            open: false
        }
    }

    handleRequestClose = () => {
        this.setState({
            open: false,
        });
    };

    _handleTextFieldChange(e) {
        this.setState({
            queryValue: e.target.value
        });
    }

    callQuery = (type) => {
        let {dispatch} = this.props;
        let val = this.state.queryValue;
        if (val.length > 0) {
            dispatch(postQuery(val, type));
            this.setState({queryValue: "", snackbarValue: val, open: true})
        }
        else alert('Don\'t leave the query body empty!')
    };

    render() {
        return (
            <div>
                <Card style={style.card}>
                    <CardTitle>
                        Process query
                    </CardTitle>
                    <CardText>
                        <TextField
                            hintText="Your phrase"
                            floatingLabelText="Type your search query here"
                            fullWidth={true}
                            value={this.state.queryValue}
                            onChange={this._handleTextFieldChange.bind(this)}
                        />
                        <RaisedButton label="Crawl Google" primary={true} style={style.btn}
                                      onClick={() => this.callQuery('g')}/>
                        <RaisedButton label="Crawl YouTube" backgroundColor="#C62828"
                                      labelColor="#FFFFFF"
                                      onClick={() => this.callQuery('y')}/>
                    </CardText>
                </Card>
                <Snackbar
                    open={this.state.open}
                    message={"Query '" + this.state.snackbarValue + "' added to queue"}
                    autoHideDuration={4000}
                    onRequestClose={this.handleRequestClose}
                />
            </div>
        );
    }
}

export default connect()(InputQuery)
