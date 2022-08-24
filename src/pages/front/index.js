import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
    VideoCameraOutlined,
  } from '@ant-design/icons';
  import { Layout, Menu } from 'antd';
  import React, { useState } from 'react';
  import { Routes, Route } from 'react-router-dom'
  import { Link } from 'react-router-dom';
  import './index.css';
  import Article from '../../components/article'
  import Video from '../../components/video'

  const { Header, Sider, Content } = Layout;
  const Front = () => {
    const [collapsed, setCollapsed] = useState(false);
    return (
      <Layout style={{height:'100%'}}>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
            items={[
              {
                key: '1',
                icon: <UserOutlined />,
                label: <Link to="/article">文章</Link>
              },
              {
                key: '2',
                icon: <VideoCameraOutlined />,
                label: <Link to="/video">视频</Link>
              },
            ]}
          />
        </Sider>
        <Layout className="site-layout">
          <Header
            className="site-layout-background"
            style={{
              padding: 0,
            }}
          >
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: () => setCollapsed(!collapsed),
            })}
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
            <div>
               <Routes>
                    <Route path="/article/*" element={<Article/>} />
                    <Route path="/video/*" element={<Video/>} />
               </Routes>
            </div>
          </Content>
        </Layout>
      </Layout>
    );
  };
  
  export default Front;