import React, { useState, useEffect } from 'react';
import { Radio, Button, message, Result, Spin, Checkbox } from 'antd';
import { getData, unsubmit } from '../../actions/data';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import data from '../../data/questions.json'
import industriesData  from '../../data/industries.json'
import '../../styles/Dashboard.css'
import Fade from 'react-reveal/Fade';
import axios from 'axios';

message.config({ maxCount: 1 });
const baseUrl = 'https://match-app-node.herokuapp.com'

const Dashboard = ({ getData, editData, data: {profile, error, loading}, unsubmit }) => {
  const [showSuccess, setShowSuccess] = useState(false); 
  const [value, setValue] = useState(
{
    "What year are you in?": "",
    "Which engineering discipline are you in?": "",
    "What do you want a new friend for?": "",
    "I am a extraverted person": "",
    "I am hardworking and diligent": "",
    "Prior to covid, I loved going out on the weekends": "",
    "I love to watch TV shows/movies": "",
    "Good humour is an important trait for me when making a new friend": "",
    "I enjoy watching/playing sports": "",
    "I love gaming": "",
    "I love exercising": "",
    "I enjoy reading in my free time": "",
    "I usually hand in my assignments late": "",
    "Right now, I value my career over school": "",
    "I am a hard working and dilligent person": "",
    "I have a entrepreneurial mindset": "",
    "I would love to work at a small start up": "",
    "I would love to go into a graduate program after my undergraduate degree": "",
    "I would love to work at a Fortune 500 company": "",
    "I would rather have a meaningful job that I enjoy than one that pays well": "",
    "Through LinkU, id like to find someone to work on a project with": "",
    "Select the industries that you would be interested in": ""
});

useEffect(() => {
  getData();
}, []);

useEffect(() => {
  if (profile && Object.keys(profile).length !== 0 && profile.submitted === false){
    setValue(prevState => ({ ...prevState, ["What year are you in?"]: profile.year.toLowerCase() }));
    setValue(prevState => ({ ...prevState, ["Which engineering discipline are you in?"]: profile.discipline.toLowerCase() }));
    setValue(prevState => ({ ...prevState, ["What do you want a new friend for?"]: profile.type.toLowerCase() }));

    profile.selections.map((selection) => {
      setValue(prevState => ({ ...prevState, [selection.question]: selection.answer }));
    })

    if (profile && profile.industries && profile.industries.length > 0) {
      var industries = [];
      for (var i of profile.industries) {
        industries.push(i.answer)
      }
      setValue(prevState => ({ ...prevState, ["Select the industries that you would be interested in"]: industries }));
    }
  }
}, [profile]);

  const handleChange = (e, d) => {
    // console.log(e.target.value, d)
    setValue(prevState => ({ ...prevState, [d.question]: e.target.value.toLowerCase() }));
  };

  function selectChange(checkedValues, d) {
    // console.log('checked = ', checkedValues);
    setValue(prevState => ({ ...prevState, [d.question]: checkedValues }));
  }

  const submitHandler = (e) => {
    e.preventDefault();

    if (value["What do you want a new friend for?"] === "academics/career") {
      if (value["What year are you in?"].length === 0) return message.error({ content: 'Please fill out all of the fields.', className: 'invalid-form-modal'});
      if (value["Which engineering discipline are you in?"].length === 0) return message.error({ content: 'Please fill out all of the fields.', className: 'invalid-form-modal'});
      if (value["I usually hand in my assignments late"].length === 0) return message.error({ content: 'Please fill out all of the fields.', className: 'invalid-form-modal'});
      if (value["Right now, I value my career over school"].length === 0) return message.error({ content: 'Please fill out all of the fields.', className: 'invalid-form-modal'});
      if (value["I am a hard working and dilligent person"].length === 0) return message.error({ content: 'Please fill out all of the fields.', className: 'invalid-form-modal'});
      if (value["I have a entrepreneurial mindset"].length === 0) return message.error({ content: 'Please fill out all of the fields.', className: 'invalid-form-modal'});
      if (value["I would love to work at a small start up"].length === 0) return message.error({ content: 'Please fill out all of the fields.', className: 'invalid-form-modal'});
      if (value["I would love to go into a graduate program after my undergraduate degree"].length === 0) return message.error({ content: 'Please fill out all of the fields.', className: 'invalid-form-modal'});
      if (value["I would love to work at a Fortune 500 company"].length === 0) return message.error({ content: 'Please fill out all of the fields.', className: 'invalid-form-modal'});
      if (value["I would rather have a meaningful job that I enjoy than one that pays well"].length === 0) return message.error({ content: 'Please fill out all of the fields.', className: 'invalid-form-modal'});
      if (value["Through LinkU, id like to find someone to work on a project with"].length === 0) return message.error({ content: 'Please fill out all of the fields.', className: 'invalid-form-modal'});
      if (value["Select the industries that you would be interested in"].length === 0) return message.error({ content: "Please select at least one industry that you're interested in.", className: 'invalid-form-modal'});
    }
    else {
      if (value["What year are you in?"].length === 0) return message.error({ content: 'Please fill out all of the fields.', className: 'invalid-form-modal'});
      if (value["I am a extraverted person"].length === 0) return message.error({ content: 'Please fill out all of the fields.', className: 'invalid-form-modal'});
      if (value["I am hardworking and diligent"].length === 0) return message.error({ content: 'Please fill out all of the fields.', className: 'invalid-form-modal'});
      if (value["Prior to covid, I loved going out on the weekends"].length === 0) return message.error({ content: 'Please fill out all of the fields.', className: 'invalid-form-modal'});
      if (value["I love to watch TV shows/movies"].length === 0) return message.error({ content: 'Please fill out all of the fields.', className: 'invalid-form-modal'});
      if (value["Good humour is an important trait for me when making a new friend"].length === 0) return message.error({ content: 'Please fill out all of the fields.', className: 'invalid-form-modal'});
      if (value["I enjoy watching/playing sports"].length === 0) return message.error({ content: 'Please fill out all of the fields.', className: 'invalid-form-modal'});
      if (value["I love gaming"].length === 0) return message.error({ content: 'Please fill out all of the fields.', className: 'invalid-form-modal'});
      if (value["I love exercising"].length === 0) return message.error({ content: 'Please fill out all of the fields.', className: 'invalid-form-modal'});
      if (value["I enjoy reading in my free time"].length === 0) return message.error({ content: 'Please fill out all of the fields.', className: 'invalid-form-modal'});
    }

    axios.put(`${baseUrl}/api/profile/selections`, value).then(() => {
      setShowSuccess(true);
    }).catch((err) => {
      console.log(err);
      return message.error({ content: 'Something went wrong. Please try again.', className: 'invalid-form-modal'});
    })
  }

  return (
    <>
    {loading ? <Spin className='spinner' size='large'/> : 
    // if the user hasn't hit submit && the profile hasn't been submitted OR the profile is nullish OR the object is empty
    (!showSuccess && ((profile && profile.submitted === false) || profile === null || Object.keys(profile).length === 0))? 
    <div className='questions-parent-container'>

      <h1 className='big-main-form-header'>Fill out this form to be matched to someone with similar interests.</h1>
      <h1 className='small-main-form-header'>Fill out this form to find your match.</h1>
      <p className='main-form-subheader'>You can change your responses at any time.</p>

      {data.map((d => {
      return (<>

      {(d.type === "mandatory" || d.type === value["What do you want a new friend for?"] && 
      (value["What do you want a new friend for?"] &&
      value["Which engineering discipline are you in?"] &&
      value["What year are you in?"]))

      &&

      <div className='questions-options-container'>
          <div className='question-container'>
          <h1>{d.question}</h1>
          </div>
          <div className='options-container'>

        {d.question.includes('Select') ? 
        <Checkbox.Group options={industriesData} onChange={(checkedValues) => selectChange(checkedValues, d)} defaultValue={value["Select the industries that you would be interested in"]}/>
        : 
        <Radio.Group onChange={(e) => handleChange(e, d)} value={value[d.question]}>
        {d.options.map((o) => {
            return (<>
            <Radio value={o}>{o === "chemical" ? "chemical/green process" : o}</Radio>
            </>)
        })}
      </Radio.Group>
      }

          </div>
          
      </div>
    }
      </>
      )
  }))}

  {(!value["What do you want a new friend for?"] ||
  !value["Which engineering discipline are you in?"] ||
  !value["What year are you in?"]) &&
  <h2>Please fill out the questions above to continue filling out the form.</h2>}


{((value["What do you want a new friend for?"] &&
      value["Which engineering discipline are you in?"] &&
      value["What year are you in?"])) && <Button type="primary" onClick={submitHandler}>Submit</Button>}

  </div>
 :  
 <Fade>
 <Result
 status="success"
 title= {(!showSuccess && ((profile && profile.submitted === true))) ? "You've already submitted your response." : "We've recorded your response!"}
 subTitle="You will be emailed a match in the coming week."
 extra={[
   <Button type="primary" key="console" onClick={() => {
    unsubmit()
    window.location.reload();
   }}>
     Redo submission
   </Button>
 ]}
/>
</Fade>
}
  </>
  )
}

Dashboard.propTypes = {
  getData: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data
});

export default connect(mapStateToProps, { getData, unsubmit })(Dashboard);
