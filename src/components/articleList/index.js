import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import { Avatar, List, Space, Button } from 'antd';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

// const IconText = ({ icon, text }) => (
//   <Space>
//     {React.createElement(icon)}
//     {text}
//   </Space>
// );

const ArticleList = () => {
  const navigate = useNavigate()
  const [articleList, setArticleList] = useState([])

  const getArticleList = () => {
    var url = 'http://localhost:8080/admin/article/all'
    axios.get(url)
    .then(
      response => {
        if (response.data.code === 1004) {
          console.log('need login')
          navigate('/login')
        }
        console.log(response.data.data)
        setArticleList(response.data.data)
      },
      error => {
        console.error('failed', error)
      }
    )
  }

  useEffect(getArticleList,[]);

  return(
  <List
    itemLayout="vertical"
    size="large"
    pagination={{
      onChange: (page) => {
        console.log(page);
      },
      pageSize: 3,
    }}
    dataSource={articleList}
    footer = {
      <div>
        <Link to='/article/add'>
          <Button type="primary">添加文章</Button>
        </Link>
      </div>
    }
    renderItem={(item) => (
      <List.Item
        key={item.title}
        actions={[
          <div>
            <Button style={{marginRight:'50px'}} size='small'>更新</Button>
            <Button size='small'>删除</Button>
          </div>
        ]}
        extra={
          <img
            width={272}
            alt="logo"
            src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
          />
        }
      >
        <List.Item.Meta
          title={<div>{item.title}</div>}
          description={<div style={{minHeight:'80px'}}>{item.outline}</div>}
        />
        {item.content}
      </List.Item>
    )}
  />
)};

export default ArticleList;