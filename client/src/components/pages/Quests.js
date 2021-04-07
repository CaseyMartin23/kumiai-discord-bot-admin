import React, { useState, useEffect } from "react";
import { message, Input, Button } from "antd";
import { deleteData, createRank } from "../../actions/data";

import { getData, updateData } from "../../api";
import { includes, isEqual } from "lodash";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "../../styles/Dashboard.css";

const Quests = () => {
  const [updatedQuests, setUpdatedQuests] = useState([]);
  const [quests, setQuests] = useState([]);
  const [loading, setLoading] = useState(false);
  const selectValue = "quests";

  // on select value change
  useEffect(() => {
    const getQuests = async () => {
      setLoading(true);
      try {
        const allQuests = await getData(selectValue);
        if (!isEqual(allQuests, quests)) {
          setQuests(allQuests);
          setUpdatedQuests(allQuests);
        }

        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.error(err);
      }
    };
    getQuests();
  }, [quests]);

  const handleChange = (e, id) => {
    const { name, value } = e.target;
    const newQuests = updatedQuests.map((quest) => {
      if (quest._id === id) {
        return {
          ...quest,
          [name]: value,
        };
      }
      return quest;
    });

    setUpdatedQuests(newQuests);
  };

  const updateHandler = async (data) => {
    // select, type
    try {
      const { select, id } = data;
      const [newVal] = updatedQuests.filter((quest) => quest._id === id);
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
        {(!quests && loading) || (quests && loading && <p>loading...</p>)}{" "}
        {quests !== undefined && Array.isArray(quests) && !loading && (
          <>
            <h4>To add or delete a quest, contact a developer.</h4>
            <div>
              {quests.map((quest, index) => {
                return (
                  <div
                    key={`${quest._id}-${index}-${quest.name}`}
                    className="quest-item"
                  >
                    {quest.type && (
                      <div>
                        {" "}
                        <p>Quest Type: {quest.type}</p>{" "}
                      </div>
                    )}
                    {quest.name && (
                      <div>
                        {" "}
                        <p>Quest Name: </p>{" "}
                        <Input
                          placeholder="Quest Name"
                          onChange={(e) => handleChange(e, quest._id)}
                          value={
                            quest.name !== updatedQuests[index].name
                              ? updatedQuests[index].name
                              : quest.name
                          }
                          name="name"
                        />{" "}
                      </div>
                    )}

                    {quest.channelId && (
                      <div>
                        {" "}
                        <p>Quest Channel ID: </p>{" "}
                        <Input
                          placeholder="Quest Channel ID"
                          onChange={(e) => handleChange(e, quest._id)}
                          value={
                            quest.channelId !== updatedQuests[index].channelId
                              ? updatedQuests[index].channelId
                              : quest.channelId
                          }
                          name="channelId"
                        />{" "}
                      </div>
                    )}
                    {quest.successCounter && (
                      <div>
                        {" "}
                        <p>Quest Success Counter: </p>{" "}
                        <Input
                          placeholder="Quest Success Counter"
                          onChange={(e) => handleChange(e, quest._id)}
                          value={
                            quest.successCounter !==
                            updatedQuests[index].successCounter
                              ? updatedQuests[index].successCounter
                              : quest.successCounter
                          }
                          name="successCounter"
                        />{" "}
                      </div>
                    )}
                    {quest.points && (
                      <div>
                        {" "}
                        <p>Quest Ai Points: </p>{" "}
                        <Input
                          placeholder="Quest Ai Points"
                          onChange={(e) => handleChange(e, quest._id)}
                          value={
                            quest.points !== updatedQuests[index].points
                              ? updatedQuests[index].points
                              : quest.points
                          }
                          name="points"
                        />{" "}
                      </div>
                    )}
                    <br />
                    <Button
                      type="primary"
                      onClick={() =>
                        updateHandler({
                          select: selectValue,
                          id: quest._id,
                        })
                      }
                    >
                      Update
                    </Button>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </>
  );
};

Quests.propTypes = {
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
})(Quests);
