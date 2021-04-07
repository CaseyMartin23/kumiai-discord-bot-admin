import React, { useState, useEffect } from "react";
import { message, Input, Button } from "antd";
import { deleteData, createRank } from "../../actions/data";

import { getData, updateData } from "../../api";
import { isEqual } from "lodash";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "../../styles/Dashboard.css";

const Achievements = () => {
  const [updatedAchieves, setUpdatedAchieves] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(false);
  const selectValue = "achievements";

  // on select value change
  useEffect(() => {
    const getAchievements = async () => {
      setLoading(true);
      try {
        const allAchievements = await getData(selectValue);
        if (!isEqual(allAchievements, achievements)) {
          setAchievements(allAchievements);
          setUpdatedAchieves(allAchievements);
        }
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.error(err);
      }
    };
    getAchievements();
  }, [achievements]);

  const handleChange = (e, id) => {
    const { name, value } = e.target;
    const newAchievements = updatedAchieves.map((achievement) => {
      if (achievement._id === id) {
        return {
          ...achievement,
          [name]: value,
        };
      }
      return achievement;
    });

    setUpdatedAchieves(newAchievements);
  };

  const updateHandler = async (data) => {
    // select, type
    try {
      const { select, id } = data;
      const [newVal] = updatedAchieves.filter(
        (achievement) => achievement._id === id
      );
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
        {(!achievements && loading) ||
          (achievements && loading && <p>loading...</p>)}{" "}
        {achievements !== undefined && Array.isArray(achievements) && !loading && (
          <>
            <h4>To add or delete an achievement, contact a developer.</h4>
            {achievements.map((achievement, index) => {
              return (
                <div
                  key={`${achievement._id}-${index}-${achievement.name}`}
                  className="achievement-item"
                >
                  {achievement.type && (
                    <div>
                      {" "}
                      <p>Achievement Type: {achievement.type} </p>{" "}
                    </div>
                  )}
                  {achievement.name && (
                    <div>
                      {" "}
                      <p>Achievement Name: </p>{" "}
                      <Input
                        placeholder="Achievement Name"
                        onChange={(e) => handleChange(e, achievement._id)}
                        value={
                          achievement.name !== updatedAchieves[index].name
                            ? updatedAchieves[index].name
                            : achievement.name
                        }
                        name="name"
                      />{" "}
                    </div>
                  )}
                  {achievement.channelId && (
                    <div>
                      {" "}
                      <p>Achievement Channel ID: </p>{" "}
                      <Input
                        placeholder="Achievement Channel ID"
                        onChange={(e) => handleChange(e, achievement._id)}
                        value={
                          achievement.channelId !==
                          updatedAchieves[index].channelId
                            ? updatedAchieves[index].channelId
                            : achievement.channelId
                        }
                        name="channelId"
                      />{" "}
                    </div>
                  )}
                  {achievement.message && (
                    <div>
                      {" "}
                      <p>Achievement Message: </p>{" "}
                      <Input
                        placeholder="Achievement Message"
                        onChange={(e) => handleChange(e, achievement._id)}
                        value={
                          achievement.message !== updatedAchieves[index].message
                            ? updatedAchieves[index].message
                            : achievement.message
                        }
                        name="message"
                      />{" "}
                    </div>
                  )}
                  {achievement.points && (
                    <div>
                      {" "}
                      <p>Achievement Points: </p>{" "}
                      <Input
                        placeholder="Achievement Points"
                        onChange={(e) => handleChange(e, achievement._id)}
                        value={
                          achievement.points !== updatedAchieves[index].points
                            ? updatedAchieves[index].points
                            : achievement.points
                        }
                        name="points"
                      />{" "}
                    </div>
                  )}
                  <Button
                    className="update-controls"
                    type="primary"
                    onClick={() =>
                      updateHandler({
                        select: selectValue,
                        id: achievement._id,
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

Achievements.propTypes = {
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
})(Achievements);
