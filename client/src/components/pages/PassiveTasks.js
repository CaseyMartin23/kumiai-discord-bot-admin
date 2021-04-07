import React, { useState, useEffect } from "react";
import { message, Input, Button } from "antd";
import { deleteData, updateData, createRank } from "../../actions/data";

import { getData } from "../../api";
import { isEqual } from "lodash";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "../../styles/Dashboard.css";

const PassiveTasks = () => {
  const [passiveTasks, setPassiveTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const selectValue = "passive";

  // on select value change
  useEffect(() => {
    const getPassiveTasks = async () => {
      setLoading(true);
      try {
        const allPassiveTasks = await getData(selectValue);
        console.log("allPassiveTasks->", allPassiveTasks);
        if (!isEqual(allPassiveTasks, passiveTasks)) {
          setPassiveTasks(allPassiveTasks);
        }
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    getPassiveTasks();
  }, [passiveTasks]);

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setPassiveTasks((prevState) => ({ ...prevState, [name]: value }));
  // };

  // const updateHandler = (data) => {
  //   // select, type
  //   const { select, type } = data;
  //   const newVal = {};
  //   for (const [key, value] of Object.entries(passiveTasks)) {
  //     if (key.includes(`${select}-${type}`)) {
  //       var attribute = key.split("-")[2];
  //       newVal[attribute] = value;
  //       console.log("Value being sent to server for update " + newVal);
  //     }
  //   }
  //   // make update request
  //   updateData({ select, type, newVal });
  //   // updated message
  //   return message.success(`${selectValue} data updated.`);
  // };

  return (
    <>
      <div className="dashboard-content-wrapper">
        {(!passiveTasks && loading) ||
          (passiveTasks && loading && <p>loading...</p>)}{" "}
        {passiveTasks !== undefined && Array.isArray(passiveTasks) && !loading && (
          <>
            <h4>Discord bot passive tasks.</h4>
            {passiveTasks.map((passiveTask) => {
              return (
                <div className="user-item">
                  {passiveTask.name && (
                    <div>
                      {" "}
                      <p>Task Name: {passiveTask.name}</p>{" "}
                    </div>
                  )}
                  {passiveTask.description && (
                    <div>
                      {" "}
                      <p>Task Description: {passiveTask.description}</p>{" "}
                    </div>
                  )}
                </div>
              );
            })}
          </>
        )}
      </div>
    </>
  );
};

PassiveTasks.propTypes = {
  updateData: PropTypes.func.isRequired,
  deleteData: PropTypes.func.isRequired,
  createRank: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, {
  updateData,
  deleteData,
  createRank,
})(PassiveTasks);
