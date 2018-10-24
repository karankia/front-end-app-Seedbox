import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import Modal from 'react-modal'

import './home.css'
import Logo from '@globals/assets/logo.svg'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = this.initState()

    this.handleOpenModal = this.handleOpenModal.bind(this)
    this.handleCloseModal = this.handleCloseModal.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleStartGame = this.handleStartGame.bind(this)
  }

  componentDidMount() {
    Modal.setAppElement('body')
  }

  initState() {
    return {
      showModal: false,
      playerOne: '',
      playerTwo: '',
      startGame: false,
      errorMsg: ''
    }
  }

  handleOpenModal() {
    this.setState({ showModal: true })
  }

  handleCloseModal() {
    this.setState(this.initState())
  }

  handleStartGame() {
    if (this.state.playerOne === this.state.playerTwo) {
      this.setState({ errorMsg: 'Players can\'t have the same name' })
    } else if (this.state.playerOne && this.state.playerTwo) {
      this.setState({ startGame: true })
    } else {
      this.setState({ errorMsg: 'Both players must be have names' })
    }
  }

  handleChange(event) {
    switch (event.target.name) {
      case 'player-one':
        this.setState({ playerOne: event.target.value });
        break
      case 'player-two':
        this.setState({ playerTwo: event.target.value });
        break
      default:
        throw new Error('Invalid player state')
    }
  }

  render() {
    if (this.state.startGame) {
      const data = {
        playerOne: this.state.playerOne,
        playerTwo: this.state.playerTwo
      }

      return (<Redirect to={{
        pathname: "/new",
        state: { data }
      }} />)
    }

    let errorDiv = ''
    if (this.state.errorMsg) {
      errorDiv = <div className="player-error">{this.state.errorMsg}</div>
    }

    return (
      <div className="home">
        <div className="app-logo-large-container">
          <div className="app-logo-large">
            <img src={Logo} width="100%" alt="logo large" />
          </div>
        </div>
        <div className="home-buttons-container">
          <div className="buttons-group">
            <button className="default-btn" onClick={this.handleOpenModal}>
              New Game
            </button>
            <button className="default-btn">
              <Link to="/credits">Credits</Link>
            </button>
            <button className="default-btn">
              <a href="https://www.nasa.gov">Exit</a>
            </button>
          </div>
        </div>

        <Modal className="modal"
          isOpen={this.state.showModal}
          contentLabel="minimal"
          style={{
            overlay: {
              backgroundColor: 'none'
            }
          }}>
          <div className="modal-body">
            <div className="modal-header">
              Start a New Game
            </div>
            <div className="modal-content">
              <div className="input-group">
                <div className="modal-input-container">
                  <label>Player One</label>
                  <input
                    type="text"
                    className="player-input"
                    name="player-one"
                    value={this.state.playerOne}
                    onChange={this.handleChange} />
                </div>
                <div className="modal-input-container">
                  <label>Plater Two</label>
                  <input
                    type="text"
                    className="player-input"
                    name="player-two"
                    value={this.state.playerTwo}
                    onChange={this.handleChange} />
                </div>
              </div>
              {errorDiv}
            </div>
            <div className="modal-footer">
              <div className="modal-buttons">
                <button className="default-btn"
                  onClick={this.handleStartGame}>
                  Start!
                </button>
                <button className="default-btn"
                  onClick={this.handleCloseModal}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    )
  }
}

export default Home