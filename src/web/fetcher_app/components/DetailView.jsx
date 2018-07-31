import React from "react"
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';
import CopyToClipboard from 'react-copy-to-clipboard';
import Snackbar from 'material-ui/Snackbar';
import {connect} from "react-redux";
import {getQueryDetails} from "../actions/queries";

let styles = {
    btnStyle: {
        margin: '12px 30px 12px 0'
    }
}

class DetailView extends React.Component {
    constructor() {
        super();
        this.state = {
            open: false,
        };
        this.handleCopy = this.handleCopy.bind(this)
        this.handleRequestClose = this.handleRequestClose.bind(this)
    }

    closeView() {
        this.props.closeDialog()
    }

    showWebsites(props) {
        let {dispatch, query} = props;
        dispatch(getQueryDetails(query.id));
    }

    componentWillUpdate(nextProps, nextState) {
        if (this.props.query.id !== nextProps.query.id)
            this.showWebsites(nextProps)
    }

    componentDidMount() {
        this.showWebsites(this.props)
    }

    handleRequestClose() {
        this.setState({
            open: false,
        });
    };

    handleCopy(e) {
        this.setState({
            open: true,
        });
    }

    render() {
        let allUrls = "";
        let {data} = this.props;
        return (
            <Card>
                <CardTitle style={{borderBottom: '1px solid #dadada'}}>
                    <div style={{fontSize: '150%', fontWeight: '500'}}>{this.props.query.text}</div>
                </CardTitle>
                <CardText>
                    {data != undefined ?
                        <div>
                            {data.related.length > 0 &&
                            <div>
                                <h2>{data.related.length} related keywords:</h2>
                                {
                                    data.related.map((item, index) => <div key={index} style={
                                        {
                                            backgroundColor: '#463939',
                                            borderRadius: '3px',
                                            padding: '5px 10px',
                                            color: 'white',
                                            fontWeight: 400,
                                            margin: '5px 10px 5px 0',
                                            display: 'inline-block'
                                        }
                                    }>
                                        {item.text}
                                    </div>)
                                }
                            </div>
                            }
                            <h2>{data.websites.length} links gathered:</h2>
                            <ul>
                                {
                                    data.websites.map((item, index) => {
                                        allUrls += item.url + '\n'
                                        return <li key={index}><a target="_blank" href={item.url}>{item.url}</a></li>
                                    })
                                }
                            </ul>
                            <RaisedButton label="Go back" backgroundColor="#C62828" labelColor="#FFFFFF"
                                          style={styles.btnStyle}
                                          onClick={this.closeView.bind(this)}/>
                            <CopyToClipboard text={allUrls} onCopy={this.handleCopy}>
                                <RaisedButton label="Copy links clipboard" primary={true} style={styles.btnStyle}/>
                            </CopyToClipboard>
                            <Snackbar
                                open={this.state.open}
                                message="URLs were copied to clipboard"
                                autoHideDuration={3000}
                                onRequestClose={this.handleRequestClose}
                            />
                        </div>
                        :
                        <div style={{textAlign: 'center'}}>
                            <CircularProgress/>
                        </div>
                    }
                </CardText>
            </Card>
        );
    }
}


const mapStateToProps = (state, ownProps) => ({
    data: state.queries.detailed[ownProps.query.id]
});

export default connect(mapStateToProps)(DetailView)
