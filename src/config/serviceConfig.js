import { RestService } from '@services/restService'

/**
 * @param {Core} core
 */
function registerAllServices(core) {
  core.registerService('rest', () => new RestService())
}

export { registerAllServices }