import Config from "./../config";
class Element {
  get activeInStatistics() {
    return this._activeInStatistics;
  }

  set activeInStatistics(value) {
    this._activeInStatistics = value;
  }
  get activeInStock() {
    return this._activeInStock;
  }

  set activeInStock(value) {
    this._activeInStock = value;
  }
  get activeInStations() {
    return this._activeInStations;
  }

  set activeInStations(value) {
    this._activeInStations = value;
  }
  get notifications() {
    return this._notifications;
  }

  set notifications(value) {
    this._notifications = value;
  }


  get parentID() {
    return this._parentID;
  }

  set parentID(value) {
    this._parentID = value;
  }

  /**
   *
   * @returns {Array<Element>}
   */
  get elements() {
    return this._elements;
  }

  /**
   *
   * @param {Array<Element>} value
   */
  set elements(value) {
    this._elements = value;
  }
  get type() {
    return this._type;
  }

  set type(value) {
    this._type = value;
  }

  get name() {
    return this._name;
  }

  set name(value) {
    this._name = value;
  }
  get image() {
    return this._image;
  }

  set image(value) {
    this._image = value;
  }

  get ID() {
    return this._ID;
  }
  set ID(ID) {
    this._ID = ID;
  }

  get chosen() {
    return this._chosen;
  }

  set chosen(value) {
    this._chosen = value;
  }

  get childActive() {
    return this._childActive;
  }

  set childActive(value) {
    this._childActive = value;
  }

  get quantity() {
    return this._quantity;
  }

  /**
   * @param {*} value
   */
  set quantity(value) {
    this._quantity = value;
  }
  constructor(object) {
    if (object === null) return;
    this.chosen = false;
    this.childActive = false;
    this.ID = object.hasOwnProperty("id") ? object["id"] : null;
    this.type = object.hasOwnProperty("type") ? object["type"] : null;
    this.name = object.hasOwnProperty("name") ? object["name"] : null;
    this.image = object.hasOwnProperty("image") ? object["image"] : null;
    this.parentID = object.hasOwnProperty("parentId") ? object["parentId"] : null;
    this.quantity = object.hasOwnProperty("quantity") ? object["quantity"] : null;
    this.elements = (() => {
      /**
       *
       * @type {Array<Element>}
       */
      let data = [];
      let elements = object.hasOwnProperty("elements")
        ? object["elements"]
        : [];
      if (elements && elements.length > 0)
        for (let i = 0; i < elements.length; i++)
          data.push(new Element(elements[i]));
      return data;
    })();
    this.notifications = (() => {
      let data = [];
      let notifications = object.hasOwnProperty("notifications") ? object["notifications"] : [];
      if (!Config.isEmpty(notifications) && notifications.length > 0) for (let i = 0; i < notifications.length; i++) data.push(notifications[i]);
      return data;
    })();


    this.activeInStations = false;
    this.activeInStock = false;
    this.activeInStatistics = false;
  }
}

export default Element;
