import Element from "./Element";

class Station {
  get description() {
    return this._description;
  }

  set description(value) {
    this._description = value;
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

  get floor() {
    return this._floor;
  }

  set floor(value) {
    this._floor = value;
  }

  constructor(object) {
    if (object === null) return;
    this.ID = object.hasOwnProperty("ID") ? object["ID"] : null;
    this.name = object.hasOwnProperty("name") ? object["name"] : null;
    this.description = object.hasOwnProperty("description") ? object["description"] : null;
    this.floor = object.hasOwnProperty("floor") ? object["floor"] : null;
    this.image = object.hasOwnProperty("image") ? object["image"] : null;
    this.elements = object.hasOwnProperty("elements")
      ? object["elements"]
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
  }
}

export default Station;
