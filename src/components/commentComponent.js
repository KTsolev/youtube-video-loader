import React, { Component } from 'react';
import '../styles/css/commentComponent.css';

class CommentComponent extends Component {

  render() {
    return (
      <div className="comment-tile" key={this.props.comment.snippet.id}>
        <div className="comment-tile__header">
          <img
            className="comment-tile__author-avatar"
            src={this.props.comment.snippet.authorProfileImageUrl}
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
            <i className="comment-tile__icon far fa-comment-alt"></i>
            <span className="comment-tile__text">Comment</span>
          </div>
          <div className="comment-tile__icons comment-tile__icons--right ">
            <i className="comment-tile__icon comment-tile__icon--report far fa-flag"></i>
            <span className="comment-tile__text">Report</span>
          </div>
        </div>
    </div>
    );
  }
}

export default CommentComponent;
