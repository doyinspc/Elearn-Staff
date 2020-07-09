import React from "react";

class CardStat extends React.Component {
  render() {
      
    return (
      <>
        <div class="card card-stats">    
            <div class="card-body ">
                <div class="statistics statistics-horizontal">
                    <div class="info info-horizontal">
                        <div class="row">
                            <div class="col-5">
                            <div class="icon icon-danger icon-circle">
                                <i class="now-ui-icons sport_user-run"></i>
                            </div>
                            </div>
                            <div class="col-7 text-right">
                            <h3 class="info-title">364</h3>
                            <h6 class="stats-title">Players</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr/>
            <div class="card-footer ">
                <div class="stats">
                        <i class="now-ui-icons ui-2_time-alarm"></i> In the last hour
                </div>
            </div>
        </div>
      </>
    );
  }
}

export default CardStat;


