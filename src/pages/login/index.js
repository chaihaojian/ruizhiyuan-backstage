import { Button, Checkbox, Form, Input } from 'antd';
import React from 'react';
import axios from 'axios'

const Login = () => {
  const onFinish = (values) => {
    axios.post('http://localhost:8080/login',{
        name: values.username,
        password: values.password
    })
   .then(
        response => {
            console.log('success', response.data)
        },
        error => {
            console.log('failed', error)
        }
    )
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div style={{width:'60%', marginLeft:'20%', marginTop:'20%'}}>
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="用户名"
        name="username"
        rules={[
          {
            required: true,
            message: '请输入用户名',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="密码"
        name="password"
        rules={[
          {
            required: true,
            message: '请输入密码',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Checkbox>记住密码</Checkbox>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          登陆
        </Button>
      </Form.Item>
    </Form>
    </div>
  );
};

export default Login;