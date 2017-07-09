import React, { Component } from 'react'
import ReactDOM from 'react-dom'

export class StreamTile extends React.Component {
  render() {
  	let tileBackground = {
  		"backgroundImage": "url("+this.props.thumbnailUrl+")",
  		"backgroundSize": "cover"
  	}

    return (
      <div onClick={this.gotoStream} style={tileBackground} className="mdl-card mdl-shadow--2dp stream-tile" >
        <div className="stream-title">{this.props.title}</div>
      </div>
    );
  }

  gotoStream = () => {
  	if (!this.props.appState.isLoadingComments) {
  		this.props.appState.fetchComments(this.props.videoId)
  	}
  }
}