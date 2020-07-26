
import React from "react";
import { connect } from 'react-redux';
import { Link }  from 'react-router-dom';
// reactstrap components
import { Button } from "reactstrap";


class Level extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      id:null,
      st:false,
      pid:5
    }
  }
  
  componentDidMount(){
    //this.props.getLevels({pid:5});
  }

  loadModal = id =>{
    //this.props.getLevel(id);
    this.setState({st:true, id:id});
  }

  loadActive = (id, active) =>{
    let act = parseInt(active) === 0 ? 1 : 0;
    //this.props.updateLevel({'active': act}, id);
  }

  loadNext = id =>{
    //this.props.getLevel(id);
  }

  closer = id =>{
    //this.props.getLevel(id);
    this.setState({st:false, id:null});
  }

  render() {
      let {id, username, lastname, firstname, middlename, gender, phone, photo, email, title, is_active } = this.props.data || "";
      let fullname = lastname+" "+firstname+"  "+middlename;
      let key = this.props.key;
    return (
      <>
      <tr key={this.props.key} id={`row${id}`}>
            <td className="text-center">{username}</td>
            <td className="text-left">{fullname}</td>
            <td className="text-center">{gender}</td>
            <td className="text-center"><a>{phone}</a></td>
            <td className="text-center">{email}</td>
            <td className="text-right">
            <Link to={`/admin/department/${id}`}>
                <Button className="btn-icon" color="info" size="sm" key={`md${key}${id}`}  onClick={()=>this.loadNext(id)}>
                    <i className="fa fa-calendar"></i>
                </Button></Link>{` `}
                <Button className="btn-icon" color="success" size="sm" key={`mdx${key}${id}`}  mid={id}  onClick={()=>this.loadModal(id)} >
                    <i className="fa fa-edit"></i>
                </Button>{` `}
                <Button className="btn-icon" color= {parseInt(is_active) === 0 ? 'default' : 'danger'} size="sm" key={`mdy${key}${id}`}  onClick={()=>this.loadActive(id, is_active)}>
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