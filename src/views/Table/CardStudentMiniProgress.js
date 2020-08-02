import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Container, Table } from 'reactstrap';
import {getMaterials} from './../../actions/courseprogress';
import material from 'reducers/material';
import CardTableScore from './CardTableScore';
const Modals = (props) => {
  
  const [modal, setModal] = useState(props.st)
  const toggle = () => setModal(!modal);
  
  
  useEffect(() => {
    if(parseInt(props.mid) > 0 )
    {
     setModal(true);
    } 
},[props.mid]);

let resetdata = () =>{
    props.handleClose();
}
const loadMaterial = (id) =>{
  let gr = {};
  gr['moduleId'] = id;
  gr['studentId'] = props.studentId;
  
  props.getMaterials(gr);

}

let datas = props.courseprogresss.courseprogresss;
const arr=(data) =>{
  let modules = data.map((prop, index)=>{
    let ar = {};
    let arr = {};
    let arrr = {};

    arr['name'] = prop.coursemodule +" "+  prop.coursetitle;
    arr['cid'] = prop.cid;
    arr['title'] = prop.coursetitle;

    
    ar[prop.cid] = arr;
    return ar;
  })
  return modules;
}

let data = arr(datas);
let reg = data && Array.isArray(data) && data.length > 0 ? data.map((prop, index)=>{
  let k = Object.keys(prop);
  let d = Object.values(prop);
  let d1 = d.map((prop1, index1)=>{
   return( 
    <div class="card" key={index1}>
        <div class="card-header my-1" id={`headingOne${prop1.cid}`}>
            <h6 class="title m-0 py-1">
            <button 
              type="button" 
              class="btn btn-link my-0 py-1"  
              data-toggle="collapse" 
              data-target={`#collapseOne${prop1.cid}`}
              onClick={()=>{loadMaterial(prop1.cid)}}
              >
              {prop1.name}
            </button>
            </h6>
        </div>
        <div id={`collapseOne${prop1.cid}`} class="collapse" aria-labelledby={`headingOne${prop1.cid}`} data-parent="#myAccordion">
            <div class="card-body">
             
            </div>
        </div>
    </div>)})
 return d1;
}):null;

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle} >
            <ModalHeader toggle={resetdata}>Student Data</ModalHeader>
        <ModalBody>
          <div class="accordion" id="myAccordion">
            {reg}
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={resetdata}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
const mapStateToProps = (state, ownProps) => ({ 
    courseprogresss: state.courseprogressReducer
  })
  
export default connect(mapStateToProps, { getMaterials })(Modals)