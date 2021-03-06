import React from "react";

class CardStat extends React.Component {
  render() {
      let user = this.props.data;
      
      
    return (
      <>
        <li class="list-group-item">
            <div>
                <i class="fa fa-thumbs-o-up"></i> 
                    {` ${user.course_name} ${user.levelname} ${user.departmentname}`}
                <span class="pull-right badge badge-primary">{user.score ? user.score : 0}</span>
            </div>
        </li>
      </>
    );
  }
}

export default CardStat;


