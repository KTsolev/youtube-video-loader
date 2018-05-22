import React, { Component } from 'react';
import '../styles/css/replyComponent.css';

class ReplyComponent extends Component {
  render() {
    const userAvatar = this.props.comment.snippet.authorProfileImageUrl;
    const noAvatar = `https://yt3.ggpht.com/-ybB13qz0Izc/AAAAAAAAAAI/AAAAAAAAAAA/O3xwCKZpK74/s28-c-k-no-mo-rj-c0xffffff/photo.jpg`;
    return (
      <div className="reply-tile" key={this.props.comment.snippet.id}>
        <div className="reply-tile__header">
        <img
          className="reply-tile__author-avatar"
          src={userAvatar ? userAvatar : noAvatar}
          alt="authot img"/>
          <div className="reply-tile__author-info">
            <span className="reply-tile__author-name">
              {this.props.comment.snippet.authorDisplayName}
            </span>
            <span className="reply-tile__date">
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
        <div className="reply-tile__main">
          <textarea className="reply-tile__comment"
            value={this.props.comment.snippet.textDisplay}>
          </textarea>
        </div>
    </div>
    );
  }
}

export default ReplyComponent;
