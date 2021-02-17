import React, { useState, useEffect } from 'react';
import { Select, message, Input, Button, Modal } from 'antd';
import { getData, deleteData, updateData, createRank } from '../../actions/data';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import '../../styles/Dashboard.css'

message.config({ maxCount: 1 });

const Dashboard = ({ getData, updateData, deleteData, data: { data, loading }, createRank }) => {
  const { Option } = Select;

  const [newRankName, setNewRankName] = useState(undefined);
  const [newRankPoints, setNewRankPoints] = useState(undefined);
  const [newRankId, setNewRankId] = useState(undefined);

  const [rankId, setRankId] = useState(undefined);
  const [showDeleteRank, setShowDeleteRank] = useState(false);
  const [selectValue, setSelectValue] = useState('ranks');
  const [values, setValues] = useState({});

  // on select value change
  useEffect(() => {
    console.log(selectValue)
    getData(selectValue)
  }, [selectValue])

  // load data into state
  useEffect(() => {
    setValues({});
    
    if (!loading && Array.isArray(data) && selectValue === 'quests') {
      data.map((d) => {
        if (d.name) setValues(prevState => ({ ...prevState, [`${selectValue}-${d.type}-name`]: d.name }));
        if (d.userId) setValues(prevState => ({ ...prevState, [`${selectValue}-${d.type}-userId`]: d.userId }));
        if (d.type) setValues(prevState => ({ ...prevState, [`${selectValue}-${d.type}-type`]: d.type }));
        if (d.channelId) setValues(prevState => ({ ...prevState, [`${selectValue}-${d.type}-channelId`]: d.channelId }));
        if (d.successCounter) setValues(prevState => ({ ...prevState, [`${selectValue}-${d.type}-successCounter`]: d.successCounter }));
        if (d.message) setValues(prevState => ({ ...prevState, [`${selectValue}-${d.type}-message`]: d.message }));
      })
    }

    else if (!loading && Array.isArray(data) && selectValue === 'achievements') {
      data.map((d) => {
        if (d.name) setValues(prevState => ({ ...prevState, [`${selectValue}-${d.type}-name`]: d.name }));
        if (d.channelId) setValues(prevState => ({ ...prevState, [`${selectValue}-${d.type}-channelId`]: d.channelId }));
        if (d.message) setValues(prevState => ({ ...prevState, [`${selectValue}-${d.type}-message`]: d.message }));
        if (d.points) setValues(prevState => ({ ...prevState, [`${selectValue}-${d.type}-points`]: d.points }));
      })
    }

    else if (!loading && Array.isArray(data) && selectValue === 'ranks') {
      data.map((d) => {
        if (d.rankName) setValues(prevState => ({ ...prevState, [`${selectValue}-${d._id}-rankName`]: d.rankName }));
        if (d.pointsRequired) setValues(prevState => ({ ...prevState, [`${selectValue}-${d._id}-pointsRequired`]: d.pointsRequired }));
        if (d.roleId) setValues(prevState => ({ ...prevState, [`${selectValue}-${d._id}-roleId`]: d.roleId }));
      })
    }

    else if (!loading && Array.isArray(data) && selectValue === 'users') {
      data.map((d) => {
        if (d.discordId) setValues(prevState => ({ ...prevState, [`${selectValue}-${d._id}-discordId`]: d.discordId }));
        if (d.points) setValues(prevState => ({ ...prevState, [`${selectValue}-${d._id}-points`]: d.points }));
        if (d.coins) setValues(prevState => ({ ...prevState, [`${selectValue}-${d._id}-coins`]: d.coins }));
        if (d.completedQuests) setValues(prevState => ({ ...prevState, [`${selectValue}-${d._id}-completedQuests`]: d.completedQuests }));
        if (d.completedAchievements) setValues(prevState => ({ ...prevState, [`${selectValue}-${d._id}-completedAchievements`]: d.completedAchievements }));
      })
    }

    else if (!loading && Array.isArray(data) && selectValue === 'passive') {
      data.map((d) => {
        if (d.name) setValues(prevState => ({ ...prevState, [`${selectValue}-${d._id}-name`]: d.name }));
        if (d.description) setValues(prevState => ({ ...prevState, [`${selectValue}-${d._id}-description`]: d.description }));
      })
    }
  }, [data])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(prevState => ({ ...prevState, [name]: value }));
  }

  const updateHandler = (data) => {
    // select, type
    const { select, type } = data;
    const newVal = {};
    for (const [key, value] of Object.entries(values)) {
      if (key.includes(`${select}-${type}`)) {
        var attribute = key.split('-')[2];
        newVal[attribute] = value;
        console.log('Value being sent to server for update ' + newVal);
      }
    }
    // make update request
    updateData({ select, type, newVal });
    // updated message
    return message.success(`${selectValue} data updated.`);
  }

  const submitRank = () => {
    if (!newRankName || !newRankPoints || !newRankId) return message.error('Please fill out all fields.')
    const data = { type: selectValue, rank: { rankName: newRankName, pointsRequired: newRankPoints, roleId: newRankId }};
    createRank(data);
    setNewRankName(undefined);
    setNewRankPoints(undefined);
    setNewRankId(undefined);
    return message.success('Rank successfully created.');
  }

  const handleShowDeleteModal = (id) => {
    setRankId(id);
    setShowDeleteRank(true);
  }

  const handleHideDeleteModal = () => {
    setShowDeleteRank(false);
  }

  const handleOkDeleteModal = () => {
    deleteData({type: selectValue, id: rankId});
    setShowDeleteRank(false);
    return message.success('Rank has been deleted.')
  };

  return (
    <>
    <div className='dashboard-select-wrapper'>
    <Select defaultValue="ranks" style={{ width: 120 }} onChange={(value) => setSelectValue(value)}>
      <Option value="ranks">Ranks</Option>
      <Option value="quests">Quests</Option>
      <Option value="achievements">Achievements</Option>
      <Option value="users">Users</Option>
      <Option value="passive">Passive Tasks</Option>
    </Select>
    </div>
    
    <div className='dashboard-content-wrapper'>
    {(!data && loading) || (data && loading) ? <p>loading...</p>
    : data !== undefined && Array.isArray(data) && !loading ? <>

      {selectValue === 'ranks' && <>
      <h3>All of the ranks available within the community.</h3>
      
      <div className='create-rank-container'>
      <h4>Create a rank</h4>
      <Input placeholder="New Rank Name" onChange={(e) => setNewRankName(e.target.value)} value={newRankName} />
      <Input placeholder="New Rank Points Required" onChange={(e) => setNewRankPoints(e.target.value)} value={newRankPoints} />
      <Input placeholder="New Rank Role ID" onChange={(e) => setNewRankId(e.target.value)} value={newRankId} />
      <Button type="primary" onClick={() => submitRank()}>Update</Button>
      </div>

        {data.map((d) => {
          return (
            <div className='rank-item'>
              {d.rankName && <div> <p>Rank Name: </p> <Input placeholder="Rank Name" onChange={handleChange} value={values[`${selectValue}-${d._id}-rankName`]} name={`${selectValue}-${d._id}-rankName`} /> </div>}
              {d.pointsRequired && <div> <p>Points Needed: </p> <Input placeholder="Points Required" onChange={handleChange} value={values[`${selectValue}-${d._id}-pointsRequired`]} name={`${selectValue}-${d._id}-pointsRequired`} /> </div>}
              {d.roleId && <div> <p>Rank Role ID: </p> <Input placeholder="Role ID" onChange={handleChange} value={values[`${selectValue}-${d._id}-roleId`]} name={`${selectValue}-${d._id}-roleId`} /> </div>}
              <br/>
              <Button type="primary" danger onClick={() => handleShowDeleteModal(d._id)} className='ant-delete-button'>Delete</Button>
              <Button type="primary" onClick={() => updateHandler({ select: selectValue, type: d._id })}>Update</Button>
            </div>
          )
        })}
      </>
      }
      <Modal
        title="Delete rank"
        visible={showDeleteRank}
        onOk={handleOkDeleteModal}
        onCancel={handleHideDeleteModal}
        okText='Yes'
        cancelText='No'
      >
        Are you sure you'd like to delete this rank?
      </Modal>

      {selectValue === 'quests' && <>
      <h4>To add or delete a quest, contact a developer.</h4>
      <div>
        {data.map((d) => {
          return (
            <div className='quest-item'>
              {d.type && <div> <p>Quest Type: {d.type}</p>  </div>}
              {d.name && <div> <p>Quest Name: </p> <Input placeholder="Quest Name" onChange={handleChange} value={values[`${selectValue}-${d.type}-name`]} name={`${selectValue}-${d.type}-name`} /> </div>}
              {d.userId && <div> <p>Quest User ID: </p> <Input placeholder="Quest User ID" onChange={handleChange} value={values[`${selectValue}-${d.type}-userId`]} name={`${selectValue}-${d.type}-userId`} /> </div>}
              {d.channelId && <div> <p>Quest Channel ID: </p> <Input placeholder="Quest Channel ID" onChange={handleChange} value={values[`${selectValue}-${d.type}-channelId`]} name={`${selectValue}-${d.type}-channelId`} /> </div>}
              {d.successCounter && <div> <p>Quest Success Counter: </p> <Input placeholder="Quest Success Counter" onChange={handleChange} value={values[`${selectValue}-${d.type}-successCounter`]} name={`${selectValue}-${d.type}-successCounter`} /> </div>}
              {d.message && <div> <p>Quest Notes: </p> <Input placeholder="Quest Notes" onChange={handleChange} value={values[`${selectValue}-${d.type}-message`]} name={`${selectValue}-${d.type}-message`} /> </div>}
              <br/>
              <Button type="primary" onClick={() => updateHandler({ select: selectValue, type: d.type })}>Update</Button>
            </div>
          )
        })}
        </div>
      </>
      }

    {selectValue === 'achievements' && <>
    <h4>To add or delete an achievement, contact a developer.</h4>
        {data.map((d) => {
          return (
            <div className='achievement-item'>
              {d.type && <div> <p>Achievement Type: {d.type} </p> </div>}
              {d.name && <div> <p>Achievement Name: </p> <Input placeholder="Achievement Name" onChange={handleChange} value={values[`${selectValue}-${d.type}-name`]} name={`${selectValue}-${d.type}-name`} /> </div>}
              {d.channelId && <div> <p>Achievement Channel ID: </p> <Input placeholder="Achievement Channel ID" onChange={handleChange} value={values[`${selectValue}-${d.type}-channelId`]} name={`${selectValue}-${d.type}-channelId`} /> </div>}
              {d.message && <div> <p>Achievement Message: </p> <Input placeholder="Achievement Message" onChange={handleChange} value={values[`${selectValue}-${d.type}-message`]} name={`${selectValue}-${d.type}-message`} /> </div>}
              {d.points && <div> <p>Achievement Points: </p> <Input placeholder="Achievement Points" onChange={handleChange} value={values[`${selectValue}-${d.type}-points`]} name={`${selectValue}-${d.type}-points`} /> </div>}
              <Button type="primary" onClick={() => updateHandler({ select: selectValue, type: d.type })}>Update</Button>
            </div>
          )
        })}
      </>
      }

      {selectValue === 'users' && <>
      <h4>All the users within the community.</h4>
        {data.map((d) => {
          return (
            <div className='user-item'>
              {d.discordId && <p>Discord ID: {values[`${selectValue}-${d._id}-discordId`]} </p>}
              {d.points && <div> <p>User Points: </p> <Input placeholder="Points" onChange={handleChange} value={values[`${selectValue}-${d._id}-points`]} name={`${selectValue}-${d._id}-points`} /> </div>}
              {d.coins && <div> <p>User coins: </p> <Input placeholder="Coins" onChange={handleChange} value={values[`${selectValue}-${d._id}-coins`]} name={`${selectValue}-${d._id}-coins`} /> </div>}
              <Button type="primary" onClick={() => updateHandler({ select: selectValue, type: d._id })}>Update</Button>
            </div>
          )
        })}
      </>
      }

    {selectValue === 'passive' && <>
      <h4>Discord bot passive tasks.</h4>
        {data.map((d) => {
          return (
            <div className='user-item'>
              {d.name && <div> <p>Task Name: {values[`${selectValue}-${d._id}-name`]}</p> </div>}
              {d.description && <div> <p>Task Description: {values[`${selectValue}-${d._id}-description`]}</p> </div>}
            </div>
          )
        })}
      </>
      }
      </>
      : <p>Something went wrong, please try again later.</p> 
    }
  </div>
  </>
  )
}

Dashboard.propTypes = {
  getData: PropTypes.func.isRequired,
  updateData: PropTypes.func.isRequired,
  deleteData: PropTypes.func.isRequired,
  createRank: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data
});

export default connect(mapStateToProps, { getData, updateData, deleteData, createRank })(Dashboard);
