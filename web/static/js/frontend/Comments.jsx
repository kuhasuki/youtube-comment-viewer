import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { observer } from 'mobx-react';

@observer
export class Comments extends React.Component {

  componentDidMount() {
    const elem = ReactDOM.findDOMNode(this.refs.end);
    
    if (elem) {
      elem.scrollIntoView(false)
    }
  }

  componentDidUpdate() {
    const elem = ReactDOM.findDOMNode(this.refs.end);
    
    if (elem) {
      elem.scrollIntoView(false)
    }
  }


  render() {
    const url = 'http://www.youtube.com/embed/' + this.props.appState.embedId
    return (
      <div className="mdl-grid">
      <div className="mdl-cell mdl-cell--12-col">
        <button onClick={this.close} className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored back-button">
          Back to Streams Page
        </button>
      </div>
        <div className="mdl-cell mdl-cell--7-col video-container">
          <object data={url} className="youtube-embed"></object>
        </div>
        <div className="mdl-cell mdl-cell--5-col">
          <div className="mdl-card mdl-shadow--2dp chat-container">
             {this.props.appState.comments.map((commentInstance, index) => {
                return(
                  <div key={index}>
                    <span className="commenter" onClick={() => this.getList(commentInstance.username)}>{commentInstance.username}:</span>
                    <br></br>
                    <span className="mdl-chip comment-bubble">
                      <span className="mdl-chip__text">{commentInstance.comment}</span>
                    </span>
                  </div>
                )
              })
             }
             <div ref="end"></div>
          </div>
        </div>
        <div className="mdl-cell mdl-cell--12-col">
          <div className="mdl-card mdl-shadow--2dp tools-container">
            <span className="mdl-chip tools-info">
              <span className="mdl-chip__text info-text">Click on a Username to see all messages by that user here</span>
            </span>
            <div className="commenter">{this.props.appState.filterTarget}</div>
            {this.props.appState.filteredComments.map((commentInstance, index) => {
              return(<div key={index}>{index + 1}:{commentInstance.comment}</div>)
            })
          }
          </div>
        </div>
      </div>
    );
  }

  close = () => {
    this.props.appState.clearComments()
  }

  getList(user) {
    this.props.appState.getCommentsByUser(user)
  }
}