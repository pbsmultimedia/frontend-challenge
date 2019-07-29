import React from "react";
import "./list.scss";
import axios from "axios";
import { ReactComponent as PersonIcon } from "../../img/person.svg";
import { ReactComponent as DeleteIcon } from "../../img/delete.svg";
import { ReactComponent as FetchIcon } from "../../img/fetch.svg";
import { ReactComponent as UploadIcon } from "../../img/upload.svg";
import { ReactComponent as AddIcon } from "../../img/add.svg";

class List extends React.Component  
{

	constructor(props) {
		super(props);

		this.state = {
			transcriptions: [],
			page: 0, // pagination on the API to load different results -  or should be last received ID?
		}

		this.endpoint = "http://www.mocky.io/v2/5ae1c5792d00004d009d7e5c";
				
		this.props.setHeaderNavbarLinks(
			[
				<button
					onClick={this.uploadTranscriptions} 
					title="upload transcriptions"
					key="upload-transcriptions"
				>
					<UploadIcon />
				</button>,
				<button 
					onClick={this.fetchTranscriptions}
					title="fetch transcriptions"
					key="fetch-transcriptions"
				>
					<FetchIcon />
				</button>				
			]
		);

	}
	
	scrollIntoView = () => {
		// scroll to bottom to show the last results
		
		document.getElementById("transcriptions-add-btn").scrollIntoView({
  			behavior: 'smooth'
		}); 				
	}

	render () {
		return (
			<div className="transcriptions">
				<ul className="transcriptions__list">
					{Object.keys(this.state.transcriptions).map((k)=>{						
						return(							
							<li 
								className="transcriptions__item"
								key={"transcriptions__item-"+k}
							>
								<div 
									className="transcriptions__checkbox-wrapper"
								>									
									<input 
										type="checkbox" 
										id={"transcriptions__item-"+k} 
										className="transcriptions__checkbox"
									/>
									<label 
										htmlFor={"transcriptions__item-"+k} 
										className="transcriptions__checkbox-label"
									/>
								</div>
								<div 
									className="transcriptions__face-icon-wrapper"
								>
									<PersonIcon 
										className="transcriptions__face-icon"  
									/>
								</div>	
								<div
									className="transcriptions__voice-and-text-wrapper"
								>
									<div 
										className="transcriptions__voice" 
										contentEditable="true" 
										suppressContentEditableWarning={true}
										title="click to edit voice"
										onBlur={(e)=>this.updateItem("voice", e, k)}
									>
										{this.state.transcriptions[k].voice}
									</div>
									<div 
										className="transcriptions__text" 
										contentEditable="true" 
										suppressContentEditableWarning={true}
										title="click to edit text"
										onBlur={(e)=>this.updateItem("text", e, k)}
									>
										{this.state.transcriptions[k].text}
									</div>
								</div>
								<div
									className="transcriptions__delete-wrapper"
								>
									<button
										onClick={()=>{this.deleteItem(k)}}
										className="transcriptions__delete-btn"
										title="delete transcription"
									>
										<DeleteIcon />
									</button>	
								</div>	
							</li>
						)
					})}			
				</ul>
				<div 
					className="transcriptions__add-btn-row"
				>
					<button 
						onClick={ this.addTranscriptionListItem } 
						title="add new transcription"
						id="transcriptions-add-btn"						
					>
						<AddIcon />
					</button>
				</div>	
			</div>
		)	
	}

	addTranscriptionListItem = () => {		

		this.setState(prevState => ({
			transcriptions: [
				...prevState.transcriptions, 
				{"id":"", "voice":"Enter voice here", "text":"Enter text here"} // id of new items should be defined on the backend.
			]
		}));
		this.scrollIntoView();		
	}	

	
	fetchTranscriptions = () => {		

		axios.get(this.endpoint+"?page="+this.state.page)
		.then(r => {			
			this.setState(prevState => ({
				transcriptions: [
					...prevState.transcriptions,				
					...r.data				
				],
				page: prevState.page + 1	
			}));
			this.scrollIntoView();
		})
		.catch(e => {			
			console.log(e);
			alert("an error has ocurred");
		});			
	}

	uploadTranscriptions = () => {
		
		if (!this.state.transcriptions.length) {
			alert("no transcriptions to upload");
			return;
		}

		if (window.confirm("upload all?")) {

			axios.post(
				this.endpoint, 
				{ 
					transcriptions: this.state.transcriptions
				}
			)
			.then(r => {				
				this.setState({
					transcriptions: []
				});
				alert("transcriptions uploaded with success!");
			})
			.catch(e => {				
				console.log(e);
				alert("an error has ocurred");
			});			
		}
	}

	deleteItem = (id) => {

		if (window.confirm("delete this transcription?")) {
			this.state.transcriptions.splice(id,1);
			this.setState({
				transcriptions: this.state.transcriptions
			})
		}		
	}

	updateItem = (type, e, k) => {
				
		let transcriptions = this.state.transcriptions;
		transcriptions[k][type] = e.target.innerText;
		
		this.setState({
			transcriptions: transcriptions
		})		
	}

}

export default List;
