import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getProgramme, registerProgramme, updateProgramme } from './../../actions/programme';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Col } from 'reactstrap';

const Modals = (props) => {
  
  const [modal, setModal] = useState(false);
  const [id, setId] = useState(null);
  const [name, setName] = useState(null);
  const [abbrv, setAbbrv] = useState(null);
  
  const toggle = () => setModal(!modal);
  
  useEffect(() => {
    if(parseInt(props.mid) > 0 )
    {
     setId(props.mid);
     setModal(!modal);
     populate(props.programmes.programme);
    }
    
},[props.mid]);

  const handleSubmit = (e) =>{
        e.preventDefault();
        if(id && id > 0)
        {
          let data = {name, abbrv};
          props.updateProgramme(data, id);

        }else{
          let data = {name, abbrv, pid:6};
          props.registerProgramme(data);
        }
        
  }

  const populate = async(data) =>{
        setName(data.name);
        setAbbrv(data.abbrv);
    }


  
  let editId = id ? id : null;
  let editName = 'Create';
  let editIcon = 'fa-plus';
  let editColor = 'primary';

  return (
    <div>
      
      <Button className="btn-sm" color={editColor} onClick={toggle}><i class={`fa ${editIcon}`}></i> {editName} Programme</Button>
      
      <Modal isOpen={modal} toggle={toggle} >
        <ModalHeader toggle={toggle}>{editName} Programme</ModalHeader>
        <ModalBody>
        <Form>
            <FormGroup row>
                <Label for="name" sm={3}>Programme</Label>
                <Col sm={9}>
                <Input 
                    type="text" 
                    name="name" 
                    id="name"  
                    defaultValue={name}
                    onChange={e=>setName(e.target.value)} 
                    placeholder="Education" />
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label for="abbrv" sm={3}>Abbrv.</Label>
                <Col sm={9}>
                <Input 
                    type="text" 
                    name="abbrv" 
                    id="abbrv"  
                    defaultValue={abbrv} 
                    onChange={e=>setAbbrv(e.target.value)}
                    placeholder="SOE" 
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
    programmes: state.programmeReducer
  })
  
export default connect(mapStateToProps, { getProgramme, registerProgramme, updateProgramme })(Modals)
