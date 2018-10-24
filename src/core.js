class Core {
  constructor() {
    this._serviceBuilders = {}
    this.services = {}
  }

  registerService (name, builderFn) {
    if (!(builderFn instanceof Function)) {
      throw new Error('builderFn must be a function')
    }

    this._serviceBuilders[name] = builderFn
  }

  getService(name) {
    if (this.services[name]) {
      return this.services[name]
    } else if (this._serviceBuilders[name]) {
      this.services[name] = this._serviceBuilders[name].call()
      return this.services[name]
    } else {
      throw new Error(`no registered service with name: ${name}`)
    }
  }
}

export { Core }