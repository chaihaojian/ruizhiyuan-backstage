import { Button, Form, Input, Select } from 'antd';
import React from 'react';
import axios from 'axios'
import PubSub from 'pubsub-js';

const AddVideo = () => {
  const onFinish = (values) => {
    axios.post('http://localhost:8080/admin/video/add',{
        title: values.title,
        partition: values.partition,
        link: values.link
    })
   .then(
        response => {
            console.log('success', response.data)
            PubSub.publish('addVideo')
            alert("上传成功")
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
    <Form
        style={{
            width: '100%'
        }}
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
        label="视频标题"
        name="title"
        rules={[
          {
            required: true,
            message: '请输入标题',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="所在分区"
        name="partition"
        rules={[
          {
            required: false,
            message: '',
          },
        ]}
      >
        <Select>
            <Select.Option value="part1">分区1</Select.Option>
            <Select.Option value="part2">分区2</Select.Option>
            <Select.Option value="part3">分区3</Select.Option>
            <Select.Option value="all">所有分区</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="视频地址"
        name="link"
        rules={[
            {
              required: true,
              message: '',
            },
            { 
                type: 'url', 
                warningOnly: true ,
            }, 
            { 
                type: 'string', 
                min: 6 ,
            }
        ]}
      >
        <Input placeholder="http://......" />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          上传
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddVideo;