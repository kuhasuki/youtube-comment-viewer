import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { observer } from 'mobx-react'

import { StreamTile } from './StreamTile'
import { Comments } from './Comments'

@observer
class App extends Component {

  render() {
  	if (this.props.appState.isLoadingStreams) {
  		return(
  			<div>Loading</div>
  		);
  	} else {
  		if (this.props.appState.commentView) {
  			return(
  				<Comments appState={this.props.appState} />
  			);
  		} else {
		    return (
	        <div className="mdl-grid">
	          {this.props.appState.streams.map((streamInstance, index) => {
							return(
								<div className="mdl-cell mdl-cell--3-col" key={index} >
									<StreamTile appState={this.props.appState} title={streamInstance.title} thumbnailUrl={streamInstance.thumbnailUrl} videoId={streamInstance.id} />
								</div>
							);
						})}
	        </div>
	    	);	
	  	}
  	}
  }
};

export default App