import React from "react"
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';
import CopyToClipboard from 'react-copy-to-clipboard';
import Snackbar from 'material-ui/Snackbar';
import {connect} from "react-redux";
import {getLinks} from "../actions/links";

let style={
  margin : '12px 30px 12px 0',
}
let circularStyle = {
  textAlign : 'center',
}

class DetailView extends React.Component {
  constructor(){
    super();
    this.state = {
      open : false,
    }
    this.handleCopy = this.handleCopy.bind(this)
    this.handleRequestClose = this.handleRequestClose.bind(this)
  }
  closeView(){
    this.props.closeDialog()
  }
  showWebsites(props){
    let {dispatch, query} = props;
    dispatch(getLinks(query.id,1000,0));
  }
  componentWillUpdate(nextProps, nextState){
    if (this.props.query.id !== nextProps.query.id)
      this.showWebsites(nextProps)
  }
  componentDidMount(){
    this.showWebsites(this.props)
  }
  handleRequestClose(){
    this.setState({
      open: false,
    });
  };
  handleCopy (e) {
    this.setState({
      open: true,
    });
  }
  render () {
    let allUrls = "";
    let {websites} = this.props;
    return (
        <Card>
          <CardTitle>
            {this.props.query.text}
          </CardTitle>
          <CardText>
            <RaisedButton label="Go back" backgroundColor="#C62828" labelColor="#FFFFFF" style={style} onClick={this.closeView.bind(this)}/>
            <h2>{this.props.query.websites.length} results</h2>
              {websites != undefined ?
                <div>
                <CopyToClipboard text={allUrls} onCopy={this.handleCopy}>
                  <RaisedButton label="Copy to clipboard" primary={true} style={style}/>
                </CopyToClipboard>
                <ul>
                {
                  websites.map((item,index) => {
                    allUrls += item.url + '\n'
                    return <li key={index}><a target="_blank" href={item.url}>{item.url}</a></li>
                  })
                }
                </ul>
                <RaisedButton label="Go back" backgroundColor="#C62828" labelColor="#FFFFFF" style={style} onClick={this.closeView.bind(this)}/>
                <CopyToClipboard text={allUrls} onCopy={this.handleCopy}>
                  <RaisedButton label="Copy to clipboard" primary={true} style={style}/>
                </CopyToClipboard>
                <Snackbar
                  open={this.state.open}
                  message="URLs were copied to clipboard"
                  autoHideDuration={3000}
                  onRequestClose={this.handleRequestClose}
                />
                </div>
                : 
                <div style={circularStyle}>
                    <CircularProgress size={2} />
                </div>
              }
          </CardText>
        </Card>
    );
  }
}


const mapStateToProps = (state, ownProps) => ({
    websites: state.links.items
});

export default connect(mapStateToProps)(DetailView)
