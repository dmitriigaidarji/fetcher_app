import React from "react"
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {List, ListItem} from 'material-ui/List'
import RaisedButton from 'material-ui/RaisedButton';
import SeoApi from '../SeoApi'
import {Tabs, Tab} from 'material-ui/Tabs'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import TextField from 'material-ui/TextField';
// import { TagCloud } from "react-tagcloud";
import WebsiteTagsDialog from './WebsiteTagsDialog'


const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
  urltd : {
  	width : '90%',
  },
  container : {
  	minHeight : 600,
  }
};


export default class DialogBody extends React.Component {
	constructor(){
		super()
		this.state = {
			data : false,
			websites : false,
			tags : false,
			tagsToDisplay : false,
			numberOfTags : 20,
			websiteDialogOpen : false,
			website : undefined,
		}
		this.handleShowMore = this.handleShowMore.bind(this)
		this.validateAmountOfTags = this.validateAmountOfTags.bind(this)
		this.validateAmountOfWebsites = this.validateAmountOfWebsites.bind(this)
		this.openDialog = this.openDialog.bind(this)
        this.closeDialog = this.closeDialog.bind(this)
    }
    openDialog(website){
        this.setState({websiteDialogOpen: true, website:website})
    }
    closeDialog(){
        this.setState({websiteDialogOpen: false, website:undefined})
    }
	componentWillMount(){
		this.numberOfTagsSources = 10
		this.maxNumberOfTags = 0
	}
	handleShowMore(){
		let self = this
		SeoApi.getMoreWebsites(this.props.query.id,40,this.state.websites.length,(response) => {
			self.setState({websites : self.state.websites.concat(response)})
		});
	}
	validateAmountOfWebsites(event){
		let self = this
		let input = event.target
		let newval = input.value
		if (newval <= this.state.data.totalwebsites && newval >= 0){
			this.numberOfTagsSources = newval
		}else{
			input.value = this.state.data.totalwebsites
			this.numberOfTagsSources = this.state.data.totalwebsites
		}
		if (newval > 0)
		SeoApi.getTags(this.props.query.id,this.numberOfTagsSources,(response) => {
				if (response.length > 1)
				for (let i = 0; i < response.length; i++)
					for (let j = i+1; j < response.length - 1; j ++)
						if (response[i].count < response[j].count){
							let swap = response[i]
							response[i] = response[j]
							response[j] = swap
						}
				self.maxNumberOfTags = response.length
				self.setState({tags : response, tagsToDisplay: response.slice(0,self.state.numberOfTags)})
			})
	}
	validateAmountOfTags(event){
		let self = this
		let input = event.target
		let newval = input.value

		if (newval <= this.maxNumberOfTags && newval >= 0){
			this.setState({
				numberOfTags : newval,
				tagsToDisplay : this.state.tags.slice(0,newval)
			})
		}else{
			input.value = this.maxNumberOfTags
			this.setState({
				numberOfTags : this.maxNumberOfTags,
				tagsToDisplay : this.state.tags.slice(0,this.maxNumberOfTags)
			})
		}
	}
	render(){
		let self = this
		let { query } = this.props

		if (this.state.data == false){
			SeoApi.getQuery(query.id, (response) => {
				self.setState({data : response, websites : response.websites})
			})
			SeoApi.getTags(query.id,this.numberOfTagsSources,(response) => {
				if (response.length > 1)
				for (let i = 0; i < response.length; i++)
					for (let j = i+1; j < response.length - 1; j ++)
						if (response[i].count < response[j].count){
							let swap = response[i]
							response[i] = response[j]
							response[j] = swap
						}
				self.maxNumberOfTags = response.length
				self.setState({tags : response, tagsToDisplay: response.slice(0,self.state.numberOfTags)})
			})
		}
		

		let relatedNodes = [];
		let websiteNodes = [];
		let showMoreButton;
		if (this.state.data != false){
			this.state.data.related.forEach((item,index) => {
	            let node = (
	                    <ListItem key={index} primaryText={item.text} />
                )
            	relatedNodes.push(node)
          	})
          	if (this.state.data.totalwebsites > this.state.websites.length){
          		showMoreButton =  <RaisedButton label="Show More" primary={true} fullWidth={true} onTouchTap={this.handleShowMore} />
          	}
		}
		if (this.state.websites != false){
			this.state.websites.forEach((item,index) => {
          		let count = item.tags.length
          		let node = (
					<TableRow key={index} onTouchTap={this.openDialog.bind(this,item)}>
						<TableRowColumn style={styles.urltd}><a href={item.url} target="_blank">{item.url}</a></TableRowColumn>
						<TableRowColumn>{count}</TableRowColumn>
					</TableRow>
          			)
          		websiteNodes.push(node)
          	})
		}
    	
		const dialogActions = [
          <FlatButton
            label="Ok"
            primary={true}
            keyboardFocused={true}
            onTouchTap={this.props.closeDialog}
          />,
        ];

		return(
			<Dialog
                  actions={dialogActions}
                  modal={false}
                  open={this.props.dialogOpen}
                  onRequestClose={this.props.closeDialog}
                  autoScrollBodyContent={true}
                >
                {this.state.website ? 
                    <WebsiteTagsDialog 
                        website={this.state.website} 
                        dialogOpen={this.state.websiteDialogOpen} 
                        closeDialog={this.closeDialog}
                        /> : null}
				<h4>{query.text}</h4>
				<Tabs>
				    <Tab label="Related" >
				      <div>
				        <h2 style={styles.headline}>Related tags</h2>
				        <List>
				          {relatedNodes}
				        </List>
				      </div>
				    </Tab>
				    <Tab label="Websites" >
				      <div>
				        <h2 style={styles.headline}>Websites with number of tags</h2>
				        <Table>
						    <TableHeader
						    	displaySelectAll={false}
	                            adjustForCheckbox={false}
	                            enableSelectAll={false}
						    >
						      <TableRow>
						        <TableHeaderColumn style={styles.urltd}>Url</TableHeaderColumn>
						        <TableHeaderColumn>Tags</TableHeaderColumn>
						      </TableRow>
						    </TableHeader>
						    <TableBody
						    	displayRowCheckbox={false}
						    >
						    	{websiteNodes}
						    </TableBody>
						</Table>
						{showMoreButton}
				      </div>
				    </Tab>
				    <Tab
				      label="WordCloud"
				    >
				      <div>
				        <TextField
				          floatingLabelText="Number of websites"
					      hintText={"Max amount: " + this.state.data.totalwebsites} 
					      onChange={this.validateAmountOfWebsites}
					    />
					    <TextField
				          floatingLabelText="Number of tags"
					      hintText={"Max amount: " + this.maxNumberOfTags} 
					      onChange={this.validateAmountOfTags}
					    />
                        {/*{this.state.tagsToDisplay != undefined &&*/}
						    {/*<TagCloud minSize={12}*/}
					            {/*maxSize={50}*/}
					            {/*tags={this.state.tagsToDisplay}*/}
					            {/*onClick={tag => alert('Tag with name:\'' + tag.value + '\' and count: ' + tag.count)} />*/}
						{/*}*/}
				      </div>
				    </Tab>
				</Tabs>
			</Dialog>
		)
	}
}