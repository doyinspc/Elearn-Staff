
import React from "react";
// reactstrap components
import {
  UncontrolledTooltip,
  Button,

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
    let {id, username, lastname, firstname, middlename, gender, phone, photo, email, title, is_active } = this.props.data || "";
    let fullname = lastname+" "+firstname+"  "+middlename;
    let key = this.props.key;
    let pnum = '234'+phone.substring(phone.length -10);
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
                Report
            </UncontrolledTooltip>
                <a
                className="btn btn-sm btn-icon btn-neutral btn-whatsapp btn-success my-1 py-1"  
                href={`https://wa.me/${pnum}?text=Hello%20${encodeURI(fullname)}`}
                target='_blank'
                >
                    <i className="fab fa-whatsapp"></i>
                </a>
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
                
                
            {parseInt(this.props.data.sis_active) === 0 ? <><Button
                className="btn-round btn-icon btn-icon-mini btn-neutral"
                color="info"
                id={`tooltipe${this.props.data.cid}`}
                type="button"
                onClick={()=>this.props.handleActive(1)}
            >
                <i className="now-ui-icons ui-2_settings-90" />
            </Button>
            <UncontrolledTooltip
                delay={0}
                target={`tooltipe${this.props.data.cid}`}
            >
                Block
            </UncontrolledTooltip></>:<><Button
            className="btn-round btn-icon btn-icon-mini btn-neutral"
            color="danger"
            id={`tooltipe${this.props.data.cid}`}
            type="button"
            onClick={()=>this.props.handleActive(0)}
        >
            <i className="now-ui-icons ui-2_settings-90" />
        </Button>
        <UncontrolledTooltip
            delay={0}
            target={`tooltipe${this.props.data.cid}`}
        >
            Unblock
        </UncontrolledTooltip>

             </>  }
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
             
                </div> 
                <div className="dropdown d-md-none">
                  <button className="btn btn-secondary dropdown-toggle btn-sm" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i className="fa fa-gear"></i>
                  </button>
                  <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <a className="dropdown-item" href="#" onClick={this.props.loadUser} ><i className="now-ui-icons users_single-02"></i> Profile</a>
                    <a className="dropdown-item" href="#" onClick={this.props.loadAssignment}><i className="now-ui-icons design-2_ruler-pencil" /> Assignment</a>
                    <a className="dropdown-item" href="#" href={`https://wa.me/${pnum}?text=Hello%20${encodeURI(fullname)}`}
                target='_blank'><i style={{fontSize:'1.8em'}} className="fab fa-whatsapp text-success"></i> Whatsapp</a>
                    <a className="dropdown-item" href="#" onClick={this.props.loadQuestion}><i className="now-ui-icons ui-2_chat-round" /> Question/Chat</a>
                    { this.props.data.sis_active === 0 ?
                    <a className="dropdown-item" href="#" onClick={()=>this.props.handleActive(1)}><i className="now-ui-icons ui-2_settings-90 text-info" /> Block</a>:
                    <a className="dropdown-item" href="#" onClick={()=>this.props.handleActive(0)}><i className="now-ui-icons ui-2_settings-90 text-danger" /> Unblock</a>
                    }
                    <a className="dropdown-item" href="#"  onClick={this.props.handleDelete} ><i className="now-ui-icons ui-1_simple-remove" /> Remove</a>
                  </div>
                </div>  
             </td>
          </tr>
          
      </>
    );
  }
}


export default Course