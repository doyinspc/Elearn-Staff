import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {getMaterials} from './../../actions/courseprogress';
const Modals = (props) => {
 
  
  useEffect(() => {
    let gr = {};
        gr['moduleId'] = props.moduleId;
        gr['studentId'] = props.studentId;
        props.getMaterials(gr);
    });


let tbds=(mat)=>{
        let material = mat[0];
        let scores = mat[1];
        return material;
}

let mater = props.courseprogresss.materials;
let material = tbds(mater);
  return (
    <>
        {material && Array.isArray(material) ? material.map((pr, ind)=>(
            
                <tr key={ind}>
                <td>{pr.material}</td>
                <td>MC</td>
                <td>FITB</td>
                <td>ESSAY</td>
                <td>SCORE</td>
                </tr> 
            
          ) ):null}
    </>
  );
}
const mapStateToProps = (state, ownProps) => ({ 
    courseprogresss: state.courseprogressReducer
  })
  
export default connect(mapStateToProps, { getMaterials })(Modals)