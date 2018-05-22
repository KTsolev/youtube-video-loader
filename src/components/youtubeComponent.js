import React, { Component } from 'react';
import '../styles/css/youtubeComponent.css';
import CommentComponent from './commentComponent';

class YouTubeComponent extends Component {
  constructor() {
    super();
    this.state = {
        comments: [],
      };
    this.onKeyPress = this.createNew.bind(this);
  }

  getVideoId() {
    return typeof this.props.urlParams === 'object' ?
     this.props.urlParams.v : this.props.urlParams;
  }

  createNew(event) {
    const comment = event.target.value;
    const dateCreated = new Date();
    const videoId = this.getVideoId();
    let index = 0;
    if (event.key === 'Enter' && comment) {
      const topLevelComment = {
        snippet: {
          id: index,
          authorDisplayName: 'unknown',
          authorProfileImageUrl: '',
          videoId: videoId,
          textDisplay: `${comment}`,
          textOriginal: comment,
          canRate: true,
          viewerRating: 'none',
          likeCount: 0,
          publishedAt: dateCreated,
          updatedAt: dateCreated,
        },
      };
      const newComment = <CommentComponent
         key={topLevelComment.snippet.id}
         comment={topLevelComment} />;
      this.state.comments.unshift(newComment);

      this.setState({
        comments: this.state.comments,
      });
      this.forceUpdate();
    }

    return;
  }

  componentDidUpdate() {
    let fetchedComments = this.state.comments;
    const urlId = this.getVideoId();
    if (urlId && fetchedComments.length === 0) {
      const API_KEY = 'AIzaSyDrTYGSBMQwaMNQYed31KnJD6IdQJSxYHs';
      const url = `https://www.googleapis.com/youtube/v3/commentThreads?key=${API_KEY}&textFormat=plainText&part=snippet&videoId=${urlId}`;
      fetch(url)
        .then((results) => {
          return results.json();
        }).then((data) => {
          if (!data) {
            return;
          }
          fetchedComments = data.items.map((item) => {
              return (
                <CommentComponent key={item.snippet.topLevelComment.snippet.id} comment={item.snippet.topLevelComment} />
              );
            });
          this.setState({
            comments: fetchedComments,
          });
        }).catch(err => console.log(err));
    }
  }

  render() {
    const urlID = this.getVideoId();

    const videoSrc = `https://www.youtube.com/embed/${urlID}?rel=0&showinfo=0&autoplay=0`;
    return (
      <div className={
        this.props.showVideo
        ? 'youtube-player youtube-player--visible'
        : 'youtube-player'
      }
      embed={urlID}>
        <div className="youtube-player__close-button" onClick={this.props.toggleVideo}>
          <i className="fas fa-times"></i>
        </div>
        <iframe
          className="youtube-player__video"
          type="text/html"
          title="VideoPlayer"
          src={videoSrc}
          frameBorder="0"/>
        <div className="youtube-player__footer">
          <div className="youtube-player__icons">
            <i className="youtube-player__icon fas fa-share-alt"></i>
            <span className="youtube-player__text">Share</span>
            <i className="youtube-player__icon fas fa-heart"></i>
            <span className="youtube-player__text">Like</span>
          </div>
          <div className="youtube-player__buttons">
            <span className="youtube-player__button youtube-player__button--edit">Edit</span>
            <span className="youtube-player__button youtube-player__button--delete">Delete</span>
          </div>
        </div>
        <div className="youtube-player__comments">
          <input
            type="text"
            className="youtube-player__input"
            name="comment"
            placeholder="comment..."
            onKeyPress={this.createNew.bind(this)}/>
        </div>
        {this.state.comments.length > 0 ?
          <div className="youtube-player__comments-section">
            {this.state.comments}
          </div>
          : ''}
    </div>
    );
  }
}

export default YouTubeComponent;
