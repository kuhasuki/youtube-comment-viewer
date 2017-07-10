import { action,  observable } from 'mobx'
const request = require('request-promise-lite')

class AppState {
 	@observable streams = []
 	@observable comments = []
  @observable filteredComments = []
  @observable filterTarget = ""
 	@observable commentView = false
 	@observable isLoadingComments = false
  @observable isLoadingStreams = true
  @observable embedId = ""

  constructor() {
    this.fetchStreams();
    this.liveChatId = ""
    this.nextPageToken = ""
    this.pollingInterval = 0
    this.stopUpdatingComments = true
  }

  /**
   * Fetches all streams from the server
   */
  fetchStreams() {
    this.isLoadingStreams = true
    request.get(window.origin + '/api/streams', { json: true }).then(fetchedStreams => {
      fetchedStreams.streams.forEach(stream => {
          this.processStream(stream)
      })
      this.isLoadingStreams = false
    });
  }

  /**
   * Fetches all comments for a video from the server
   */
  fetchComments(id) {
  	this.isLoadingComments = true
  	this.stopUpdatingComments = false
    this.embedId = id
    request.get(window.origin + '/api/comments/' + id, { json: true }).then(fetchedComments => {
      if (!('error' in fetchedComments.comments)) {
       	this.liveChatId = fetchedComments.comments.liveChatId
    		this.nextPageToken = fetchedComments.comments.nextPageToken
       	this.pollingInterval = fetchedComments.comments.pollingIntervalMillis
        fetchedComments.comments.items.forEach(comment => {
            this.processComment(comment)
        })
        this.isLoadingComments = false
        this.commentView = true
        if (!this.stopUpdatingComments) {
      		setTimeout(this.updateComments.bind(this), this.pollingInterval);
      	} else {
      	 this.stopUpdatingComments = true
      	}
      } else {
        this.commentView = false
        this.isLoadingComments = false
        this.stopUpdatingComments = true
      }
    });
  }

  processStream(stream) {
    let processedStream = {
      id: stream.id.videoId,
      title: stream.snippet.title,
      thumbnailUrl: stream.snippet.thumbnails.default.url
    }
    this.addStream(processedStream)
  }

  processComment(comment) {
    if ("authorDetails" in comment) {
    	let processedComment = {
    		username: comment.authorDetails.displayName,
    		comment: comment.snippet.displayMessage 
    	}
    	this.addComment(processedComment)
    }
  }

  addStream(stream) {
    this.streams.push(stream)
  }

  addComment(comment) {
		this.comments.push(comment)
  }

  getCommentsByUser(user) {
    this.filterTarget = user
    this.filteredComments = this.comments.filter(comment => {
      return comment.username === user
    })
  }

  /**
   * Fetches all new comments for a video from the server
   */
  @action 
  updateComments() {
  	request.get(window.origin + '/api/comments/update/' + this.liveChatId + '/' + this.nextPageToken, { json: true }).then(fetchedComments => {
      this.pollingInterval = fetchedComments.comments.pollingIntervalMillis
      this.nextPageToken = fetchedComments.comments.nextPageToken
      fetchedComments.comments.items.forEach(comment => {
          this.processComment(comment)
      })
      if (!this.stopUpdatingComments) {
      	setTimeout(this.updateComments.bind(this), this.pollingInterval);
      } else {
      	this.stopUpdatingComments = true
      }
    });
  }

  clearComments() {
  	this.comments = []
    this.filteredComments = []
    this.filterTarget = ""
  	this.commentView = false
  	this.stopUpdatingComments = true
  }
}

export default AppState