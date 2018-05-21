import React, { Component } from 'react';
import YouTubeComponent from './youtubeComponent';
import '../styles/css/modalComponent.css';
import queryString from 'query-string';

class ModalComponent extends Component {
  constructor() {
    super();
    this.state = {
        url: '',
        hideVideo: true,
        linkParams: {},
        inputValue: '',
      };
    this.trigerUpdate = this.trigerUpdate.bind(this);

  }

  toggleVideo() {
    if (this.state.hideVideo) {
      this.setState({
        hideVideo: false,
      });
    } else {
      this.setState({
        hideVideo: true,
      });
    }

    this.setState({
      inputValue: '',
    });
  }

  trigerUpdate(event) {
    const link = event.target.value;
    const urlArr = link.split('/');
    const idString = urlArr[urlArr.length - 1];
    const queryParams = queryString.extract(link);
    const params = (queryParams && queryString.parse(queryParams)) || idString || '';

    this.setState({
      url: link,
      hideVideo: false,
      linkParams: params,
      inputValue: event.target.value,
    });
  }

  render() {
    return (
      <div className="modal-window">
        <div className={!this.state.hideVideo ?
          'modal-window__input-section modal-window__input-section--hidden'
           : 'modal-window__input-section'}>
          <input
            type="text"
            className="modal-window__input"
            name="link"
            placeholder="paste a link..."
            value={this.state.inputValue}
            onChange={this.trigerUpdate.bind(this)} />
        </div>
        <YouTubeComponent
          showVideo={!this.state.hideVideo}
          toggleVideo={this.toggleVideo.bind(this)}
          urlParams={this.state.linkParams} />
      </div>
    );
  }
}
export default ModalComponent;
