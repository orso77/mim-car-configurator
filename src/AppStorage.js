class AppStorage {

  static get musicPlay() {
    return JSON.parse(localStorage.getItem("musicPlay"));
  }
  static set musicPlay(value) {
    localStorage.setItem("musicPlay", JSON.stringify(value));
  }
  static get manufacturerId() {
    return JSON.parse(localStorage.getItem("manufacturerId"));
  }
  static set manufacturerId(value) {
    localStorage.setItem("manufacturerId", JSON.stringify(value));
  }
  static get modelId() {
    return JSON.parse(localStorage.getItem("modelId"));
  }
  static set modelId(value) {
    localStorage.setItem("modelId", JSON.stringify(value));
  }
  static get serieId() {
    return JSON.parse(localStorage.getItem("serieId"));
  }
  static set serieId(value) {
    localStorage.setItem("serieId", JSON.stringify(value));
  }
  static get engineId() {
    return JSON.parse(localStorage.getItem("engineId"));
  }
  static set engineId(value) {
    localStorage.setItem("engineId", JSON.stringify(value));
  }

}

export default AppStorage;