import React, { useState, useEffect } from "react";
import { message, Input, Button, Modal } from "antd";

import { createRank, deleteData, getData, updateData } from "../../api";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { isEqual } from "lodash";
import "../../styles/Dashboard.css";

const Ranks = () => {
  const [newRankName, setNewRankName] = useState(undefined);
  const [newRankMaxPoints, setNewRankMaxPoints] = useState(undefined);
  const [newRankMinPoints, setNewRankMinPoints] = useState(undefined);
  const [newRankId, setNewRankId] = useState(undefined);
  const [rankId, setRankId] = useState(undefined);
  const [showDeleteRank, setShowDeleteRank] = useState(false);
  const [updatedRanks, setUpdatedRanks] = useState([]);
  const [ranks, setRanks] = useState([]);
  const [loading, setLoading] = useState(false);
  const selectValue = "ranks";

  // on select value change
  useEffect(() => {
    const getRanks = async () => {
      setLoading(true);
      try {
        const allRanks = await getData(selectValue);
        if (!isEqual(allRanks, ranks)) {
          setRanks(allRanks);
          setUpdatedRanks(allRanks);
        }

        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.error(err);
      }
    };
    getRanks();
  }, [ranks]);

  const handleChange = (e, id) => {
    let { name, value } = e.target;

    if (
      (name === "pointsRequired" || name === "maxPoints") &&
      parseInt(value)
    ) {
      value = parseInt(value);
    }

    const newRanks = updatedRanks.map((rank) => {
      if (rank._id === id) {
        return {
          ...rank,
          [name]: value,
        };
      }
      return rank;
    });

    setUpdatedRanks(newRanks);
  };

  const updateHandler = async (data) => {
    // select, type
    try {
      const { select, id } = data;
      const [newVal] = updatedRanks.filter((rank) => rank._id === id);
      console.log("newVal->", newVal);

      // make update request
      await updateData({ select, id, newVal });
      // updated message
      message.success(`${selectValue} data updated.`);
    } catch (err) {
      console.error(err);
    }
  };

  const submitRank = () => {
    if (!newRankName || !newRankMinPoints || !newRankMaxPoints || !newRankId)
      return message.error("Please fill out all fields.");
    const data = {
      type: selectValue,
      rank: {
        rankName: newRankName,
        pointsRequired: newRankMinPoints,
        maxPoints: newRankMaxPoints,
        roleId: newRankId,
      },
    };
    createRank(data);
    setNewRankName(undefined);
    setNewRankMinPoints(undefined);
    setNewRankMaxPoints(undefined);
    setNewRankId(undefined);
    message.success("Rank successfully created.");
    setRanks([]);
  };

  const handleShowDeleteModal = (id) => {
    setRankId(id);
    setShowDeleteRank(true);
  };

  const handleHideDeleteModal = () => {
    setShowDeleteRank(false);
  };

  const handleOkDeleteModal = () => {
    deleteData({ type: selectValue, id: rankId });
    setShowDeleteRank(false);
    setRanks([]);
    return message.success("Rank has been deleted.");
  };
  return (
    <>
      <div className="dashboard-content-wrapper">
        {(!ranks && loading) || (ranks && loading && <p>loading...</p>)}{" "}
        {ranks !== undefined && Array.isArray(ranks) && !loading && (
          <>
            {selectValue === "ranks" && (
              <>
                <h3>All of the ranks available within the community.</h3>

                <div className="create-rank-container">
                  <h4>Create a rank</h4>
                  <Input
                    placeholder="New Rank Name"
                    onChange={(e) => setNewRankName(e.target.value)}
                    value={newRankName}
                  />
                  <Input
                    placeholder="New Rank Minimun Points Required"
                    onChange={(e) => setNewRankMinPoints(e.target.value)}
                    value={newRankMinPoints}
                  />
                  <Input
                    placeholder="New Rank Maximum Points Required"
                    onChange={(e) => setNewRankMaxPoints(e.target.value)}
                    value={newRankMaxPoints}
                  />
                  <Input
                    placeholder="New Rank Role ID"
                    onChange={(e) => setNewRankId(e.target.value)}
                    value={newRankId}
                  />
                  <Button type="primary" onClick={() => submitRank()}>
                    Create
                  </Button>
                </div>

                {ranks.map((rank, index) => {
                  return (
                    <div
                      key={`${rank._id}-${index}-${rank.rankName}`}
                      className="rank-item"
                    >
                      {rank.rankName && (
                        <div>
                          {" "}
                          <p>Rank Name: </p>{" "}
                          <Input
                            placeholder="Rank Name"
                            onChange={(e) => handleChange(e, rank._id)}
                            value={
                              rank.rankName !== updatedRanks[index].rankName
                                ? updatedRanks[index].rankName
                                : rank.rankName
                            }
                            name="rankName"
                          />{" "}
                        </div>
                      )}
                      {(rank.pointsRequired || rank.pointsRequired === 0) && (
                        <div>
                          {" "}
                          <p>Minimum Points Needed: </p>{" "}
                          <Input
                            placeholder="Minimun Points Required"
                            onChange={(e) => handleChange(e, rank._id)}
                            value={
                              rank.pointsRequired !==
                              updatedRanks[index].pointsRequired
                                ? updatedRanks[index].pointsRequired
                                : rank.pointsRequired
                            }
                            name="pointsRequired"
                          />{" "}
                        </div>
                      )}
                      {(rank.maxPoints || rank.maxPoints === 0) && (
                        <div>
                          {" "}
                          <p>Maximum Points Needed: </p>{" "}
                          <Input
                            placeholder="Maximum Points Required"
                            onChange={(e) => handleChange(e, rank._id)}
                            value={
                              rank.maxPoints !== updatedRanks[index].maxPoints
                                ? updatedRanks[index].maxPoints
                                : rank.maxPoints
                            }
                            name="maxPoints"
                          />{" "}
                        </div>
                      )}
                      {rank.roleId && (
                        <div>
                          {" "}
                          <p>Rank Role ID: </p>{" "}
                          <Input
                            placeholder="Role ID"
                            onChange={(e) => handleChange(e, rank._id)}
                            value={
                              rank.roleId !== updatedRanks[index].roleId
                                ? updatedRanks[index].roleId
                                : rank.roleId
                            }
                            name="roleId"
                          />{" "}
                        </div>
                      )}
                      <br />
                      <Button
                        type="primary"
                        danger
                        onClick={() => handleShowDeleteModal(rank._id)}
                        className="ant-delete-button"
                      >
                        Delete
                      </Button>
                      <Button
                        type="primary"
                        onClick={() =>
                          updateHandler({
                            select: selectValue,
                            id: rank._id,
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
            <Modal
              title="Delete rank"
              visible={showDeleteRank}
              onOk={handleOkDeleteModal}
              onCancel={handleHideDeleteModal}
              okText="Yes"
              cancelText="No"
            >
              Are you sure you'd like to delete this rank?
            </Modal>
          </>
        )}
        {!ranks && !loading && (
          <p>There's no ranks currently. Please create a new rank</p>
        )}
      </div>
    </>
  );
};

Ranks.propTypes = {
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
})(Ranks);
