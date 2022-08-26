import { Button, Checkbox, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import axios from 'axios'
import './index.css'


const Login = () => {
  const navigate = useNavigate()
  const onFinish = (values) => {
    let storage = window.localStorage
    axios.post('http://localhost:8080/login', {
      name: values.username,
      password: values.password
    })
      .then(
        response => {
          storage.token = response.data.data
          localStorage.setItem('ACCESS_TOKEN', 'Bearer ' + storage.token)
          axios.interceptors.request.use(function (config) {
            config.withCredentials = true
            config.headers = {
              'Authorization': 'Bearer ' + storage.token,
            }
            return config;
          }, function (error) {
            return Promise.reject(error)
          });
          navigate('/article/list')
        },
        error => {
          console.log('failed', error)
          navigate('/login')
        }
      )
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div style={{}}>
      <div className='title'>睿智源后台管理</div>
      <div className='form'>
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
            <Button type="primary" htmlType="submit" size='large' style={{width:'40%'}}>
              登陆
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;