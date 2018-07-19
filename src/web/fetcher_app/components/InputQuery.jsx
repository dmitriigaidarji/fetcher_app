import React from "react"
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {connect} from "react-redux";
import {postQuery} from '../actions/queries'

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
            queryValue: ''
        }
    }

    _handleTextFieldChange(e) {
        this.setState({
            queryValue: e.target.value
        });
    }

    callQuery = (type) => {
        let {dispatch} = this.props;
        dispatch(postQuery(this.state.queryValue, type));
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
                        <RaisedButton label="Crawl YouTube" style={style.btn} backgroundColor="#C62828"
                                      labelColor="#FFFFFF"
                                      onClick={() => this.callQuery('y')}/>
                        <RaisedButton label="Crawl Google" primary={true}
                                      onClick={() => this.callQuery('g')}/>
                    </CardText>
                </Card>
            </div>
        );
    }
}

export default connect()(InputQuery)
