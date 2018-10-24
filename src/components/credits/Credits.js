import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import './credits.css'
import Logo from '@globals/assets/logo.svg'

class Credits extends Component {

  constructor(props) {
    super(props)
    this.core = this.props.core
    this.restService = this.core.getService('rest')
    this.people = []
    this.state = {
      people: [],
    };
  }

  async componentDidMount() {
    const people = await this.restService.getCharacterNames()
    this.setState({ people })
  }

  goToHome() {
    this.props.history.push('/home')
  }

  render() {
    return (
      <div className="credits">
        <div className="app-logo-large-container">
          <div className="app-logo-large">
            <img src={Logo} width="100%" alt="logo large"/>
          </div>
        </div>
        <div className="credits-header-container">
          <h1 className="credits-header">
            Credits
          </h1>
        </div>
        <div className="credits-list-container">
          <div className="credits-list">
            {this.state.people.map((name, index) => (
              <div className="credit-item" key={index}>{name}</div>
            ))}
          </div>
        </div>
        <br/>
        <div className="home-buttons-container">
          <button className="default-btn">
            <Link to="/home">Back</Link>
          </button>
        </div>
      </div>
    )
  }
}

export default Credits