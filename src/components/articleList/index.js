import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import { Avatar, List, Space, Button } from 'antd';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link, } from 'react-router-dom';
import UpdateArticle from '../updateArticle';

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
          setArticleList(response.data.data)
        },
        error => {
          console.error('failed', error)
        }
      )
  }

  const getCover = (path) => {
    axios({
      mathod: 'GET',
      url: 'http://localhost:8080/admin/article/cover',
      params: {
        path: path
      },
      responseType: "blob"
    }).then(response => {
      if (!response) {
        return
      }
      let url = window.URL.createObjectURL(new Blob(
        [response.data]
      ))
      // let url = new Blob([response.data])
      console.log(url)
      return url
      // let a = document.createElement('a')
      // a.href = url
      // let content = path
      // console.log(content)
      // let decode = decodeURI(content, 'UTF-8')
      // console.log('decode', decode)
      // a.setAttribute('download', decode)
      // document.body.appendChild(a)
      // a.click()
      // URL.revokeObjectURL(a.href)
      // document.body.removeChild(a)
    })
  }

  const deleteArticle = (id) => {
    axios.delete('http://localhost:8080/admin/article/delete', {
      params: {
        'id': id
      }
    }).then(response => {
      getArticleList()
    })
  }

  useEffect(getArticleList, []);

  return (
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
      footer={
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
              <Link to={'/article/update'} state={item}>
                <Button style={{ marginRight: '50px' }} size='small'>更新</Button>
              </Link>
              <Button size='small' onClick={() => { deleteArticle(item.id) }}>删除</Button>
            </div>
          ]}
          extra={
            <img
              width={272}
              alt="logo"
              src={(cover)=>{getCover(item.cover)}}
            />
          }
        >
          <List.Item.Meta
            title={<div>{item.title}</div>}
            description={<div style={{ minHeight: '80px' }}>{item.outline}</div>}
          />
          {item.content}
        </List.Item>
      )}
    />
  )
};

export default ArticleList;