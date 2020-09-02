import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import AudioPlayer from 'react-audio-player';
import VideoPlayer from 'react-player';
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
  const [links, setLinks] = useState('');
 
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
        let exts = data.links ? data.links.split('.'): [];
        let pth = SERVER_URL + data.links;
        let exten = exts.splice(-1)[0];
        setExt(exten);
        setPath(pth);
        setLinks(data.links);
    }
  const resetdata = () =>{
    props.handleClose();
  }
  const onError = err =>{
      console.log(err);
    }
  
  

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle}  keyboard={false} backdrop='static' >
  <ModalHeader toggle={resetdata}><i className={`fa ${pics[type]}`}></i>Learning Material/Assessment</ModalHeader>
        <ModalBody>
          <Container>
          <Row sm={12} >
          <p className="h6">{title}</p>
          </Row>
          <Row sm={12} width={300}>
        
          {description && description.length > 0 && description != 'null' ? 
                    <div  dangerouslySetInnerHTML={{__html: description}} />
                  :null}
          {type === 2 ? 
           <iframe src={`https://docs.google.com/gview?url=${path}&embedded=true`} style={{width:'400px', height:'170px'}} frameborder="0"></iframe>
            : ''}
          {type === 3 ? 
            <img 
            src={path}
            style={{minHeight:'200px', minWidth:'300px'}}
         />
            : ''}
          {type === 4 ? 
            <VideoPlayer
              url={path}
              onError={onError}
              light
              controls
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
              url={links}
              light
              controls
              onError={onError}
            />
            : ''}
           {type === 7 ? 
            <a target='_blank' href={links}> Click the link to redirect or download</a>
            : ''}
          </Row>
          <Row sm={12}>
            { type === 2 || type === 3 ||type === 4 ||type === 5 ?
              <a href={path} target='_blank' className='btn btn-info btn-block'>Download File</a>
            : ""}
              </Row>
          </Container>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={resetdata}>Cancel</Button>
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