import React from "react"
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {List, ListItem} from 'material-ui/List'
import SeoApi from '../SeoApi'

export default class WebsiteTagsDialog extends React.Component {
	constructor(){
		super()
		this.state = {
			data : undefined,
		}
	}
	render (){
		let self = this
		let { website } = this.props

		let tags = {};
		let tagsNodes = [];
		if (this.state.data == undefined){
			SeoApi.getWebsiteTags(website.id, (response) => {
				self.setState({data : response})
			})
		}else{
			this.state.data.forEach((item,index) => {
				if (tags[item.type] == undefined) tags[item.type] = []
				let node = (
					<ListItem
			            key={index}
			            primaryText={item.text}
			          />
					)
				tags[item.type].push(node)
          	})
          	let index = 0
          	for (let property in tags) {
          		index ++;
			    if (tags.hasOwnProperty(property)) {
			    	let title = '';
					switch (property) {
						case 't':
							title = 'Titles'
							break;
						case 'h1':
							title = 'h1'
							break;
						case 'h2':
							title = 'h2'
							break;
						case 'h3':
							title = 'h3'
							break;
						case 'h4':
							title = 'h4'
							break;
						case 'l':
							title = 'List Items'
							break;
						case 'im':
							title = 'Image Titles'
							break;
						case 'al':
							title = 'Image Alternate Text'
							break;
						case 'b':
							title = 'Bold'
							break;
						case 'it':
							title = 'Italic'
							break;
						case 'u':
							title = 'Underlined'
							break;
					}
					let node = <ListItem
								key={index}
						        primaryText={title}
						        initiallyOpen={false}
						        primaryTogglesNestedList={true}
						        nestedItems={tags[property]}
						        />
					tagsNodes.push(node);
			    }
			}
		}

		const dialogActions = [
          <FlatButton
            label="Ok"
            primary={true}
            keyboardFocused={true}
            onTouchTap={this.props.closeDialog}
          />,
        ];

		return (
				<Dialog
                  actions={dialogActions}
                  modal={false}
                  open={this.props.dialogOpen}
                  onRequestClose={this.props.closeDialog}
                  autoScrollBodyContent={true}
                >
                	{this.props.website.url}
                	<List>
                	{tagsNodes}
                	</List>
                </Dialog>
			)
	}
}