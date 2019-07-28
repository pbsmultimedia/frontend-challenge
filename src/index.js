import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import Header from "./components/header/header";
import List from "./components/list/list";

class App extends React.Component {

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

ReactDOM.render(<App/>, document.getElementById('app'));