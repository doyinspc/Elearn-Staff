import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import CKEditor from 'ckeditor4-react';
import { getCoursematerials,getCoursematerial, registerCoursematerial, updateCoursematerial } from './../../actions/coursematerial';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Col,  FormText } from 'reactstrap';


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

  
  const handleSubmit = (e) =>{
        e.preventDefault();
        const datax = new FormData();
        if(type === 1 )
        {
          datax.append('description',  files);
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
        
  }

  const populate = async(data) =>{
        setTitle(data.title);
        setType(parseInt(data.types));
    }

  const handleInputChange = (evt) => {
      setFiles(evt.target.files[0]);
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
      <div class="btn-group dropup">
        <Button className="btn-sm" color="default" onClick={()=>handleLoad(props.moduleId)} ><i class="fa fa-refresh"></i> </Button>
        <button class="btn btn-secondary dropdown-toggle btn-primary" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
         <i class="fa fa-plus"></i>
        </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton" style={{zIndex:201}}>
          <a class="dropdown-item" href="#" onClick={()=>toggles(1)}><i class='fa fa-file'></i> Text</a>
          <a class="dropdown-item" href="#" onClick={()=>toggles(2)}><i class="fa fa-file-pdf" ></i> Upload Document</a>
          <a class="dropdown-item" href="#" onClick={()=>toggles(3)}><i class='fa fa-file-image'></i> Upload Image</a>
          <a class="dropdown-item" href="#" onClick={()=>toggles(4)}><i class='fa fa-file-video'></i> Upload Video</a>
          <a class="dropdown-item" href="#" onClick={()=>toggles(5)}><i class='fa fa-file-audio'></i> Upload Audio</a>
          <a class="dropdown-item" href="#" onClick={()=>toggles(6)}><i class='fa fa-youtube'></i> Youtube link</a>
          <a class="dropdown-item" href="#" onClick={()=>toggles(7)}><i class='fa fa-link'></i> Links/Code</a>
          <a class="dropdown-item" href="#" onClick={()=>toggles(8)}><i class='fa fa-comment'></i> Discussion/Chat</a>
          <a class="dropdown-item" href="#" onClick={()=>toggles(9)}><i class='fa fa-question'></i> Questions only</a>    
        </div>
      </div>
     
      <Modal isOpen={modal} toggle={toggle} >
        <ModalHeader toggle={toggle}>{editName} Learning Material/Assessment</ModalHeader>
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
                     /><FormText class='muted'>Briefly title or describe the attachment</FormText>
                </Col>
            </FormGroup>
            {type === 1 ? 
           <FormGroup row>
           <Label for="link" sm={12}>Type in yur data (format appropriately) </Label>
           <Col sm={12}>
             <CKEditor
             data ={files}
             onChange={e=>setFiles(e.editor.getData())}
             />

           </Col>
       </FormGroup>
              : ''}

              {type === 2 || type === 3 ||type === 4 || type === 5  ? 
            <FormGroup row>
            <Label for="files" sm={12}>Upload </Label>
            <Col sm={12}>
            <div className="fileinput fileinput-new text-center" data-provides="fileinput">
                    <div className="fileinput-new thumbnail img-circle">
                      <i className={`fa ${props.coursematerials.isEditing ? 'fa-spinner' : pics[type]}`} style={{fontSize:200}} aria-hidden="true"></i>
                    </div>
                    <div className="fileinput-preview fileinput-exists thumbnail img-circle img-raised"></div>
                    <div >
                    <span className="btn btn-raised btn-round btn-default btn-file">
                    <span class="fileinput-new">Add</span>
	                  <span class="fileinput-exists">Change</span>
                    <input 
                    style={{width:100}}
                    type="file" 
                    name="files" 
                    id="files" 
                    defaultValue={files}
                    onChange={handleInputChange}
                     />
                    </span>
                       
                       
                    </div>
                </div>
            
            </Col>
        </FormGroup>
              : ''}
          {type === 6  ? 
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
                <FormText class='muted'>Websites, Document links, Google meet or Zoom code</FormText>
            </Col>
            
        </FormGroup>
              : ''}


            
        </Form>
        </ModalBody>
        <ModalFooter>
          <Button color={editColor} onClick={handleSubmit}>{editId ? 'Edit' : 'Submit'}</Button>{' '}
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