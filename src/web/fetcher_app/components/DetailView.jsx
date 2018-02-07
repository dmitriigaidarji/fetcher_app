import React from "react"
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';
import SeoApi from '../SeoApi'
import CopyToClipboard from 'react-copy-to-clipboard';
import Snackbar from 'material-ui/Snackbar';
import DialogBody from "./DialogBody";

let style={
  margin : '12px 30px 12px 0',
}
let circularStyle = {
  textAlign : 'center',
}

export default class DetailView extends React.Component {
  constructor(){
    super()
    this.state = {
      websites: undefined,
      open : false,
    }
    this.handleCopy = this.handleCopy.bind(this)
    this.handleRequestClose = this.handleRequestClose.bind(this)
  }
  closeView(){
    this.props.closeDialog()
  }
  showWebsites(props){
    let self = this
    SeoApi.getMoreWebsites(props.query.id,1000,0,(response) => {
      self.setState({websites : response})
    });
  }
  componentWillUpdate(nextProps, nextState){
    if (this.props.query.id != nextProps.query.id)
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
    return (
        <Card>
          <CardTitle>
            {this.props.query.text}
          </CardTitle>
          <CardText>
            <RaisedButton label="Go back" backgroundColor="#C62828" labelColor="#FFFFFF" style={style} onClick={this.closeView.bind(this)}/>
            <h2>{this.props.query.websites.length} results</h2>
              {this.state.websites != undefined ?
                <div>
                <CopyToClipboard text={allUrls} onCopy={this.handleCopy}>
                  <RaisedButton label="Copy to clipboard" primary={true} style={style}/>
                </CopyToClipboard>
                <ul>
                {
                  this.state.websites.map((item,index) => {
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

// <RaisedButton label="Copy to clipboard" primary={true} style={style} onClick={this.copyData.bind(this)}/>
