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
  const [starts, setStarts] = useState(null);
  const [ends, setEnds] = useState(null);
  const [description, setDescription] = useState(null);
  const toggle = () => setModal(!modal);
  
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
            course_starts:starts, 
            course_ends:ends, 
            course_owner:owner
          };
          props.updateCourse(data, id);

        }else{
          let data = {
            course_name:name, 
            course_code:code, 
            course_description:description, 
            course_objective:objective, 
            course_start:starts, 
            course_end:ends, 
            course_owner:owner
          };;
          props.registerCourse(data);
        }
        
  }

  const populate = async(data) =>{
        setName(data.course_name);
        setCode(data.course_code);
        setObjective(data.course_objective);
        setDescription(data.course_description);
        setStarts(data.course_start);
        setEnds(data.course_end);
    }


  
  let editId = id ? id : null;
  let editName = 'Create';
  let editIcon = 'fa-plus';
  let editColor = 'primary';

  return (
    <div>
      
      <Button className="btn-sm" color={editColor} onClick={toggle}><i class={`fa ${editIcon}`}></i> {editName} Course</Button>
      
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
                    type="date" 
                    name="starts" 
                    id="starts"  
                    required
                    defaultValue={starts}
                    onChange={e=>setStarts(e.target.value)} 
                     />
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label for="ends" sm={3}>Course Ends </Label>
                <Col sm={9}>
                <Input 
                    type="date" 
                    name="ends" 
                    id="ends"  
                    required
                    defaultValue={ends}
                    onChange={e=>setEnds(e.target.value)} 
                     />
                </Col>
            </FormGroup>
            <FormGroup row>
              
                <Label for="code" sm={12}>Course Objective </Label>
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
                <Label for="code" sm={12}>Course Description </Label>
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
