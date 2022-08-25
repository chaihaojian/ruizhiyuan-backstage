import axios from 'axios'
import React, { Component } from 'react'
import PubSub from 'pubsub-js';
import { Navigate } from 'react-router-dom';
import { Switch, Button } from 'antd';
import './index.css'

class VideoList extends Component {
    constructor(props){
        super(props)
        this.state = {
            resCode: 1000,
            videoList: [],
        }
    }
    getVideoList = () => {
        var url = 'http://localhost:8080/admin/video/all'
        axios.get(url)
        .then(
            response => {
                console.log(response.data)
                if (response.data.code === 1004) {
                    console.log('need login')
                }
                this.setState({
                    resCode: response.data.code,
                    videoList: response.data.data
                })
            },
            error => {
                console.error('failed', error)
            }
        )
    }

    componentDidMount(){
        this.getVideoList()
        this.token = PubSub.subscribe('addVideo', this.getVideoList)
    }

    componentWillUnmount(){
        PubSub.unsubscribe(this.token)
    }

    render() {
    return (
      <div className='videoList'>
        {
            this.state.resCode !== 1000 && (
                <Navigate to='/login' replace={true}/>
            )
        }
        {
            this.state.resCode === 1000 && (
                <div>
                    <div className='header'>
                        <span style={{width:'15%'}}>标题</span>
                        <span style={{width:'10%'}}>分区</span>
                        <span style={{width:'30%'}}>地址</span>
                        <span style={{width:'15%'}}>更新时间</span>
                        <span style={{width:'10%'}}>是否展示</span>
                        <span style={{width:'20%'}}>操作</span>
                    </div>
                    <div className='list'>
                        {
                            this.state.videoList !== null && this.state.videoList.map(vObj => {
                                return(
                                    <div key={vObj.id} className='item'>
                                        <div className='itemTitle'>{vObj.title}</div>
                                        <div className='itemPart'>{vObj.partition}</div>
                                        <div className='itemLink'><a>{vObj.link}</a></div>
                                        <div className='itemTime'>{vObj.update_time}</div>
                                        <div className='itemSwitch'>
                                            <Switch checkedChildren="展示" unCheckedChildren="不展示" defaultChecked={false} />
                                        </div>
                                        <div className='itemOperate'>
                                            <Button type="primary" className='btn'>更新</Button>
                                            <Button type="primary" className='btn'>删除</Button>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            )
        }
      </div>
    )
  }
}


export default VideoList;