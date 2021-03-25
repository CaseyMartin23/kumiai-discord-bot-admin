//general imports
import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/auth";
import "../../styles/Login.css";

// antd
import { Form, Input, Button, message } from "antd";

const layout = {
  labelCol: { span: 10 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const Login = ({ isAuthenticated, login }) => {
  function onFinish(values) {
    if (!values.username || values.username.length === 0)
      return message.error({
        content: "Please enter a username.",
        className: "invalid-form-modal",
      });
    if (!values.password || values.password.length === 0)
      return message.error({
        content: "Please enter a password.",
        className: "invalid-form-modal",
      });
    login(values.username, values.password);
  }

  function onFinishFailed(errorInfo) {
    console.log("Failed:", errorInfo);
  }

  if (isAuthenticated) {
    return <Redirect to="dashboard" />;
  }

  return (
    <>
      <div className="form-container">
        <Form
          {...layout}
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          className="form"
        >
          <Form.Item label="Username" className="email-label" name="username">
            <Input className="input-item" />
          </Form.Item>

          <Form.Item label="Password" name="password">
            <Input.Password className="input-item" />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit" className="login-button">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
