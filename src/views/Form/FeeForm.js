import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getFee, registerFee, updateFee } from './../../actions/fee';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';

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
     populate(props.fees.name);
    }
    
},[props.mid]);

  const handleSubmit = (e) =>{
        e.preventDefault();
        let data = {name, abbrv, pid:3};
        props.registerFee(data);
  }

  const handleEdit = (e) =>{
    e.preventDefault();
    let data = {name, abbrv};
    props.updateFee(data, id);
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
      
      <Button className="btn-sm" color={editColor} onClick={toggle}><i class={`fa ${editIcon}`}></i> {editName} Fee</Button>
      
      <Modal isOpen={modal} toggle={toggle} >
        <ModalHeader toggle={toggle}>{editName} Fee</ModalHeader>
        <ModalBody>
        <Form>
            <FormGroup row>
                <Label for="name" sm={3}>Fee</Label>
                <Col sm={9}>
                <Input 
                    type="text" 
                    name="name" 
                    id="name"  
                    defaultValue={name}
                    onChange={e=>setName(e.target.value)} 
                    placeholder="Tuitution" />
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label for="abbrv" sm={3}>Start Date</Label>
                <Col sm={9}>
                <Input 
                    type="text" 
                    name="abbrv" 
                    id="abbrv"  
                    defaultValue={abbrv} 
                    onChange={e=>setAbbrv(e.target.value)} 
                    placeholder="Tut." 
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
    fees: state.feeReducer
  })
  
export default connect(mapStateToProps, { getFee, registerFee, updateFee })(Modals)
