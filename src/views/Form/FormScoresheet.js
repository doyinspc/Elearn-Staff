import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { updateCoursescore, deleteCoursescore } from './../../actions/coursescore';
import RangeSlider from 'react-bootstrap-range-slider';
import { Row, Col } from 'reactstrap';
const Modals = (props) => {
  
  const [id, setId] = useState(null);
  const [fullname, setFullname] = useState('');
  const [value, setValue] = useState('');
  const [answer, setAnswer] = useState('');
  const [chat, setChat] = useState('');

  useEffect(() => {
    if(parseInt(props.mid) > 0 )
    {
     setId(props.mid);
     
    } 
},[props.mid]);

  const resetScore = (id) =>{
        props.updateCoursescore({'score':0, 'answer':{}}, id);
  }
  
  const deleteScore = (id) =>{
        props.deleteCoursescore(id);
   }

   
  return (
   <>
   <Row xs='12'>
            <Row xs='12'>
                <Col>
                </Col>
                {fullname}
            </Row>
            <Row><div dangerouslySetInnerHTML={answer}></div></Row>
            <Row>
                <RangeSlider
                    value={value}
                    onChange={changeEvent =>setValue(changeEvent.target.value)}
                    />
            </Row>
            <Row>
                <input 
                    type='text' 
                    name='chat'
                    className='form-control' 
                    placeholder='Comment...' 
                    value={chat} 
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
