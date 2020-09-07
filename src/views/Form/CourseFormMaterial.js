import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import CKEditor from 'ckeditor4-react';
import { getCoursematerials,getCoursematerial, registerCoursematerial, updateCoursematerial } from './../../actions/coursematerial';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Col,Row, Container,  FormText } from 'reactstrap';
import { SERVER_URL } from 'actions/common';
import { callError } from 'actions/common';


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
  
  const [modal, setModal] = useState(false);
  const [id, setId] = useState(null);
  const [title, setTitle] = useState(null);
  
  const [description, setDescription] = useState(null);
  const [type, setType] = useState(0);
  const [files, setFiles] = useState(null);
 
  const toggle = () => setModal(!modal);
  const toggles = (rid) => {
    toggle();
    
    setType(rid);
  }
  
  useEffect(() => {
    if(parseInt(props.mid) > 0 )
    {
     setId(props.mid);
     setModal(!modal);
     populate(props.coursematerials.coursematerial);
    } 
},[props.mid]);

const resetdata = () =>{
  setModal(false);
  setType('');
  setDescription('');
  props.handleClose();
}
  
  const handleSubmit = (e) =>{
        e.preventDefault();
      try{
        const datax = new FormData();
        if(type === 1 )
        {
          datax.append('description',  files);
        }else
        {
          datax.append('description',  description);
        }
        if(type === 6 || type === 7)
        {
          datax.append('links',  files);
        }
        if(type === 2 || type === 3 || type === 4 || type === 5)
        {
          datax.append('files',  files);
        }
        
        datax.append('title', title);
        datax.append('types', type);
        datax.append('table', 'course_materials');
        
        if(id && id > 0)
        {
          datax.append('cat','update');
          datax.append('id', id);
          props.registerCoursematerial(datax);
        }else{
          datax.append('cat','insert');
          datax.append('moduleId', props.moduleId);
          props.registerCoursematerial(datax);
        }
        //resetdata();
      }catch(err)
      {
          callError(err);
      }
  }

  const populate = async(data) =>{
        setTitle(data.title);
        setType(parseInt(data.types));
        setDescription(data.description);
        setFiles(data.links);
    }

  const handleInputChange = (evt) => {
      setFiles(evt.target.files [0]);
    }

    const handleLoad = sid => {
      let ar = {};
      ar['moduleId'] = sid;
      props.getCoursematerials(ar);
    }
  
  let editId = id ? id : null;
  let editName = 'Add';
  let editColor = 'primary';

  return (
    <div>
      <div className="btn-group dropup">
        <Button className="btn-sm" color="default" onClick={()=>handleLoad(props.moduleId)} ><i className="now-ui-icons arrows-1_cloud-download-93"></i> </Button>
        <button className="btn btn-secondary dropdown-toggle btn-primary btn-sm" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
         <i className="fa fa-plus"></i>
        </button>
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton" style={{zIndex:201}}>
          <a className="dropdown-item" href="#" onClick={()=>toggles(1)}><i className='fa fa-file'></i> Text</a>
          <a className="dropdown-item" href="#" onClick={()=>toggles(2)}><i className="fa fa-file-pdf" ></i> Upload Document</a>
          <a className="dropdown-item" href="#" onClick={()=>toggles(3)}><i className='fa fa-file-image'></i> Upload Image</a>
          <a className="dropdown-item" href="#" onClick={()=>toggles(4)}><i className='fa fa-file-video'></i> Upload Video</a>
          <a className="dropdown-item" href="#" onClick={()=>toggles(5)}><i className='fa fa-file-audio'></i> Upload Audio</a>
          <a className="dropdown-item" href="#" onClick={()=>toggles(6)}><i className='fa fa-youtube'></i> Youtube link</a>
          <a className="dropdown-item" href="#" onClick={()=>toggles(7)}><i className='fa fa-link'></i> Links/Code</a>
          <a className="dropdown-item" href="#" onClick={()=>toggles(8)}><i className='fa fa-comment'></i> Discussion/Chat</a>
          <a className="dropdown-item" href="#" onClick={()=>toggles(9)}><i className='fa fa-question'></i> Questions only</a>    
        </div>
      </div>
     
      <Modal isOpen={modal} toggle={toggle}  keyboard={false} backdrop='static' >
        <ModalHeader toggle={resetdata}>{editName} Learning Material/Task</ModalHeader>
        <ModalBody>
        <Form>
            <FormGroup row>
                <Label for="name" sm={3}>Title </Label>
                <Col sm={9}>
                <Input 
                    type="text" 
                    name="title" 
                    id="title"  
                    required
                    defaultValue={title}
                    onChange={e=>setTitle(e.target.value)} 
                     /><FormText className='muted'>Title the attachment</FormText>
                </Col>
            </FormGroup>
            {type === 1 ? 
           <FormGroup row>
           <Label for="link" sm={12}>Type in your data (format appropriately) </Label>
           <Col sm={12}>
             <CKEditor
             data ={description}
             onChange={e=>setFiles(e.editor.getData())}
             />
           </Col>
       </FormGroup>
              : 
              <FormGroup row>
                <Label for="name" sm={3}>Description </Label>
                <Col sm={9}>
                <Input 
                    type="textarea" 
                    name="description" 
                    id="description" 
                    row={5}
                    col={8} 
                    required
                    defaultValue={description}
                    onChange={e=>setDescription(e.target.value)} 
                     /><FormText className='muted'>Briefly describe the attachment/give instructions</FormText>
                </Col>
            </FormGroup>
              
              }

              {type === 2 || type === 3 || type === 4 || type === 5  ? 
            <FormGroup row>
            <Label for="files" sm={12}>Upload </Label>
            <Row xs={12} className="row fileinput fileinput-new text-center m-auto" data-provides="fileinput">
                    <Col className="fileinput-new thumbnail h-150" xs={12} >
                      <i className='fa fa-video-camera' style={{fontSize:100}} aria-hidden="true"></i>
                    </Col> 
                    <Col xs='12'>
                      <i className={props.coursematerials.isEditing ? 'border-spinner' :`fa ${pics[type]}`} style={{fontSize:100}} aria-hidden="true"></i>
                      <div className="fileinput-preview fileinput-exists thumbnail img-raised"></div>
                        <span className="btn btn-raised btn-round btn-default btn-file">
                        <span className="fileinput-new">Add</span>
                        <span className="fileinput-exists">Change</span>
                        <input 
                        style={{width:200}}
                        type="file" 
                        name="files" 
                        id="files" 
                        onChange={handleInputChange}
                        />
                        </span>
                    </Col>
                    
                   
          </Row>
                
            
        </FormGroup>
              : ''}
          {type === 6  ? 
            <FormGroup row>
            <Label for="files" sm={3}>Youtube Video link</Label>
            <Col sm={9}>
            <Input 
                type="text" 
                name="files" 
                id="files"  
                required
                defaultValue={files}
                onChange={e=>setFiles(e.target.value)} 
                placeholder="" />

            </Col>
            
        </FormGroup>
              : ''}

{type === 7  ? 
            <FormGroup row>
            <Label for="files" sm={3}>Link/Code </Label>
            <Col sm={9}>
            <Input 
                type="text" 
                name="files" 
                id="files"  
                required
                defaultValue={files}
                onChange={e=>setFiles(e.target.value)} 
                placeholder="" />
                <FormText className='muted'>Websites, Document links, Google meet or Zoom code</FormText>
            </Col>
            
        </FormGroup>
              : ''}

{type === 8  ? 
            <FormGroup row>
            <Label for="files" sm={3}>Chat Link</Label>
            <Col sm={9}>
            <Input 
                type="text" 
                name="files" 
                id="files"  
                required
                defaultValue={files}
                onChange={e=>setFiles(e.target.value)} 
                placeholder="" />
                <FormText className='muted'>Whatsapp, Telegram</FormText>
            </Col>
            
        </FormGroup>
              : ''}
            
        </Form>
        </ModalBody>
        <ModalFooter>
          { !props.coursematerials.isEditing ?
          <Button color={editColor} onClick={handleSubmit}>{editId ? 'Edit' : 'Submit'}</Button>:
          <Button color='info' disabled>
            <span className='spinner-border spinner-border-sm'></span>{' '}
               Loading...
          </Button>}
          {' '}
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