import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload, Select } from 'antd';
import React from 'react';
import { useState } from 'react';
import PubSub from 'pubsub-js';

const { Option } = Select


const AddMeterial = () => {
    const [partition, setPartition] = useState('')

    const selectprops = {
        placeholder: '请选择文件位置',
        onSelect(value) {
            setPartition(value)
        }
    }

    const uploadprops = {
        name: 'file',
        action: 'http://localhost:8080/admin/material/add',
        headers: {
            authorization: localStorage.getItem('ACCESS_TOKEN'),
        },
        data: {
            'partition': partition
        },

        onChange(info) {
            console.log(info)
            if (info.file.status === 'done') {
                PubSub.publish('addMaterial')
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },

        beforeUpload(file){
            if (partition === '') {
                file.status = 'error'
                message.error('请选择文件位置');
                return false
            }
            return true
        }
    };
    return (
        <div style={{marginBottom:'20px'}}>
            <Select {...selectprops}>
                <Option value='教材书单'>教材书单</Option>
                <Option value='申请攻略'>申请攻略</Option>
                <Option value='备考真题'>备考真题</Option>
            </Select>
            <Upload {...uploadprops}>
                <Button icon={<UploadOutlined />}>点击上传</Button>
            </Upload>
        </div>
    )
}



export default AddMeterial;