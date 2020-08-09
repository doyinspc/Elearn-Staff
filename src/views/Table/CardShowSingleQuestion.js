import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import AudioPlayer from 'react-audio-player';
import VideoPlayer from 'react-player';
import Downloader from "react-download-link";
import { SERVER_URL } from './../../actions/common'
import { getCoursematerials,getCoursematerial, registerCoursematerial, updateCoursematerial } from '../../actions/coursematerial';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Container } from 'reactstrap';


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
const Modals = (props) => {
  
  const [modal, setModal] = useState(props.st);
  const [id, setId] = useState(null);
  const [title, setTitle] = useState(null);
  const [type, setType] = useState(0);
  const [description, setDescription] = useState('');
  const [ext, setExt] = useState('');
  const [path, setPath] = useState('');
 
  const toggle = () => setModal(!modal);
  
  
  useEffect(() => {
   
    if(parseInt(props.mid) > 0 )
    {
     setId(props.mid);
     setModal(true);
     populate(props.data);
    } 
},[props.mid]);

  const populate = async(data) =>{
        setTitle(data.title);
        setType(parseInt(data.types));
        setDescription(data.description)
        let exts = data.links.split('.');
        let pth = SERVER_URL + data.links;
        let exten = exts.splice(-1)[0];
        setExt(exten);
        setPath(pth);
    }


  const onError = err =>{
      console.log(err);
    }
  
  

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle} >
  <ModalHeader toggle={toggle}><i className={`fa ${pics[type]}`}></i>{ext} Learning Material/Assessment</ModalHeader>
        <ModalBody>
          <Container>
          <Row sm={12} >
          <p className="h6">{title}</p>
          </Row>
          <Row sm={12} width={300}>
          {type === 1 ? <div  dangerouslySetInnerHTML={{__html: description}} /> : ''}
          {type === 2 ? 
           ''
            : ''}
          {type === 3 ? 
            ''
            : ''}
          {type === 4 ? 
            <VideoPlayer
              url={path}
              onError={onError}
            />
            : ''}
          {type === 5 ? 
            <AudioPlayer
              src={path}
              autoplay
              controls
              onError={onError}
            />
            : ''}
          {type === 6 ? 
            <VideoPlayer
              url={path}
              onError={onError}
            />
            : ''}
           {type === 7 ? 
            null
          
            : ''}
          </Row>
          <Row sm={12}>
            <Downloader
              label="Download File"
              filename={path}
              exportFile={()=>{Promise.resolve(title)}}
              />
          </Row>
          </Container>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
const mapStateToProps = (state, ownProps) => ({ 
    courses: state.courseReducer,
    coursematerials: state.coursematerialReducer,
  })
  
export default connect(mapStateToProps, { getCoursematerials, getCoursematerial, registerCoursematerial, updateCoursematerial })(Modals)