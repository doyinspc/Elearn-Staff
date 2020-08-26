import React from 'react';
import { connect } from 'react-redux';
import { updateCoursescore, deleteCoursescore } from './../../actions/coursescore';
import { SERVER_URL, imgx } from "./../../actions/common.js";
import { Button, UncontrolledTooltip } from 'reactstrap';
const Modals = (props) => {
  
  const resetScore = (id) =>{
        let fd = new FormData();
        fd.append('score', null);
        fd.append('id', id);
        fd.append('cat', 'update');
        fd.append('timer', 'update');
        fd.append('is_submitted', 0);
        fd.append('is_marked', 0);
        fd.append('answer', JSON.stringify({}));
        fd.append('table', 'course_scores');
        props.updateCoursescore(fd);
  }
  
  const deleteScore = (id) =>{
        props.deleteCoursescore({'id':id});
   }
  return (
   <>
   <tr key={props.data.id}>
        <td className="text-left" style={{textTransform:"capitalize"}}>
        <img
                height='50px'
                width='50px'
                style={{margin:0, padding:0}}
                className="avatar border-gray"
                src={`${SERVER_URL + props.data.photo}`}
                onError={(e)=>{e.target.onerror = null; e.target.src=imgx}}
                />
            {props.data.username}{" "}{props.data.fullname}</td>
        <td>{props.data.score > -1 ? Math.round(props.data.score * 100) : 0}%</td>
        <td>
            <Button
                className="btn-round btn-icon btn-icon-mini btn-neutral"
                color="danger"
                id={`tooltipd${props.data.id}`}
                type="button"
                onClick={()=>resetScore(props.data.id)}
            >
                <i className="now-ui-icons location_compass-05" />
            </Button>
            <UncontrolledTooltip
                delay={0}
                target={`tooltipd${props.data.id}`}
            >
                Reset
            </UncontrolledTooltip>
            <Button
                className="btn-round btn-icon btn-icon-mini btn-neutral"
                color="danger"
                id={`tooltipd${props.data.id}`}
                type="button"
                onClick={()=>deleteScore(props.data.id)}
            >
                <i className="now-ui-icons ui-1_simple-remove" />
            </Button>
            <UncontrolledTooltip
                delay={0}
                target={`tooltipd${props.data.id}`}
            >
                Remove
            </UncontrolledTooltip>
        </td>
    </tr>
   </>
  );
}
const mapStateToProps = (state, ownProps) => ({ 
    coursestudents: state.coursestudentReducer
  })
  
export default connect(mapStateToProps, { updateCoursescore, deleteCoursescore })(Modals)
