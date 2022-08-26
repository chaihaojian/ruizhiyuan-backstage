import axios from 'axios'
import React, { Component } from 'react'
import PubSub from 'pubsub-js';
import { Navigate } from 'react-router-dom';
import { Switch, Button } from 'antd';
import './index.css'

class MaterialList extends Component {
    constructor(props){
        super(props)
        this.state = {
            resCode: 1000,
            materialList: [],
        }
    }
    getMaterialList = () => {
        var url = 'http://localhost:8080/admin/material/all'
        axios.get(url)
        .then(
            response => {
                console.log(response.data)
                if (response.data.code === 1004) {
                    console.log('need login')
                }
                this.setState({
                    resCode: response.data.code,
                    materialList: response.data.data
                })
            },
            error => {
                console.error('failed', error)
            }
        )
    }

    componentDidMount(){
        this.getMaterialList()
        this.token = PubSub.subscribe('addMaterial', this.getMaterialList)
    }

    componentWillUnmount(){
        PubSub.unsubscribe(this.token)
    }

    render() {
    return (
      <div className='materialList'>
        {
            this.state.resCode !== 1000 && (
                <Navigate to='/login' replace={true}/>
            )
        }
        {
            this.state.resCode === 1000 && (
                <div>
                    <div className='header'>
                        <span style={{width:'25%'}}>文件名</span>
                        <span style={{width:'15%'}}>位置</span>
                        <span style={{width:'15%'}}>文件大小</span>
                        <span style={{width:'25%'}}>更新时间</span>
                        <span style={{width:'10%'}}>操作</span>
                    </div>
                    <div className='list'>
                        {
                            this.state.materialList !== null && this.state.materialList.map(vObj => {
                                return(
                                    <div key={vObj.id} className='item'>
                                        <div className='itemMaterialName'>{vObj.file_name}</div>
                                        <div className='itemMaterialPart'>{vObj.partition}</div>
                                        <div className='itemMaterialSize'>{(vObj.file_size/1024).toFixed(2)}KB</div>
                                        <div className='itemMaterialTime'>
                                            {vObj.update_time.slice(0,10)}
                                            <br/>
                                            {vObj.update_time.slice(11,19)}
                                        </div>
                                        <div className='itemMaterialOperate'>
                                            <Button type="primary" className='MaterialBtn'>下载</Button>
                                            <Button type="primary" className='MaterialBtn'>删除</Button>
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


export default MaterialList;