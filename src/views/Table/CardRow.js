import React from "react";

class CardStat extends React.Component {
  render() {
      let user = this.props.data;
      if(user)
      {
            let ico = user
      }
      
    return (
      <>
        <li class="list-group-item">
            <div>
                <i class="fa fa-thumbs-o-up"></i> 
                    {` ${user.course_name}`}
                <span class="pull-right badge badge-primary">{user.nm ? user.nm : 0}</span>
            </div>
        </li>
      </>
    );
  }
}

export default CardStat;


