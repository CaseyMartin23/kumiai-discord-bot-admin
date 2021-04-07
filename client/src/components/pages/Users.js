import React, { useState, useEffect } from "react";
import { message, Input, Button } from "antd";
import { deleteData, createRank } from "../../actions/data";

import { getData, updateData } from "../../api";
import { isEqual } from "lodash";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "../../styles/Dashboard.css";

const Users = () => {
  const [updatedUsers, setUpdatedUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const selectValue = "users";

  // on select value change
  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      try {
        const allUsers = await getData(selectValue);
        console.log("allUsers->", allUsers);
        if (!isEqual(allUsers, users)) {
          setUsers(allUsers);
          setUpdatedUsers(allUsers);
        }
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    getUsers();
  }, []);

  const handleChange = (e, id) => {
    let { name, value } = e.target;
    if ((name === "points" || name === "coins") && parseInt(value)) {
      value = parseInt(value);
    }

    const newUsers = updatedUsers.map((user) => {
      if (user._id === id) {
        return {
          ...user,
          [name]: value,
        };
      }
      return user;
    });

    console.log("newUsers->", newUsers);

    setUpdatedUsers(newUsers);
  };

  const updateHandler = async (data) => {
    // select, type
    try {
      const { select, id } = data;
      const [newVal] = updatedUsers.filter((user) => user._id === id);
      console.log("newVal->", newVal);

      // make update request
      await updateData({ select, id, newVal });
      // updated message
      message.success(`${selectValue} data updated.`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="dashboard-content-wrapper">
        {(!users && loading) || (users && loading && <p>loading...</p>)}{" "}
        {users !== undefined && Array.isArray(users) && !loading && (
          <>
            <h4>All the users logged within the community.</h4>
            {users.map((user, index) => {
              return (
                <div
                  key={`${user._id}-${index}-${user.name}`}
                  className="user-item"
                >
                  {user.discordId && (
                    <div>
                      {" "}
                      <p>Discord ID: {user.discordId} </p>{" "}
                    </div>
                  )}
                  {(user.points || user.points === 0) && (
                    <div>
                      {" "}
                      <p>User Points: </p>{" "}
                      <Input
                        placeholder="Points"
                        onChange={(e) => handleChange(e, user._id)}
                        value={
                          user.points !== updatedUsers[index].points
                            ? updatedUsers[index].points
                            : user.points
                        }
                        name="points"
                      />{" "}
                    </div>
                  )}
                  {(user.coins || user.coins === 0) && (
                    <div>
                      {" "}
                      <p>User coins: </p>{" "}
                      <Input
                        placeholder="Coins"
                        onChange={(e) => handleChange(e, user._id)}
                        value={
                          user.coins !== updatedUsers[index].coins
                            ? updatedUsers[index].coins
                            : user.coins
                        }
                        name="coins"
                      />{" "}
                    </div>
                  )}
                  <Button
                    type="primary"
                    onClick={() =>
                      updateHandler({
                        select: selectValue,
                        id: user._id,
                      })
                    }
                  >
                    Update
                  </Button>
                </div>
              );
            })}
          </>
        )}
      </div>
    </>
  );
};

Users.propTypes = {
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
})(Users);
