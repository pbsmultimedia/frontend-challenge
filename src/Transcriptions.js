import React from "react";
import "./transcriptions.scss";
import Header from "./Components/Header/Header";
import List from "./Components/List/List";

export default class Transcriptions extends React.Component {

	constructor()
	{
		super();	
		
		this.state = {
			transcriptions: [],			
			headerNavbarLinks: [] // pass links to navbar
		}
		
	}

	render() {	

		return (
			<React.Fragment>				
				<Header 
					title={"Transcriptions"}					
					links={this.state.headerNavbarLinks}
				/>
				<List  
					{...this.state} 
					deleteItems={this.deleteItems}
					setHeaderNavbarLinks= {this.setHeaderNavbarLinks} 
				/>
			</React.Fragment>
		)

	}

	// child components return links to add to header navbar
	setHeaderNavbarLinks = (links) => {		
		this.setState(prevState => ({
			headerNavbarLinks: [...prevState.headerNavbarLinks, links]	
		}))
	}

}