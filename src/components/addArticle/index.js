import { Button, Select, Form, Input } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import React, { useRef } from 'react';
import axios from 'axios';
import ArticleCover from '../articleCover/index';
import './index.css'
import { useNavigate } from 'react-router-dom';
const { TextArea } = Input;

const AddArticle = () => {
  const coverRef = useRef()
  const navigate = useNavigate()

  const onFinish = (values) => {
    values.cover = coverRef.current.focus()
    const forms = new FormData()
    forms.append('cover', values.cover)
    forms.append('title', values.title)
    forms.append('outline', values.outline)
    forms.append('author', values.author)
    forms.append('source', values.source)
    forms.append('partition', values.partition)
    forms.append('text', values.text)
    const options = {
        method: 'POST',
        data: forms,
        url: 'http://localhost:8080/admin/article/add'
    }
    axios(options)
    .then(
        response => {
            if(response.data.code === 1004){
                console.log('need login')
                navigate('/login')
            }
            //console.log('success', response)
            navigate('/article/list')
        }
    )
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    
  };

  return (
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
      <FormItem label='文章封面' name='cover'>
        <ArticleCover ref={coverRef} />
      </FormItem>

      <Form.Item
        label="文章标题"
        name="title"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="概述"
        name="outline"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input/>
      </Form.Item>

      <Form.Item
        label="作者"
        name="author"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input/>
      </Form.Item>

      <Form.Item
        label="来源"
        name="source"
      >
        <Input/>
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
        label="正文"
        name="text"
        rules={[{required: true}]}
      >
        <TextArea rows={10} />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddArticle;