
import React from "react";

// reactstrap components
import {
  UncontrolledTooltip,
  Button,
  Media
} from "reactstrap";
import { SERVER_URL } from "actions/common";
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
  render() {
    let { description, title, types } = this.props.data || '';
    let themeColor = 'danger';
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
                  <p>{description}</p>
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