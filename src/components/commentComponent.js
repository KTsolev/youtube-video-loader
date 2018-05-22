import React, { Component } from 'react';
import '../styles/css/commentComponent.css';
import ReplyComponent from './replyComponent';

class CommentComponent extends Component {
  constructor() {
    super();
    this.state = {
      replies: [],
      toggleRepliesArea: false,
    };
  }

  showRepliesArea() {
    if (this.state.toggleRepliesArea) {
      this.setState({
        toggleRepliesArea: false,
      });
    } else {
      this.setState({
        toggleRepliesArea: true,
      });
    }
  }

  addReply(event) {
    const comment = event.target.value;
    const dateCreated = new Date();
    const videoId = this.props.comment.snippet.videoId;
    let index = 0;

    if (event.key === 'Enter' && comment) {
      index++;
      index = comment + index;

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
      const newComment = <ReplyComponent key={topLevelComment.snippet.id} comment={topLevelComment} />;
      this.state.replies.push(newComment);

      this.setState({
        replies: this.state.replies,
      });
      this.forceUpdate();
    }
  }

  render() {
    const userAvatar = this.props.comment.snippet.authorProfileImageUrl;
    const noAvatar = `https://yt3.ggpht.com/-ybB13qz0Izc/AAAAAAAAAAI/AAAAAAAAAAA/O3xwCKZpK74/s28-c-k-no-mo-rj-c0xffffff/photo.jpg`;
    return (
      <div className="comment-tile" key={this.props.comment.snippet.id}>
        <div className="comment-tile__header">
        <img
          className="comment-tile__author-avatar"
          src={userAvatar ? userAvatar : noAvatar}
          alt="authot img"/>
          <div className="comment-tile__author-info">
            <span className="comment-tile__author-name">
              {this.props.comment.snippet.authorDisplayName}
            </span>
            <span className="comment-tile__date">
              {
                new Date(this.props.comment.snippet.publishedAt).
                toLocaleString('en-GB',
                { weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric',
                })
            }
            </span>
          </div>
        </div>
        <div className="comment-tile__main">
          <textarea className="comment-tile__comment"
            value={this.props.comment.snippet.textDisplay}>
          </textarea>
        </div>
        <div className="comment-tile__footer">
          <div className="comment-tile__icons">
            <i className="comment-tile__icon fas fa-heart"></i>
            <span className="comment-tile__text">Like</span>
            <i className="comment-tile__icon fas fa-share-alt"></i>
            <span className="comment-tile__text">Share</span>
            <i className="comment-tile__icon far fa-comment-alt"
              onClick={this.showRepliesArea.bind(this)}></i>
            <span className="comment-tile__text"
               onClick={this.showRepliesArea.bind(this)}>Comment</span>
          </div>
          <div className="comment-tile__icons comment-tile__icons--right ">
            <i className="comment-tile__icon comment-tile__icon--report far fa-flag"></i>
            <span className="comment-tile__text">Report</span>
          </div>
        </div>
        <div className={
            this.state.toggleRepliesArea
            ?
              'comment-tile__reply comment-tile__reply--expanded'
            :
              'comment-tile__reply'}>
          <input
            type="text"
            className="comment-tile__reply-input"
            name="comment"
            placeholder="add reply..."
            onKeyPress={this.addReply.bind(this)}/>
        </div>
        {this.state.replies.length > 0 ?
          <div className="comment-tile__replies-section">
            {this.state.replies}
          </div>
          : ''}
    </div>
    );
  }
}

export default CommentComponent;
