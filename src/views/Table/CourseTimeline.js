
import React from "react";
import Swal from 'sweetalert2';
// reactstrap components
import {
  UncontrolledTooltip,
  Button,
  Media,
  Col,
  Container,
  Row
} from "reactstrap";
import { SERVER_URL } from "actions/common";
import AudioPlayer from 'react-audio-player';
import VideoPlayer from 'react-player';
import ImageViewer from 'react-imageview';
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

  lunchObjTest = () =>{
    let q = this.props.data.question;

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "Once you start a test you may not be able to",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, am ready to start!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        swalWithBootstrapButtons.fire(
          'Start!',
          `Your test starts now ${new Date('now')} and would end in 12 minutes`,
          'success'
        )
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })

  }
  render() {
    let { description, title, types, links, question, weight, score, sizes } = this.props.data || '';
    let type_obj = [1, 2, 3];
    let type_ess = [4, 5, 6];
    let themeColor = 'info';
    let type = parseInt(types);
    let exts = links.split('.');
    let path = SERVER_URL + links;
    let ext = exts.splice(-1)[0];
    let que = JSON.parse(question);
    let obj = que && Array.isArray(que) && que.length > 0 ? que.filter((row)=>type_obj.includes(parseInt(row.type))):[];
    let ess = que && Array.isArray(que) && que.length > 0 ? que.filter((row)=>type_ess.includes(parseInt(row.type))):[];
    let scored = score ? score : 0;
    let weightd = weight ? weight : 0;
    let sizesd = sizes ? sizes/1024 : 0;
    let sizedd = sizesd + ' mb';
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
                <div class="timeline-body">{JSON.stringify(que)}
                  {description && description.length > 0 && description != 'null' ? <p >
                    <div  dangerouslySetInnerHTML={{__html: description}} />
                  </p>:null}
                  <p style={{minHeight:'100px'}}>
                    {type === 2 ? 
                    <>
                     <h5>Download File</h5>
                     <iframe src={`https://docs.google.com/gview?url=${path}&embedded=true`} style={{width:'300px', height:'170px'}} frameborder="0"></iframe>
                      </>
                      : ''}
                    {type === 3 ? 
                    <>
                    <h5>Download Image</h5>
                     <img 
                        src={SERVER_URL + links}
                        style={{minHeight:'200px', minWidth:'300px'}}
                     />
                     </>
                      : ''}
                    {type === 4 ? 
                    <>
                      <h5>Download Video</h5>
                      <VideoPlayer
                        url={path}
                        onError={this.onError}
                      />
                    </>
                      : ''}
                    {type === 5 ? 
                    <>
                    <h5>Download Audio File</h5>
                      <AudioPlayer
                        src={path}
                        autoplay
                        controls
                        onError={this.onError}
                      />
                      </>
                      : ''}
                    {type === 6 ? 
                      <VideoPlayer
                        url={path}
                        onError={this.onError}
                      />
                      : ''}
                    {type === 7 ? 
                    <a href={path} target="_blank" class={`btn btn-link btn-block btn-bg`}>Click link</a>
                      : ''}
                  </p>
                </div>
                    <a href={path} target="_blank" class={`btn btn-${themeColor} btn-block btn-bg`}><i classname="fa fa-"></i>Download File {sizedd}</a>
                    <p>
                        <button className="btn btn-info btn-sm" onClick={this.lunchObjTest}>Take Test Multichoice <span class="badge">{ obj.length} questions</span></button>
                        <button className="btn btn-info btn-sm">Take Test (Teacher Marked) <span class="badge">{ ess.length} questions </span></button>
                    </p>
                <h6>
                  <Container>
                    <Row xs='12'>
                      <Col xs='6'>
                        <i class="fa fa-tag"></i>{" "}
                        <b>Weight:</b>{" "}{`${weightd}`}
                      </Col>
                      <Col xs='6'>
                        <i class="fa fa-check"></i>{" "}
                        <b>Final Score : </b>{scored}
                      </Col>
                    </Row>
                    </Container>
                </h6>
        </div>
        </li>
         
      </>
    );
  }
}


export default TimeLine