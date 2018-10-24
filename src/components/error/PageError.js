import React, { Component } from 'react'

import './error.css'

class PageError extends Component {
  render() {
    return (
      <div className="error">
        <h1 className="error-message">Page Not Found 404</h1>
      </div>
    )
  }
}

export default PageError