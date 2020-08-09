import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { updateCoursescore, deleteCoursescore } from './../../actions/coursescore';
import RangeSlider from 'react-bootstrap-range-slider';
import { Row, Col } from 'reactstrap';
const Modals = (props) => {
  
  const resetScore = (id) =>{
        props.updateCoursescore({'score':0, 'answer':{}}, id);
  }
  
  const deleteScore = (id) =>{
        props.deleteCoursescore(id);
   }
  return (
   <>
   
   <Row key={ind} xs='12'>
            <Row xs='12'>
                <Col>
                </Col>
                {prop.fullname}
            </Row>
            <Row><div dangerouslySetInnerHTML={prop.answer}></div></Row>
            <Row>
                <RangeSlider
                    value={value}
                    onChange={changeEvent =>setValue(changeEvent.target.value)}
                    />
            </Row>
            <Row>
                <input 
                    type='text' 
                    className='form-control' 
                    placeholder='Comment...' 
                    value='' 
                    onChange
                    />
            </Row>
            <hr/>
           </Row>
   </>
  );
}
const mapStateToProps = (state, ownProps) => ({ 
    coursestudents: state.coursestudentReducer
  })
  
export default connect(mapStateToProps, { updateCoursescore, deleteCoursescore })(Modals)
