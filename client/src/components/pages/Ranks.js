import React, { useState, useEffect } from "react";
import { message, Input, Button, Modal } from "antd";
import { deleteData, createRank } from "../../actions/data";

import { getData, updateData } from "../../api";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { isEqual } from "lodash";
import "../../styles/Dashboard.css";

const Ranks = () => {
  const [newRankName, setNewRankName] = useState(undefined);
  const [newRankPoints, setNewRankPoints] = useState(undefined);
  const [newRankId, setNewRankId] = useState(undefined);
  const [rankId, setRankId] = useState(undefined);
  const [showDeleteRank, setShowDeleteRank] = useState(false);
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
        }

        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.error(err);
      }
    };
    getRanks();
  }, []);

  const handleChange = (e) => {
    const { name, value, id } = e.target;

    const currentRankId = id.split("-")[0];
    const updatedRanks = ranks.map((rank) => {
      if (rank._id === currentRankId) {
        return {
          ...rank,
          [name]: value,
        };
      }
      return rank;
    });

    setRanks(updatedRanks);
  };

  const updateHandler = async (data) => {
    // select, type
    try {
      const { select, id } = data;
      const [newVal] = ranks.filter((rank) => rank._id === id);
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
    if (!newRankName || !newRankPoints || !newRankId)
      return message.error("Please fill out all fields.");
    const data = {
      type: selectValue,
      rank: {
        rankName: newRankName,
        pointsRequired: newRankPoints,
        roleId: newRankId,
      },
    };
    createRank(data);
    setNewRankName(undefined);
    setNewRankPoints(undefined);
    setNewRankId(undefined);
    return message.success("Rank successfully created.");
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
                    placeholder="New Rank Points Required"
                    onChange={(e) => setNewRankPoints(e.target.value)}
                    value={newRankPoints}
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
                            id={`${rank._id}-${rank.rankName}`}
                            placeholder="Rank Name"
                            onChange={handleChange}
                            value={rank.rankName}
                            name="rankName"
                          />{" "}
                        </div>
                      )}
                      {(rank.pointsRequired || rank.pointsRequired === 0) && (
                        <div>
                          {" "}
                          <p>Points Needed: </p>{" "}
                          <Input
                            id={`${rank._id}-${rank.pointsRequired}`}
                            placeholder="Points Required"
                            onChange={handleChange}
                            value={rank.pointsRequired}
                            name="pointsRequired"
                          />{" "}
                        </div>
                      )}
                      {rank.roleId && (
                        <div>
                          {" "}
                          <p>Rank Role ID: </p>{" "}
                          <Input
                            id={`${rank._id}-${rank.roleId}`}
                            placeholder="Role ID"
                            onChange={handleChange}
                            value={rank.roleId}
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
