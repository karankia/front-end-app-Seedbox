import React, { Component } from 'react'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'

import { Core } from './core'
import { registerAllServices } from './config/serviceConfig'
import Home from '@components/home/Home'
import Credits from '@components/credits/Credits'
import PageError from '@components/error/PageError'
import NewGame from '@components/new-game/NewGame'

import '@globals/styles/index.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.core = new Core()
    registerAllServices(this.core)
  }

  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Switch>
            <Redirect from={"/"} to="/home" exact />
            <Route path={"/home"} render={() => <Home core={this.core}/>} />
            <Route path={"/credits"} render={() => <Credits core={this.core}/>}/>
            <Route path={"/new"} render={(args) => {
              const data = args.location.state.data
              return <NewGame core={this.core} data={data}/>
            }}/>
            <Route component={PageError} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export { App }
