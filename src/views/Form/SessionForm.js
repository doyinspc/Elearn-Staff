import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getSession, registerSession, updateSession } from './../../actions/session';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Col } from 'reactstrap';

const Modals = (props) => {
  
  
  const [modal, setModal] = useState(false);
  const [id, setId] = useState(null);
  const [session, setSession] = useState(null);
  const [starts, setStarts] = useState(new Date());
  const [ends, setEnds] = useState(new Date());
  
  const toggle = () => setModal(!modal);
  console.log(props.mid);
  
  useEffect(() => {
    if(parseInt(props.mid) > 0 )
    {
     setId(props.mid);
     setModal(!modal);
     populate(props.sessions.session);
    }
    
},[props.mid]);

  const handleSubmit = (e) =>{
        e.preventDefault();
        let data = {session, starts, ends};
        props.registerSession(data);
  }

  const handleEdit = (e) =>{
    e.preventDefault();
    let data = {session, starts, ends};
    props.updateSession(data, id);
}
  const populate = async(data) =>{
        setSession(data.session);
        setStarts(data.starts);
        setEnds(data.ends);
    }


  
  let editId = id ? id : null;
  let editName = id ? 'Edit' : 'Add';
  let editIcon = id ? 'fa-edit' : 'fa-plus';
  let editColor = id ? 'info' : 'primary';

  return (
    <div>
      
      <Button className="btn-sm" color={editColor} onClick={toggle}><i class={`fa ${editIcon}`}></i> {editName} Session</Button>
      
      <Modal isOpen={modal} toggle={toggle} >
        <ModalHeader toggle={toggle}>{editName} Session</ModalHeader>
        <ModalBody>
        <Form>
            <FormGroup row>
                <Label for="session" sm={3}>Session</Label>
                <Col sm={9}>
                <Input 
                    type="text" 
                    name="session" 
                    id="session"  
                    defaultValue={session}
                    onChange={e=>setSession(e.target.value)} 
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
    sessions: state.sessionReducer
  })
  
export default connect(mapStateToProps, { getSession, registerSession, updateSession })(Modals)
