import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Modal from 'react-modal'

import './new-game.css'

import Logo from '@globals/assets/logo.svg'
import VictoryIcon from '@globals/assets/victory-icon.svg'
import IconX from '@globals/assets/x-icon.svg'
import IconO from '@globals/assets/o-icon.svg'

const allAreSame = (...arr) => {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] !== arr[i - 1] || !arr[i] || !arr[i - 1]) {
      return false
    }
  }

  return true
}

const isDraw = (boxes) => {
  for (const key in boxes) {
    const box = boxes[key]
    if (box === '') return true
  }

  return false
}

class NewGame extends Component {
  constructor(props) {
    super(props)

    this.playerOne = this.props.data.playerOne
    this.playerTwo = this.props.data.playerTwo
    this.state = this.initState()

    this.boxClicked = this.boxClicked.bind(this)
    this.handleRestart = this.handleRestart.bind(this)
    this.shouldLight = this.shouldLight.bind(this)
  }

  componentDidMount() {
    Modal.setAppElement('body')
  }

  initState() {
    const boxes = {
      'first-box': '',
      'second-box': '',
      'third-box': '',
      'fourth-box': '',
      'fifth-box': '',
      'sixth-box': '',
      'seventh-box': '',
      'eight-box': '',
      'ninth-box': ''
    }

    return {
      playerTurn: this.playerOne,
      boxNames: Object.keys(boxes),
      showModal: false,
      victoryText: '',
      columnToLight: [],
      boxes
    }
  }

  checkWinConditions(newState) {
    const boxes = newState.boxes
    if (allAreSame(boxes['first-box'],
      boxes['second-box'],
      boxes['third-box'])
    ) {
      newState.columnToLight.push('first-box', 'second-box', 'third-box')
      return true
    } else if (allAreSame(boxes['first-box'],
      boxes['fourth-box'],
      boxes['seventh-box'])
    ) {
      newState.columnToLight.push('first-box', 'fourth-box', 'seventh-box')
      return true
    } else if (allAreSame(boxes['first-box'],
      boxes['fifth-box'],
      boxes['ninth-box'])
    ) {
      newState.columnToLight.push('first-box', 'fifth-box', 'ninth-box')
      return true
    } else if (allAreSame(boxes['seventh-box'],
      boxes['fifth-box'],
      boxes['third-box'])
    ) {
      newState.columnToLight.push('seventh-box', 'fifth-box', 'third-box')
      return true
    } else if (allAreSame(boxes['third-box'],
      boxes['sixth-box'],
      boxes['ninth-box'])
    ) {
      newState.columnToLight.push('third-box', 'sixth-box', 'ninth-box')
      return true
    } else if (allAreSame(boxes['seventh-box'],
      boxes['eight-box'],
      boxes['ninth-box'])
    ) {
      newState.columnToLight.push('seventh-box', 'eight-box', 'ninth-box')
      return true
    } else if (allAreSame(boxes['fourth-box'],
      boxes['fifth-box'],
      boxes['sixth-box'])
    ) {
      newState.columnToLight.push('fourth-box', 'fifth-box', 'sixth-box')
      return true
    } else if (allAreSame(boxes['second-box'],
      boxes['fifth-box'],
      boxes['eight-box'])
    ) {
      newState.columnToLight.push('second-box', 'fifth-box', 'eight-box')
      return true
    }

    return false
  }

  boxClicked(e) {
    let newState = Object.assign({}, this.state)
    const prevTurn = this.state.playerTurn
    const whichPlayer = prevTurn === this.playerOne ? 'One' : 'Two'

    // Someone already played here :
    if (newState.boxes[e.target.id] !== '') return

    switch (this.state.playerTurn) {
      case this.playerOne:
        newState.boxes[e.target.id] = 'X'
        newState.playerTurn = this.playerTwo
        break
      case this.playerTwo:
        newState.boxes[e.target.id] = 'O'
        newState.playerTurn = this.playerOne
        break
      default:
        throw new Error('Invalid playerTurn state')
    }

    if (!isDraw(newState.boxes)) {
      newState.victoryText = 'Draw!?'
      newState.showModal = true
    } else if (this.checkWinConditions(this.state)) {
      newState.victoryText = `Victory to Player ${whichPlayer}(${prevTurn})!`
      newState.showModal = true
    }

    this.setState(newState)
  }

  handleRestart() {
    this.setState(this.initState())
  }

  renderImage(name) {
    switch (this.state.boxes[name]) {
      case 'X': return <img className="item-image" src={IconX} alt="X"/>
      case 'O': return <img className="item-image" src={IconO} alt="O"/>
      default: return ''
    }
  }

  shouldLight(name) {
    if (this.state.columnToLight.findIndex(n => n === name) >= 0) {
      return {
        'borderColor': '#284B44',
        'backgroundColor': '#33564F'
      }
    }
  }

  handleUnderline(player) {
    if (player === 'player-one' && this.state.playerTurn === this.playerOne) {
      return 'underline'
    } else if (player === 'player-two' && this.state.playerTurn === this.playerTwo) {
      return 'underline'
    } else {
      return ''
    }
  }

  render() {
    return (
      <div className="new-game">
        <div className="new-game-container">
          <div className="app-logo-small-container">
            <div className="app-logo-large">
              <img src={Logo} width="100%" alt="logo" />
            </div>
          </div>
          <div className="new-game-container-players">
            <div className="input-group">
              <div className="modal-input-container">
                <label className={this.handleUnderline('player-one')}>Player 1</label>
                <input
                  type="text"
                  className="player-input-game"
                  name="player-one"
                  value={this.playerOne}
                  disabled />
              </div>
              <div className="modal-input-container">
                <label className={this.handleUnderline('player-two')}>Player 2</label>
                <input
                  type="text"
                  className="player-input-game"
                  name="player-two"
                  value={this.playerTwo}
                  disabled />
              </div>
            </div>
          </div>
        </div>

        <div className="game-board">
          <div className="board-column">
            <div id='first-box'
              onClick={this.boxClicked}
              className="board-row-item"
              style={this.shouldLight('first-box')}>
              {this.renderImage('first-box')}
            </div>

            <div id='second-box'
              onClick={this.boxClicked}
              className="board-row-item"
              style={this.shouldLight('second-box')}>
              {this.renderImage('second-box')}
            </div>

            <div id='third-box'
              onClick={this.boxClicked}
              className="board-row-item"
              style={this.shouldLight('third-box')}>
              {this.renderImage('third-box')}
            </div>
          </div>

          <div className="board-column">
            <div id='fourth-box'
              onClick={this.boxClicked}
              className="board-row-item"
              style={this.shouldLight('fourth-box')}>
              {this.renderImage('fourth-box')}
            </div>

            <div id='fifth-box'
              onClick={this.boxClicked}
              className="board-row-item"
              style={this.shouldLight('fifth-box')}>
              {this.renderImage('fifth-box')}
            </div>

            <div id='sixth-box'
              onClick={this.boxClicked}
              className="board-row-item"
              style={this.shouldLight('sixth-box')}>
              {this.renderImage('sixth-box')}
            </div>
          </div>

          <div className="board-column">
            <div id='seventh-box'
              onClick={this.boxClicked}
              className="board-row-item"
              style={this.shouldLight('seventh-box')}>
              {this.renderImage('seventh-box')}
            </div>

            <div id='eight-box'
              onClick={this.boxClicked}
              className="board-row-item"
              style={this.shouldLight('eight-box')}>
              {this.renderImage('eight-box')}
            </div>

            <div id='ninth-box'
              onClick={this.boxClicked}
              className="board-row-item"
              style={this.shouldLight('ninth-box')}>
              {this.renderImage('ninth-box')}
            </div>
          </div>
        </div>

        <Modal className="modal"
          isOpen={this.state.showModal}
          style={{
            overlay: {
              backgroundColor: 'none'
            }
          }}>
          <div className="modal-body">
            <div className="modal-header">
              {this.state.victoryText}
            </div>
            <div className="modal-content">
              <img src={VictoryIcon} alt="" className="victory-icon" />
            </div>
            <div className="modal-footer">
              <div className="modal-buttons">
                <button className="default-btn"
                  onClick={this.handleRestart}>
                  Restart!
                </button>
                <button className="default-btn">
                  <Link to="/home">Quit</Link>
                </button>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    )
  }
}

export default NewGame