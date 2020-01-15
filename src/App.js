import React, { Component } from 'react';
// import { render } from 'react-dom';
import VideoRecorder from 'react-video-recorder';
import axios from 'axios';
import './App.css';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      video_data: null
    };
  }

  //Click  and send video
  sendVideo = () => {
    let form = new FormData();
    form.append('file', this.state.video_data, 'myvideo');

    axios({
      method: 'post',
      url: 'http://127.0.0.1:5000/video',
      data: form
    }).then(function(response) {
      console.log(response);
    });
    console.log('state olan video', this.state.video_data);
  };

  render() {
    return (
      <>
        <div className='App'>
          <VideoRecorder
          // time limit recording
          timeLimit={3000}
            onRecordingComplete={videoBlob => {
              this.setState({ video_data: videoBlob }); 
            }}
          />
          <div className='button_contaner'>
            <button
              className='send_button'
              onClick={this.sendVideo}
              disabled={this.state.video_data === null ? true : false}
            >
              Send Video
            </button>
          </div>
        </div>
      </>
    );
  }
}
