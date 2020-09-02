
import React from "react";

// reactstrap components
import {
  UncontrolledTooltip,
  Button
} from "reactstrap";
import { SERVER_URL, imgx } from "actions/common";

class Course extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      id:null,
      
    }
  }
  render() {
     
    return (
      <>
         <tr>
            <td width="100px">
              <img 
                src={SERVER_URL + this.props.data.photo}
                height="100px"
                width="90px"
                onError={(e)=>{e.target.onerror = null; e.target.src=imgx}}
                />
            </td>
            <td className="text-left">
              <h4>{`${this.props.data.title} ${this.props.data.lastname} ${this.props.data.firstname}  ${this.props.data.middlename}`}<small>{this.props.data.professional}</small></h4>
              <p className="h6">{this.props.data.position}</p>
              <p className="subtitle">{this.props.data.descriptions}</p>
            </td>
            <td className="td-actions text-right">
            <Button
                className="btn-round btn-icon btn-icon-mini btn-neutral"
                color="info"
                id={`tooltipe${this.props.data.cid}`}
                type="button"
                onClick={this.props.handleEdit}
            >
                <i className="now-ui-icons ui-2_settings-90" />
            </Button>
            <UncontrolledTooltip
                delay={0}
                target={`tooltipe${this.props.data.cid}`}
            >
                Edit
            </UncontrolledTooltip>
            <Button
                className="btn-round btn-icon btn-icon-mini btn-neutral"
                color="danger"
                id={`tooltipd${this.props.data.cid}`}
                type="button"
                onClick={this.props.handleDelete}
            >
                <i className="now-ui-icons ui-1_simple-remove" />
            </Button>
            <UncontrolledTooltip
                delay={0}
                target={`tooltipd${this.props.data.cid}`}
            >
                Remove
            </UncontrolledTooltip>
            </td>
        </tr>
      </>
    );
  }
}


export default Course