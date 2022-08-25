import React, { Component } from 'react'
import AddVideo from '../addVideo'
import VideoList from '../videoList'

class Video extends Component {
  render() {
    return (
      <div>
        <div className='addVideo'>
          <AddVideo/>
          <VideoList/>
        </div>
      </div>
    )
  }
}

export default Video