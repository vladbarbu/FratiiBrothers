class Element {
  get quantity() {
    return this._quantity;
  }

  set quantity(value) {
    this._quantity = value;
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
   * @param {any} value
   */
  set quantity(value) {
    this._quantity = value;
  }
  constructor(object) {
    if (object === null) return;
    this.chosen = false;
    this.childActive = false;
    this.ID = object.hasOwnProperty("ID") ? object["ID"] : null;
    this.type = object.hasOwnProperty("type") ? object["type"] : null;
    this.name = object.hasOwnProperty("name") ? object["name"] : null;
    this.image = object.hasOwnProperty("image") ? object["image"] : null;
    this.parentID = object.hasOwnProperty("parentID")
      ? object["parentID"]
      : null;
    this.quantity = object.hasOwnProperty("quantity")
      ? object["quantity"]
      : null;
    this.elements = (() => {
      let data = [];
      let elements = object.hasOwnProperty("elements")
        ? object["elements"]
        : [];
      if (elements && elements.length > 0)
        for (let i = 0; i < elements.length; i++)
          data.push(new Element(elements[i]));
      return data;
    })();

    //this.quantity = this.elements.length;

    this.notifications = (() => {
      let data = [];
      let notifications = object.hasOwnProperty("notifications")
        ? object["notifications"]
        : [];
      if (notifications && notifications.length > 0)
        for (let i = 0; i < notifications.length; i++)
          data.push(notifications[i]);
      return data;
    })();
  }
}

export default Element;
