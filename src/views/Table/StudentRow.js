
import React from "react";
import { connect } from 'react-redux';
import { Link }  from 'react-router-dom';
// reactstrap components
import { Button } from "reactstrap";
import { SERVER_URL } from "./../../actions/common.js"
const imgx = require("assets/img/place.png");

class Level extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      id:null,
      st:false
    }
  }
  
  componentDidMount(){
    
  }



  render() {
      let {id, username, lastname, firstname, middlename, gender, phone, photo, email, title, is_active } = this.props.data || "";
      let fullname = lastname+" "+firstname+"  "+middlename;
      let key = this.props.key;
    return (
      <>
      <tr key={this.props.key} id={`row${id}`}>
            <td className="text-center">
             
              {username}</td>
            <td className="text-left" style={{textTransform:"capitalize"}}>{fullname}</td>
            <td className="text-center" style={{textTransform:"capitalize"}}>{gender}</td>
            <td className="text-center"><a href={`tel:${phone}`}>{phone}</a></td>
            <td className="text-center"><a href={`mailto:${email}`}>{email}</a></td>
            <td className="text-right">
            <img
                height='50px'
                width='50px'
                style={{margin:0, padding:0}}
                className="avatar border-gray"
                src={`${SERVER_URL + photo}`}
                onError={(e)=>{e.target.onerror = null; e.target.src=imgx}}
                />
                <button class="btn btn-sm btn-icon btn-neutral btn-whatsapp"  onClick={()=>this.props.loadWhatsapp(id)}>
                    <i class="fab fa-whatsapp"></i>
                </button>
                <Link to={`/admin/student/${id}`}>
                <Button className="btn-icon" color="info" size="sm" key={`md${key}${id}`}  onClick={()=>this.props.loadUser(id)}>
                    <i className="fa fa-user"></i>
                </Button></Link>{` `}
                <Button className="btn-icon" color="success" size="sm" key={`mdx${key}${id}`}  mid={id}  onClick={()=>this.props.loadEdit(id)} >
                    <i className="fa fa-edit"></i>
                </Button>{` `}
                <Button className="btn-icon" color= {parseInt(is_active) === 0 ? 'default' : 'danger'} size="sm" key={`mdy${key}${id}`}  onClick={()=>this.props.loadActive(id, is_active)}>
                      <i className="fa fa-times" />
                </Button>
                
             </td>
          </tr>
      </>
    );
  }
}


const mapStateToProps = (state, ownProps) => ({ 
  levels: state.levelReducer
})

export default connect(mapStateToProps, { })(Level)