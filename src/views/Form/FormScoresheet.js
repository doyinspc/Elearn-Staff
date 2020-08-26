import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { updateCoursescore, deleteCoursescore } from './../../actions/coursescore';
import RangeSlider from 'react-bootstrap-range-slider';
import { Row, Col, Container, Button, Badge } from 'reactstrap';
const Modals = (props) => {
  
  const [id, setId] = useState(null);
  const [fullname, setFullname] = useState('');
  const [value, setValue] = useState('');
  const [answer, setAnswer] = useState('');
  const [chat, setChat] = useState('');
  const [timer, setTimer] = useState(0);
  const [issubmit, setIssubmit] = useState(0);
  const [ismark, setIsmark] = useState(0);
  const [score, setScore] = useState(null);

  useEffect(() => {
    if(parseInt(props.mid) > 0 )
    {
     setId(props.data.id);
     let sc = props.data.score && props.data.score > 0 ? props.data.score * 100 : 0;
     setValue(Math.round(sc));
     setFullname(props.data.fullname);
     setChat(props.data.chat);
     setAnswer(props.data.answer);
     setTimer(props.data.timer);
     setScore(props.data.score);
     setIssubmit(parseInt(props.data.is_submitted))
     setIsmark(parseInt(props.data.is_marked));
    } 
},[props.mid, props.data.score]);



  
   const handleSubmit = () =>{
     let sc = value > 0 ? value /100 : 0;
      let fd = new FormData();
      fd.append('id', id);
      fd.append('chat', chat);
      fd.append('score', sc);
      fd.append('is_submitted', 1);
      fd.append('is_marked', 1);
      fd.append('table', 'course_scores');
      fd.append('cat', 'update')

      props.updateCoursescore(fd);
   }
   
  return (
   <>
   <Container>
            <Row xs='12'>
                <Col xs='12' style={{textTransform:'capitalize'}}>
                  <a role='button' aria-expanded='true' className='collapsed' aria-controls={`anz${props.data.id}`} href={`#anz${props.data.id}`} data-toggle='collapse'>{props.data.fullname}</a></Col>
            </Row>
            <Row xs='12' className='collapse' id={`anz${props.data.id}`}>
                <Col xs='12'>
                  <div style={{zIndex:-1}} dangerouslySetInnerHTML={{__html:props.data.answer}} />
                </Col>
            </Row>
            <Row xs='12'>
              <Col xs='12'>
                <RangeSlider
                    value={value}
                    onChange={changeEvent =>setValue(changeEvent.target.value)}
                    />
                </Col>
            </Row>
            <Row xs='12'>
              <Col xs='7'>
                <input 
                    type='text' 
                    name='chat'
                    className='form-control' 
                    placeholder='Comment...' 
                    value={chat == 'null'? '' : chat} 
                    onChange={(e)=>setChat(e.target.value)}
                    />
              </Col>
              <Col xs='2'>
                <Button size='sm' color={parseFloat(score) > 0 ? 'primary': 'secondary'}className='m-0' onClick={handleSubmit}>Save</Button>
              </Col>
              <Col xs='12' sm='2'>
              { ismark === 1 ? <div style={{zIndex:101, fontFamily: 'Shadows Into Light', fontStyle:'cursive', position:'relative', fontWeight:'bolder', color:'red', fontSize:'1.5em'}}>
                          {`${Number(score * props.maxscore).toFixed(1)}/${parseInt(props.maxscore)}`}
                    </div>: ''}
              </Col>
            </Row>
            <hr/>
            </Container>
   </>
  );
}
const mapStateToProps = (state, ownProps) => ({ 
    coursestudents: state.coursestudentReducer,
    coursescore: state.coursescoreReducer.coursescore
  })
  
export default connect(mapStateToProps, { updateCoursescore, deleteCoursescore })(Modals)
