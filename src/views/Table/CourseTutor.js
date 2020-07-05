
import React from "react";

// reactstrap components
import {
  Label,
  Input,
  FormGroup,
  UncontrolledTooltip,
  Button,
  Media
} from "reactstrap";

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
            <td>
            <FormGroup check>
                <Label check>
                <Input defaultChecked type="checkbox" />
                <span className="form-check-sign" />
                </Label>
            </FormGroup>
            </td>
            <td className="text-left">
            <Media>
            <Media left top href="#">
                <Media object data-src="holder.js/64x64" alt="" />
            </Media>
            <Media body>
                <Media heading>
                      {`${this.props.data.title}  ${this.props.data.firstname} ${this.props.data.lastname} ${this.props.data.middlename}`}<small>{this.props.data.professional}</small>
                </Media>
                {this.props.data.description}
              </Media>
            </Media>
            </td>
            <td className="td-actions text-right">
            <Button
                className="btn-round btn-icon btn-icon-mini btn-neutral"
                color="info"
                id="tooltip731609871"
                type="button"
            >
                <i className="now-ui-icons ui-2_settings-90" />
            </Button>
            <UncontrolledTooltip
                delay={0}
                target="tooltip731609871"
            >
                Edit
            </UncontrolledTooltip>
            <Button
                className="btn-round btn-icon btn-icon-mini btn-neutral"
                color="danger"
                id="tooltip923217206"
                type="button"
            >
                <i className="now-ui-icons ui-1_simple-remove" />
            </Button>
            <UncontrolledTooltip
                delay={0}
                target="tooltip923217206"
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