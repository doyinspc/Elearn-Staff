import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getSemester, registerSemester, updateSemester } from './../../actions/semester';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input,  Col } from 'reactstrap';

const Modals = (props) => {
  
  
  const [modal, setModal] = useState(false);
  const [id, setId] = useState(null);
  const [semester, setSemester] = useState(null);
  const [starts, setStarts] = useState(new Date('today'));
  const [ends, setEnds] = useState(new Date('today'));
  
  const toggle = () => setModal(!modal);
 
  
  useEffect(() => {
    if(parseInt(props.mid) > 0 )
    {
     setId(props.mid);
     setModal(!modal);
     populate(props.semesters.semester);
    }
    
},[props.mid, props.semesters.semester, modal]);

  const handleSubmit = (e) =>{
        e.preventDefault();
        let data = {semester, starts, ends, session:props.sid};
        props.registerSemester(data);
  }

  const handleEdit = (e) =>{
    e.preventDefault();
    let data = {semester, starts, ends};
    props.updateSemester(data, id);
}
  const populate = async(data) =>{
        setSemester(data.semester);
        setStarts(data.starts);
        setEnds(data.ends);
    }


  
  let editId = id ? id : null;
  let editName = id ? 'Edit' : 'Add';
  let editIcon = id ? 'fa-edit' : 'fa-plus';
  let editColor = id ? 'info' : 'primary';

  return (
    <div>
      
      <Button className="btn-sm" color={editColor} onClick={toggle}><i class={`fa ${editIcon}`}></i> {editName} Semester</Button>
      
      <Modal isOpen={modal} toggle={toggle} >
        <ModalHeader toggle={toggle}>{editName} Semester</ModalHeader>
        <ModalBody>
        <Form>
            <FormGroup row>
                <Label for="semester" sm={3}>Semester</Label>
                <Col sm={9}>
                <Input 
                    type="text" 
                    name="semester" 
                    id="semester"  
                    defaultValue={semester}
                    onChange={e=>setSemester(e.target.value)} 
                    placeholder="2019" />
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label for="start" sm={3}>Start Date</Label>
                <Col sm={9}>
                <Input 
                    type="date" 
                    name="start" 
                    id="start"  
                    defaultValue={starts} 
                    onChange={e=>setStarts(e.target.value)} 
                    />
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label for="end" sm={3}>End Date</Label>
                <Col sm={9}>
                <Input 
                    type="date" 
                    name="end" 
                    id="end" 
                    defaultValue={ends}
                    onChange={e=>setEnds(e.target.value)} 
                    />
                </Col>
            </FormGroup>
        </Form>
        </ModalBody>
        <ModalFooter>
          <Button color={editColor} onClick={editId ? handleEdit : handleSubmit}>{editId ? 'Edit' : 'Submit'}</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
const mapStateToProps = (state, ownProps) => ({ 
    semesters: state.semesterReducer
  })
  
export default connect(mapStateToProps, { getSemester, registerSemester, updateSemester })(Modals)
