import React, { useState, useEffect } from 'react';
import { Select, message, Input } from 'antd';
import { getData, unsubmit } from '../../actions/data';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import '../../styles/Dashboard.css'

message.config({ maxCount: 1 });

const Dashboard = ({ getData, data: { data, loading } }) => {
  const { Option } = Select;

  const [selectValue, setSelectValue] = useState('ranks');

  // on select value change
  useEffect(() => {
    console.log(selectValue)
    getData(selectValue)
  }, [selectValue])

  return (
    <>
    <div className='dashboard-select-wrapper'>
    <Select defaultValue="ranks" style={{ width: 120 }} onChange={(value) => setSelectValue(value)}>
      <Option value="ranks">Ranks</Option>
      <Option value="quests">Quests</Option>
      <Option value="achievements">Achievements</Option>
      <Option value="users">Users</Option>
      <Option value="passive">Passive quests</Option>
    </Select>
    </div>
    
    <div className='dashboard-content-wrapper'>
    {(!data && loading) || (data && loading) ? <p>loading...</p>
    : data !== undefined && Array.isArray(data) && !loading ? <>
      {selectValue === 'ranks' && <>
      <h4>All of the ranks available within the community.</h4>
        {data.forEach((d) => {
          return (
            <div className='rank-item'>
              {d.rankName && <p>Rank Name: {d.rankName}</p>}
              {d.pointsRequired && <p>Rank Name: {d.pointsRequired}</p>}
              {d.roleId && <p>Rank Name: {d.roleId}</p>}
            </div>
          )
        })}
      </>
      }

      {selectValue === 'quests' && <>
      <h4>To add or delete a quest, contact a developer.</h4>
      <div>
        {data.map((d) => {
          return (
            <div className='quest-item'>
              {d.name && <div> <p>Quest Name: {d.name}</p> <Input placeholder="Basic usage" /> </div>}
              {d.type && <div> <p>Quest Type: {d.type}</p> <Input placeholder="Basic usage" /> </div>}
              {d.userId && <div> <p>Quest User ID: {d.userId}</p> <Input placeholder="Basic usage" /> </div>}
              {d.channelId && <div> <p>Quest Channel ID: {d.channelId}</p> <Input placeholder="Basic usage" /> </div>}
              {d.successCounter && <div> <p>Quest Success Counter: {d.successCounter}</p> <Input placeholder="Basic usage" /> </div>}
              {d.message && <div> <p>Quest Notes: {d.message}</p> <Input placeholder="Basic usage" /> </div>}
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
              {d.name && <p>Achievement Name: {d.name}</p>}
              {d.type && <p>Achievement Type: {d.type}</p>}
              {d.channelId && <p>Achievement Channel ID: {d.channelId}</p>}
              {d.message && <p>Achievement Counter: {d.message}</p>}
              {d.points && <p>Achievement Points: {d.points}</p>}
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
              {d.discordId && <p>User Discord ID: {d.discordId}</p>}
              {d.points && <p>User Points: {d.points}</p>}
              {d.coins && <p>User Coins: {d.coins}</p>}
              {d.completedQuests && <p>Number Of Quests Completed: {d.completedQuests}</p>}
              {d.completedAchievements && <p>Number Of Achievements Completed: {d.completedAchievements}</p>}
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
};

const mapStateToProps = (state) => ({
  data: state.data
});

export default connect(mapStateToProps, { getData })(Dashboard);
