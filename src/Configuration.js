import appSettings from './appSettings.json';

class Configuration {

  static get currentEnv() {
    const hostname = window.location.hostname;

    if (hostname === 'localhost') {
      return 'dev';
    } else {
      return 'prod';
    }
  }

  static get apiServer() {
    return appSettings[Configuration.currentEnv].apiServer;
  }
}

export default Configuration;