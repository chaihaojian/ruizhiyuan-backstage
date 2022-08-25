import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { message, Upload, Modal } from 'antd';
import React, { forwardRef, useRef, useState, useImperativeHandle } from 'react';

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';

  console.log(file)
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }

  const isLt2M = file.size / 1024 / 1024 < 1;

  if (!isLt2M) {
    message.error('Image must smaller than 1MB!');
  }

  return false;
};

// const uploadCover = (file) => {
//     console.log('this', file.file)
//     const forms = new FormData
//     forms.append('file', file.file)
//     const options = {
//         method: 'POST',
//         data: forms,
//         url: 'http://localhost:8080/admin/uploadcover'
//     }
//     axios(options)
//     .then(
//         response => {
//             console.log('success', response)
//         }
//     )
// }

const ArticleCover = forwardRef((props, ref) => {
  const uploadRef = useRef()
  const [file, setFileList] = useState();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');

  const handleCancel = () => setPreviewVisible(false);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };


  useImperativeHandle(ref, () => ({
    focus : () => {
        return file[0]
    }
  }))

  const handleChange = (info) => {
    setFileList(info.fileList)
    if (info.file.status === 'uploading') {
        console.log('uploading')
        setLoading(true);
        return;
    }

    if (info.file.status === 'done') {
        console.log('done')
        console.log(info.file)
        // Get this url from response in real world.
        getBase64(info.file, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );
  return (
    <>
    <Upload
      name="avatar"
      listType="picture-card"
      className="avatar-uploader"
      showUploadList={false}
      maxCount='1'
      beforeUpload={beforeUpload}
      onChange={handleChange}
      onPreview={handlePreview}
      ref={uploadRef}
    //   customRequest={uploadCover}
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt="avatar"
          style={{
            width: '100%',
          }}
        />
      ) : (
        uploadButton
      )}
    </Upload>
    <Modal visible={previewVisible} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
    </Modal>
  </>
  )
})

export default ArticleCover;