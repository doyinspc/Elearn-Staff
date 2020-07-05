import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import CKEditor from 'ckeditor4-react';
import { getCoursematerial, registerCoursematerial, updateCoursematerial } from './../../actions/coursematerial';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Col,  FormText } from 'reactstrap';

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
        setType(data.types);
    }

    const handleInputChange = (evt) => {
      setFiles(evt.target.files[0]);
    }

   
  
  let editId = id ? id : null;
  let editName = 'Add';
  let editIcon = 'fa-plus';
  let editColor = 'primary';

  return (
    <div>
      <div class="dropup">
        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <i class="fa fa-plus"></i> Add Assessment
        </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <a class="dropdown-item" href="#" onClick={()=>toggles(1)}><i class='fa fa-question'></i> Multichoice</a>
          <a class="dropdown-item" href="#" onClick={()=>toggles(2)}><i class="fa fa-question"></i> Fill-in-the-blanks</a>
          <a class="dropdown-item" href="#" onClick={()=>toggles(3)}><i class='fa fa-question'></i> Question</a>
        </div>
      </div>
      <Modal isOpen={modal} toggle={toggle} >
        <ModalHeader toggle={toggle}>{editName} Assessment</ModalHeader>
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
                     /><FormText class='muted'>Briefly tile or describe the attachment</FormText>
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
            <Label for="files" sm={3}>Link/Code </Label>
            <Col sm={9}>
            <Input 
                type="file" 
                name="files" 
                id="files" 
                defaultValue={files}
                onChange={handleInputChange} 
                placeholder="" />
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
  
export default connect(mapStateToProps, { getCoursematerial, registerCoursematerial, updateCoursematerial })(Modals)
