class Station {
  /**
   *
   * @returns {Array<Station>}
   */
  get stations() {
    return this._stations;
  }

  /**
   *
   * @param {Array<Station>} value
   */
  set stations(value) {
    this._stations = value;
  }
  get stationName() {
    return this._name;
  }

  set stationName(value) {
    this._name = value;
  }
  get image() {
    return this._image;
  }

  set image(value) {
    this._image = value;
  }

  get stationID() {
    return this._ID;
  }
  set stationID(ID) {
    this._ID = ID;
  }

  get floor() {
    return this._floor;
  }

  set floor(value) {
    this._floor = value;
  }

  constructor(object) {
    if (object === null) return;
    this.stationID = object.hasOwnProperty("stationID")
      ? object["stationID"]
      : null;
    this.stationName = object.hasOwnProperty("stationName")
      ? object["stationName"]
      : null;
    this.floor = object.hasOwnProperty("floor") ? object["floor"] : null;
    this.image = object.hasOwnProperty("image") ? object["image"] : null;

    this.stations = (() => {
      let data = [];
      let stations = object.hasOwnProperty("elements")
        ? object["elements"]
        : [];
      if (stations && stations.length > 0)
        for (let i = 0; i < stations.length; i++)
          data.push(new Station(stations[i]));
      return data;
    })();

    /*this.notifications = (() => {
      let data = [];
      let notifications = object.hasOwnProperty("notifications")
        ? object["notifications"]
        : [];
      if (notifications && notifications.length > 0)
        for (let i = 0; i < notifications.length; i++)
          data.push(notifications[i]);
      return data;
    })();*/
  }
}

export default Station;
