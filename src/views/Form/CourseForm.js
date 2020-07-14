import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import CKEditor from 'ckeditor4-react';
import { getCourse, registerCourse, updateCourse } from './../../actions/course';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, FormText, Label, Input, Col } from 'reactstrap';

const Modals = (props) => {
  
  const [modal, setModal] = useState(false);
  const [id, setId] = useState(null);
  const [name, setName] = useState(null);
  const [code, setCode] = useState(null);
  const [objective, setObjective] = useState(null);
  const [owner, setOwner] = useState(1);
  const [starts, setStarts] = useState(new Date());
  const [ends, setEnds] = useState(new Date());
  const [description, setDescription] = useState(null);
  const toggle = () => setModal(!modal);
  const tog = () =>{
    if(id && id > 0)
    {

    }else{
      toggle();
    }
    
  }
  
  useEffect(() => {
    if(parseInt(props.mid) > 0 )
    {
     setId(props.mid);
     setModal(!modal);
     populate(props.courses.course);
    }
    
},[props.mid]);

  const handleSubmit = (e) =>{
        e.preventDefault();
        if(id && id > 0)
        {
          let data = {
            course_name:name, 
            course_code:code, 
            course_description:description, 
            course_objective:objective, 
            course_start:new Date(starts).getTime(), 
            course_end:new Date(ends).getTime()
          };
          props.updateCourse(data, id);
          toggle();
        }else{
          let data = {
            course_name:name, 
            course_code:code, 
            course_description:description, 
            course_objective:objective, 
            course_start:new Date(starts).getTime(), 
            course_end:new Date(ends).getTime(), 
            course_owner:owner
          };;
          props.registerCourse(data);
          toggle();
        }
        
  }

  const populate = async(data) =>{
    
        setName(data.course_name);
        setCode(data.course_code);
        setObjective(data.course_objective);
        setDescription(data.course_description);
        setStarts(data.course_start  !== null ? new Date(parseInt(data.course_start)).toISOString().substring(0, 19):'-' );
        setEnds(data.course_end  !== null ? new Date(parseInt(data.course_end)).toISOString().substring(0, 19):'-' );
        console.log(new Date(parseInt(data.course_start)).toISOString().substring(0, 19));
    }


  
  let editId = id ? id : null;
  let editName = 'Create';
  let editIcon = 'fa-plus';
  let editColor = 'primary';
  let editCss = 'btn-sm';

  return (
    <div>
      
      <Button className={editCss} color={editColor} onClick={tog}><i className={`fa ${editIcon}`}></i> Add Course </Button>
      <Modal isOpen={modal} toggle={toggle} >
        <ModalHeader toggle={toggle}>{editName} Course</ModalHeader>
        <ModalBody>
        <Form>
            <FormGroup row>
                <Label for="name" sm={3}>Name </Label>
                <Col sm={9}>
                <Input 
                    type="text" 
                    name="name" 
                    id="name"  
                    required
                    defaultValue={name}
                    onChange={e=>setName(e.target.value)} 
                    placeholder="Physics" />
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label for="code" sm={3}>Course Code </Label>
                <Col sm={9}>
                <Input 
                    type="text" 
                    name="code" 
                    id="code"  
                    required
                    defaultValue={code}
                    onChange={e=>setCode(e.target.value)} 
                    placeholder="PHY123" />
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label for="starts" sm={3}>Course Starts </Label>
                <Col sm={9}>
                <Input 
                    type="datetime-local" 
                    name="starts" 
                    id="starts"
                    value={starts}
                    defaultValue={starts}
                    onChange={e=>setStarts(e.target.value)} 
                     />
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label for="ends" sm={3}>Course Ends </Label>
                <Col sm={9}>
                <Input 
                    type="datetime-local" 
                    name="ends" 
                    id="ends"
                    value={ends}
                    defaultValue={ends}
                    onChange={e=>setEnds(e.target.value)} 
                     />
                </Col>
            </FormGroup>
            <FormGroup row>
              
                <Label for="objective" sm={12}>Course Objective </Label>
                <Col sm={12}>
                <Input 
                    type="textarea" 
                    name="objective" 
                    id="objective"  
                    required
                    defaultValue={objective}
                    
                    onChange={e=>setObjective(e.target.value)} 
                     />
                
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label for="description" sm={12}>Course Description </Label>
                <Col sm={12}>
                <Input 
                    type="textarea" 
                    name="description" 
                    id="description"  
                    required
                    
                    defaultValue={description}
                    onChange={e=>setDescription(e.target.value)} 
                     />
                </Col>
            </FormGroup>
            
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
    courses: state.courseReducer
  })
  
export default connect(mapStateToProps, { getCourse, registerCourse, updateCourse })(Modals)
