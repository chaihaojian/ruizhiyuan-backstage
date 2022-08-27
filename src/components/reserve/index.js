import axios from 'axios'
import React, { Component } from 'react'
import PubSub from 'pubsub-js';
import { Navigate } from 'react-router-dom';
import { Switch, Button } from 'antd';
import './index.css'

class Reserve extends Component {
    constructor(props) {
        super(props)
        this.state = {
            resCode: 1000,
            videoList: [],
        }
    }
    getReserveList = () => {
        var url = 'http://localhost:8080/admin/reserve/all'
        axios.get(url)
            .then(
                response => {
                    if (response.data.code === 1004) {
                        console.log('need login')
                    }
                    this.setState({
                        resCode: response.data.code,
                        reserveList: response.data.data
                    })
                },
                error => {
                    console.error('failed', error)
                }
            )
    }

    deleteReserve = (id) => {
        axios.delete('http://localhost:8080/admin/reserve/delete', {
            params: {
                'id': id
            }
        }).then(response => {
            this.getReserveList()
        })
    }

    // componentDidMount() {
    //     this.getReserveList()
    //     this.token = PubSub.subscribe('addVideo', this.getVideoList)
    // }

    // componentWillUnmount() {
    //     PubSub.unsubscribe(this.token)
    // }

    render() {
        return (
            <div className='videoList'>
                {
                    this.state.resCode !== 1000 && (
                        <Navigate to='/login' replace={true} />
                    )
                }
                {
                    this.state.resCode === 1000 && (
                        <div>
                            <div className='header'>
                                <span style={{ width: '7%' }}>姓名</span>
                                <span style={{ width: '10%' }}>所在国家</span>
                                <span style={{ width: '7%' }}>年龄</span>
                                <span style={{ width: '18%' }}>微信号/手机号</span>
                                <span style={{ width: '15%' }}>邮箱</span>
                                <span style={{ width: '25%' }}>咨询的问题</span>
                                <span style={{ width: '17%' }}>空闲时间</span>
                            </div>
                            <div className='list'>
                                {
                                    this.state.videoList !== null && this.state.videoList.map(vObj => {
                                        return (
                                            <div key={vObj.id} className='item'>
                                                <div className='itemVideoTitle'>{vObj.title}</div>
                                                <div className='itemVideoPart'>{vObj.partition}</div>
                                                <div className='itemVideoLink'><a>{vObj.link}</a></div>
                                                <div className='itemVideoTime'>{vObj.update_time}</div>
                                                <div className='itemVideoSwitch'>
                                                    <Switch checkedChildren="展示" unCheckedChildren="不展示" defaultChecked={false} />
                                                </div>
                                                <div className='itemOperate'>
                                                    <Button type="primary" className='Videobtn'>更新</Button>
                                                    <Button type="primary" className='Videobtn' onClick={(id) => { this.deleteVideo(vObj.id) }}>删除</Button>
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


export default Reserve;