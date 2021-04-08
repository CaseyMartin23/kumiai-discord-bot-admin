import React from "react";
import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import {
  getData,
  deleteData,
  updateData,
  createRank,
} from "../../actions/data";
import Ranks from "../pages/Ranks";
import Quests from "../pages/Quests";
import Achievements from "../pages/Achievements";
import Users from "../pages/Users";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "../../styles/Dashboard.css";

const Dashboard = () => {
  const { url } = useRouteMatch();

  return (
    <>
      <Redirect from={url} to={`${url}/ranks`} />
      <Switch>
        <Route path={`${url}/ranks`} component={Ranks} />
        <Route path={`${url}/quests`} component={Quests} />
        <Route path={`${url}/achievements`} component={Achievements} />
        <Route path={`${url}/users`} component={Users} />
      </Switch>
    </>
  );
};

Dashboard.propTypes = {
  getData: PropTypes.func.isRequired,
  updateData: PropTypes.func.isRequired,
  deleteData: PropTypes.func.isRequired,
  createRank: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, {
  getData,
  updateData,
  deleteData,
  createRank,
})(Dashboard);
