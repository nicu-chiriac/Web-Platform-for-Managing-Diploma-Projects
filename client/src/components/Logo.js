import React, { Component } from 'react'

export class Logo extends Component {
  render() {
    return (
      <div>
        <img src='/FIIR_logo.png' alt="Logo" 
        style={{position: 'absolute',
                right: '0px',
                bottom: '0px',
                width: '100px',
                opacity: '0.5'
              }} 
      />
      </div>
    )
  }
}

export default Logo;
