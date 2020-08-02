
import React from "react";
import {Link} from "react-router-dom";
// reactstrap components
import {
  UncontrolledTooltip,
  Button,

} from "reactstrap";
import { SERVER_URL } from "actions/common";
const imgx = require("assets/img/place.png");

class Course extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      id:null,
      
    }
  }
  render() {
    let {id, username, lastname, firstname, middlename, gender, phone, photo, email, title, is_active } = this.props.data || "";
    let fullname = lastname+" "+firstname+"  "+middlename;
    let key = this.props.key;
    return (
      <>
      <tr key={this.props.key} id={`row${id}`}>
            <td className="text-center">
            <img
                height='50px'
                width='50px'
                id={`imgtooltip${this.props.data.cid}`}
                style={{margin:0, padding:0}}
                className="avatar border-gray"
                src={`${SERVER_URL + photo}`}
                onError={(e)=>{e.target.onerror = null; e.target.src=imgx}}
                />{" "}
              {username}</td>
             
            <td className="text-left" style={{textTransform:"capitalize"}}>{fullname}</td>
            <td className="text-center"><a href={`tel:${phone}`}>{phone}</a></td>
            <td className="text-center"><a href={`mailto:${email}`}>{email}</a></td>
            <td className="text-right">
            <div className="btn-group d-none d-md-flex">
            <Button 
                className="btn-round btn-icon btn-icon-mini btn-neutral" 
                color="info" 
                id={`tooltipprofile${this.props.data.cid}`}
                key={`md${key}${id}`}  
                onClick={this.props.loadUser}>
                    <i className="now-ui-icons users_single-02"></i>
                </Button>
                <UncontrolledTooltip
                delay={0}
                target={`tooltipprofile${this.props.data.cid}`}
            >
                profile
            </UncontrolledTooltip>
            <Button
                className="btn-round btn-icon btn-icon-mini btn-neutral"
                color="info"
                id={`tooltipp${this.props.data.cid}`}
                type="button"
                onClick={this.props.loadAssignment}
            >
                <i className="now-ui-icons design-2_ruler-pencil" />
            </Button>
            <UncontrolledTooltip
                delay={0}
                target={`tooltipp${this.props.data.cid}`}
            >
                Lesson content
            </UncontrolledTooltip>
                <button 
                class="btn btn-sm btn-icon btn-neutral btn-whatsapp btn-success"  
                onClick={this.props.loadWhatsapp}
                >
                    <i class="fab fa-whatsapp"></i>
                </button>
                <Button
                className="btn-round btn-icon btn-icon-mini btn-neutral"
                color="info"
                id={`tooltipc${this.props.data.cid}`}
                type="button"
                onClick={this.props.loadQuestion}
            >
                <i className="now-ui-icons ui-2_chat-round" />
            </Button>
            <UncontrolledTooltip
                delay={0}
                target={`tooltipc${this.props.data.cid}`}
            >
                Question
            </UncontrolledTooltip>
                
                
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
               
                <Button className="btn-round btn-icon btn-icon-mini btn-neutral" color= {parseInt(is_active) === 0 ? 'default' : 'danger'} size="sm" key={`mdy${key}${id}`}  onClick={()=>this.props.loadActive(id, is_active)}>
                      <i className="fa fa-times" />
                </Button>
                </div> 
                <div class="dropdown d-md-none">
                  <button class="btn btn-secondary dropdown-toggle btn-sm" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i class="fa fa-gear"></i>
                  </button>
                  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <a class="dropdown-item" href="#">Profile</a>
                    <a class="dropdown-item" href="#">Assignment</a>
                    <a class="dropdown-item" href="#">Whatsapp</a>
                    <a class="dropdown-item" href="#">Question Chat</a>
                    <a class="dropdown-item" href="#">Edit</a>
                    <a class="dropdown-item" href="#">Block/Unblock</a>
                    <a class="dropdown-item" href="#">Remove</a>
                  </div>
                </div>  
             </td>
          </tr>
          
      </>
    );
  }
}


export default Course