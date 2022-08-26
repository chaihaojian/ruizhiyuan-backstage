import React, { Component } from 'react'
import AddMaterial from '../addMaterial'
import MaterialList from '../materialList'

class Meterial extends Component {
  render() {
    return (
      <div>
        <div className='addVideo'>
          <AddMaterial/>
          <MaterialList/>
        </div>
      </div>
    )
  }
}

export default Meterial;