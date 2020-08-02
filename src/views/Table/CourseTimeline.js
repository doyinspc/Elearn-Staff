
import React from "react";

// reactstrap components
import {
  UncontrolledTooltip,
  Button,
  Media
} from "reactstrap";
import { SERVER_URL } from "actions/common";
import FileViewer from 'react-file-viewer';
import AudioPlayer from 'react-audio-player';
import VideoPlayer from 'react-player';
import Downloader from "react-download-link";
const imgx = require("assets/img/place.png");
const pics = {
  1 : 'fa-file-text',
  2 : 'fa-file-pdf',
  3 : 'fa-file-image',
  4 : 'fa-file-video',
  5 : 'fa-file-audio',
  6 : 'fa-youtube',
  7 : 'fa-link',
  8 : 'fa-comment',
  9 : 'fa-question',
  10 : 'fa-file-text'
}
class TimeLine extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      id:null,
      
    }
  }
  
  onError = err =>{
    console.log(err);
  }
  render() {
    let { description, title, types, links } = this.props.data || '';
    let themeColor = 'info';
    let type = parseInt(types);
    let exts = links.split('.');
    let path = SERVER_URL + links;
    let ext = exts.splice(-1)[0];

    return (
      <>
       <li class="timeline-inverted">
            <div class={`timeline-badge ${themeColor}`}>
                <i class={`fa ${pics[types]}`}></i>
            </div>
            <div class="timeline-panel">
                <div class="timeline-heading">
                    <span class={`badge badge-${themeColor}`}>{title}</span>
                </div>
                <div class="timeline-body">
                  <p style={{minHeight:'200px'}}>
                    
                    {type === 1 ? <div  dangerouslySetInnerHTML={{__html: description}} /> : ''}
                    {type === 2 ? 
                      <FileViewer
                        fileType={ext}
                        filePath={path}
                        onError={this.onError}
                      />
                      : ''}
                    {type === 3 ? 
                      <FileViewer
                        fileType={ext}
                        filePath={path}
                        onError={this.onError}
                      />
                      : ''}
                    {type === 4 ? 
                      <VideoPlayer
                        url={path}
                        onError={this.onError}
                      />
                      : ''}
                    {type === 5 ? 
                      <AudioPlayer
                        src={path}
                        autoplay
                        controls
                        onError={this.onError}
                      />
                      : ''}
                    {type === 6 ? 
                      <VideoPlayer
                        url={path}
                        onError={this.onError}
                      />
                      : ''}
                    {type === 7 ? 
                      <FileViewer
                        fileType={ext}
                        filePath={path}
                        onError={this.onError}
                      />
                      : ''}
                  </p>
                </div>
                <h6>
                    <i class="ti-time"></i>
                    11 hours ago via Twitter
                </h6>
        </div>
        </li>
         
      </>
    );
  }
}


export default TimeLine